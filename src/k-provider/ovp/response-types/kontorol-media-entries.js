//@flow
import ServiceResult from '../../common/base-service-result';
import KontorolMediaEntry from './kontorol-media-entry';

export default class KontorolMediaEntries extends ServiceResult {
  /**
   * @member - The entries
   * @type {Array<KontorolMediaEntry>}
   */
  entries: Array<KontorolMediaEntry>;

  /**
   * @constructor
   * @param {Object} responseObj The json response
   */
  constructor(responseObj: Object) {
    super(responseObj);
    if (!this.hasError) {
      this.entries = [];
      responseObj.map(entry => this.entries.push(new KontorolMediaEntry(entry)));
    }
  }
}
