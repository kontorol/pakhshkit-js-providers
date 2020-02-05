//@flow
import getLogger from '../../util/logger'
import KontorolPlaybackSource from './response-types/kontorol-playback-source'
import KontorolPlaybackContext from './response-types/kontorol-playback-context'
import KontorolAsset from './response-types/kontorol-asset'
import MediaEntry from '../../entities/media-entry'
import Drm from '../../entities/drm'
import MediaSource from '../../entities/media-source'
import MediaSources from '../../entities/media-sources'
import {SupportedStreamFormat} from '../../entities/media-format'
import KontorolDrmPlaybackPluginData from '../common/response-types/kontorol-drm-playback-plugin-data'
import BaseProviderParser from '../common/base-provider-parser'

const LIVE_ASST_OBJECT_TYPE: string = "KontorolLinearMediaAsset";

const MediaTypeCombinations: { [mediaType: string]: Object } = {
  [KontorolAsset.Type.MEDIA]: {
    [KontorolPlaybackContext.Type.TRAILER]: () => ({type: MediaEntry.Type.VOD}),
    [KontorolPlaybackContext.Type.PLAYBACK]: (mediaAssetData) => {
      if (mediaAssetData.externalIds || mediaAssetData.objectType === LIVE_ASST_OBJECT_TYPE) {
        return {type: MediaEntry.Type.LIVE, dvrStatus: 0};
      }
      return {type: MediaEntry.Type.VOD};
    }
  },
  [KontorolAsset.Type.EPG]: {
    [KontorolPlaybackContext.Type.CATCHUP]: () => ({type: MediaEntry.Type.VOD}),
    [KontorolPlaybackContext.Type.START_OVER]: () => ({type: MediaEntry.Type.LIVE, dvrStatus: 1})
  },
  [KontorolAsset.Type.RECORDING]: {
    [KontorolPlaybackContext.Type.PLAYBACK]: () => ({type: MediaEntry.Type.VOD})
  }
};

export default class OTTProviderParser extends BaseProviderParser {
  static _logger = getLogger("OTTProviderParser");

  /**
   * Returns parsed media entry by given OTT response objects.
   * @function getMediaEntry
   * @param {any} assetResponse - The asset response.
   * @param {Object} requestData - The request data object.
   * @returns {MediaEntry} - The media entry
   * @static
   * @public
   */
  static getMediaEntry(assetResponse: any, requestData: Object): MediaEntry {
    const mediaEntry = new MediaEntry();
    const playbackContext = assetResponse.playBackContextResult;
    const mediaAsset = assetResponse.mediaDataResult;
    const kontorolSources = playbackContext.sources;
    const metaData = OTTProviderParser.reconstructMetadata(mediaAsset);
    metaData.description = mediaAsset.description;
    metaData.name = mediaAsset.name;
    mediaEntry.metadata = metaData;
    mediaEntry.poster = OTTProviderParser._getPoster(mediaAsset.pictures);
    mediaEntry.id = mediaAsset.id;
    const filteredKontorolSources = OTTProviderParser._filterSourcesByFormats(kontorolSources, requestData.formats);
    mediaEntry.sources = OTTProviderParser._getParsedSources(filteredKontorolSources);
    const typeData = OTTProviderParser._getMediaType(mediaAsset.data, requestData.mediaType, requestData.contextType);
    mediaEntry.type = typeData.type;
    mediaEntry.dvrStatus = typeData.dvrStatus;
    mediaEntry.duration = Math.max.apply(Math, kontorolSources.map(source => source.duration));
    return mediaEntry;
  }

  /**
   * reconstruct the metadata
   * @param {Object} mediaAsset the mediaAsset that contains the response with the metadata.
   * @returns {Object} reconstructed metadata object
   */
  static reconstructMetadata(mediaAsset: Object): Object {
    const metadata = {
      metas: OTTProviderParser.addToMetaObject(mediaAsset.metas),
      tags: OTTProviderParser.addToMetaObject(mediaAsset.tags)
    }
    return metadata;
  }

  /**
   * transform an array of [{key: value},{key: value}...] to an object
   * @param {Array<Object>} list a list of objects
   * @returns {Object} an mapped object of the arrayed list.
   */
  static addToMetaObject(list: Array<Object>): Object {
    let categoryObj = {};
    if (list) {
      list.forEach(item => {
        categoryObj[item.key] = item.value;
      })
    }
    return categoryObj;
  }

  /**
   * Gets the poster url without width and height.
   * @param {Array<Object>} pictures - Media pictures.
   * @returns {string | Array<Object>} - Poster base url or array of poster candidates.
   * @private
   */
  static _getPoster(pictures: Array<Object>): string | Array<Object> {
    if (pictures && pictures.length > 0) {
      const picObj = pictures[0];
      const url = picObj.url;
      // Search for thumbnail service
      const regex = /.*\/thumbnail\/.*(?:width|height)\/\d+\/(?:height|width)\/\d+/;
      if (regex.test(url)) {
        return url;
      }
      return pictures.map(pic => ({url: pic.url, width: pic.width, height: pic.height}));
    }
    return '';
  }

  /**
   * Gets the media type (LIVE/VOD)
   * @param {Object} mediaAssetData - The media asset data.
   * @param {string} mediaType - The asset media type.
   * @param {string} contextType - The asset context type.
   * @returns {Object} - The type data object.
   * @private
   */
  static _getMediaType(mediaAssetData: Object, mediaType: string, contextType: string): Object {
    let typeData = {type: MediaEntry.Type.UNKNOWN};
    if (MediaTypeCombinations[mediaType] && MediaTypeCombinations[mediaType][contextType]) {
      typeData = MediaTypeCombinations[mediaType][contextType](mediaAssetData);
    }
    return typeData;
  }

  /**
   * Filtered the kontorolSources array by device type.
   * @param {Array<KontorolPlaybackSource>} kontorolSources - The kontorol sources.
   * @param {Array<string>} formats - Partner device formats.
   * @returns {Array<KontorolPlaybackSource>} - Filtered kontorolSources array.
   * @private
   */
  static _filterSourcesByFormats(kontorolSources: Array<KontorolPlaybackSource>, formats: Array<string>): Array<KontorolPlaybackSource> {
    if (formats.length > 0) {
      kontorolSources = kontorolSources.filter(source => formats.includes(source.type));
    }
    return kontorolSources;
  }

  /**
   * Returns the parsed sources
   * @function _getParsedSources
   * @param {Array<KontorolPlaybackSource>} kontorolSources - The kontorol sources
   * @param {Object} playbackContext - The playback context
   * @return {MediaSources} - A media sources
   * @static
   * @private
   */
  static _getParsedSources(kontorolSources: Array<KontorolPlaybackSource>): MediaSources {
    const sources = new MediaSources();
    const addAdaptiveSource = (source: KontorolPlaybackSource) => {
      const parsedSource = OTTProviderParser._parseAdaptiveSource(source);
      const sourceFormat = SupportedStreamFormat.get(source.format);
      sources.map(parsedSource, sourceFormat);
    };
    const parseAdaptiveSources = () => {
      kontorolSources.filter((source) => !OTTProviderParser._isProgressiveSource(source)).forEach(addAdaptiveSource);
    };
    const parseProgressiveSources = () => {
      kontorolSources.filter((source) => OTTProviderParser._isProgressiveSource(source)).forEach(addAdaptiveSource);
    };
    if (kontorolSources && kontorolSources.length > 0) {
      parseAdaptiveSources();
      parseProgressiveSources();
    }
    return sources;
  }

  /**
   * Returns a parsed adaptive source
   * @function _parseAdaptiveSource
   * @param {KontorolPlaybackSource} kontorolSource - A kontorol source
   * @returns {MediaSource} - The parsed adaptive kontorolSource
   * @static
   * @private
   */
  static _parseAdaptiveSource(kontorolSource: ?KontorolPlaybackSource): MediaSource {
    const mediaSource = new MediaSource();
    if (kontorolSource) {
      const playUrl = kontorolSource.url;
      const mediaFormat = SupportedStreamFormat.get(kontorolSource.format);
      if (mediaFormat) {
        mediaSource.mimetype = mediaFormat.mimeType;
      }
      if (playUrl === '') {
        OTTProviderParser._logger.error(`failed to create play url from source, discarding source: (${kontorolSource.fileId}), ${kontorolSource.format}.`);
        return mediaSource;
      }
      mediaSource.url = playUrl;
      mediaSource.id = kontorolSource.fileId + ',' + kontorolSource.format;
      if (kontorolSource.hasDrmData()) {
        const drmParams: Array<Drm> = [];
        kontorolSource.drm.forEach((drm) => {
          drmParams.push(new Drm(drm.licenseURL, KontorolDrmPlaybackPluginData.Scheme[drm.scheme], drm.certificate));
        });
        mediaSource.drmData = drmParams;
      }
    }
    return mediaSource;
  }
}
