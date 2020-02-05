//@flow
import ServiceResult from '../../common/base-service-result';
import KontorolAccessControlMessage from '../../common/response-types/kontorol-access-control-message';
import KontorolRuleAction from './kontorol-rule-action';
import KontorolPlaybackSource from './kontorol-playback-source';
import KontorolBumpersPlaybackPluginData from './kontorol-bumper-playback-plugin-data';

export default class KontorolPlaybackContext extends ServiceResult {
  static Type: {[type: string]: string} = {
    TRAILER: 'TRAILER',
    CATCHUP: 'CATCHUP',
    START_OVER: 'START_OVER',
    PLAYBACK: 'PLAYBACK'
  };
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
   * @member - Array of access control massages
   * @type {Array<KontorolAccessControlMessage>}
   */
  messages: Array<KontorolAccessControlMessage> = [];
  /**
   * @member - Array of bumper plugins
   * @type {Array<KontorolBumpersPlaybackPluginData>}
   */
  plugins: Array<KontorolBumpersPlaybackPluginData> = [];

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
      const plugins = response.plugins;
      if (plugins) {
        plugins.map(plugin => this.plugins.push(new KontorolBumpersPlaybackPluginData(plugin)));
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
}
