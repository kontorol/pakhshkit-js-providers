//@flow
import ServiceResult from '../../common/base-service-result';
import KontorolMediaEntry from './kontorol-media-entry';

export default class KontorolBaseEntryListResponse extends ServiceResult {
  /**
   * @member - The total count
   * @type {number}
   */
  totalCount: number;
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
      this.totalCount = responseObj.totalCount;
      if (this.totalCount > 0) {
        this.entries = [];
        responseObj.objects.map(entry => this.entries.push(new KontorolMediaEntry(entry)));
      }
    }
  }
}
