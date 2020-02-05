//@flow
import ServiceResult from '../../common/base-service-result';
import KontorolAccessControlMessage from '../../common/response-types/kontorol-access-control-message';
import KontorolPlaybackSource from './kontorol-playback-source';
import KontorolAccessControlModifyRequestHostRegexAction from './kontorol-access-control-modify-request-host-regex-action';
import KontorolRuleAction from './kontorol-rule-action';
import KontorolFlavorAsset from './kontorol-flavor-asset';

export default class KontorolPlaybackContext extends ServiceResult {
  /**
   * @member - The playback sources
   * @type {Array<KontorolPlaybackSource>}
   */
  sources: Array<KontorolPlaybackSource> = [];
  /**
   * @member - Array of actions as received from the rules that invalidated
   * @type {Array<KontorolRuleAction>}
   */
  actions: Array<KontorolRuleAction> = [];
  /**
   * @member - Array of actions as received from the rules that invalidated
   * @type {Array<KontorolAccessControlMessage>}
   */
  messages: Array<KontorolAccessControlMessage> = [];
  /**
   * @member - The flavor assets
   * @type {Array<KontorolFlavorAsset>}
   */
  flavorAssets: Array<KontorolFlavorAsset> = [];

  /**
   * @constructor
   * @param {Object} response The response
   */
  constructor(response: Object) {
    super(response);
    if (!this.hasError) {
      const messages = response.messages;
      if (messages) {
        messages.map(message => this.messages.push(new KontorolAccessControlMessage(message)));
      }
      const actions = response.actions;
      if (actions) {
        actions.map(action => {
          if (action.type === KontorolRuleAction.Type.REQUEST_HOST_REGEX) {
            this.actions.push(new KontorolAccessControlModifyRequestHostRegexAction(action));
          } else {
            this.actions.push(new KontorolRuleAction(action));
          }
        });
      }
      const sources = response.sources;
      if (sources) {
        sources.map(source => this.sources.push(new KontorolPlaybackSource(source)));
      }
      const flavorAssets = response.flavorAssets;
      if (flavorAssets) {
        flavorAssets.map(flavor => this.flavorAssets.push(new KontorolFlavorAsset(flavor)));
      }
    }
  }

  hasBlockAction(): boolean {
    return this.getBlockAction() !== undefined;
  }

  getBlockAction(): ?KontorolRuleAction {
    return this.actions.find(action => action.type === KontorolRuleAction.Type.BLOCK);
  }

  getErrorMessages(): Array<KontorolAccessControlMessage> {
    return this.messages;
  }

  /**
   * Get the KontorolAccessControlModifyRequestHostRegexAction action
   * @function getRequestHostRegexAction
   * @returns {?KontorolAccessControlModifyRequestHostRegexAction} The action
   * */
  getRequestHostRegexAction(): ?KontorolAccessControlModifyRequestHostRegexAction {
    const action = this.actions.find(action => action.type === KontorolRuleAction.Type.REQUEST_HOST_REGEX);
    if (action instanceof KontorolAccessControlModifyRequestHostRegexAction) {
      return action;
    }
  }
}
