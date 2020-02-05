//@flow
import ServiceResult from '../../common/base-service-result'
import KontorolMetadata from './kontorol-metadata'

export default class KontorolMetadataListResponse extends ServiceResult {
  totalCount: number;
  metas: Array<KontorolMetadata>;

  /**
   * @constructor
   * @param {Object} responseObj The response
   */
  constructor(responseObj: Object) {
    super(responseObj);
    if (!this.hasError) {
      this.totalCount = responseObj.totalCount;
      if (this.totalCount > 0) {
        this.metas = [];
        responseObj.objects.map(meta => this.metas.push(new KontorolMetadata(meta)));
      }
    }
  }
}
