//@flow
import ServiceResult from '../../common/base-service-result'
import KontorolAccessControlMessage from '../../common/response-types/kontorol-access-control-message'
import KontorolPlaybackSource from './kontorol-playback-source'
import KontorolRuleAction from '../../common/response-types/kontorol-rule-action'
import KontorolFlavorAsset from './kontorol-flavor-asset'

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
        actions.map(action => this.actions.push(new KontorolRuleAction(action)));
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
}

