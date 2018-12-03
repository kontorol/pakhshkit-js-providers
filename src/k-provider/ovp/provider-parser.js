//@flow
import KalturaPlaybackContext from './response-types/kaltura-playback-context';
import KalturaMetadataListResponse from './response-types/kaltura-metadata-list-response';
import KalturaMediaEntry from './response-types/kaltura-media-entry';
import KalturaPlaybackSource from './response-types/kaltura-playback-source';
import KalturaDrmPlaybackPluginData from '../common/response-types/kaltura-drm-playback-plugin-data';
import PlaySourceUrlBuilder from './play-source-url-builder';
import XmlParser from '../../util/xml-parser';
import getLogger from '../../util/logger';
import OVPConfiguration from './config';
import MediaEntry from '../../entities/media-entry';
import Drm from '../../entities/drm';
import MediaSource from '../../entities/media-source';
import MediaSources from '../../entities/media-sources';
import {SupportedStreamFormat} from '../../entities/media-format';
import BaseProviderParser from '../common/base-provider-parser';
import Playlist from '../../entities/playlist';
import EntryList from '../../entities/entry-list';

export default class OVPProviderParser extends BaseProviderParser {
  static _logger = getLogger('OVPProviderParser');

  /**
   * Returns parsed media entry by given OVP response objects
   * @function getMediaEntry
   * @param {string} ks - The ks
   * @param {number} partnerId - The partner ID
   * @param {number} uiConfId - The uiConf ID
   * @param {any} mediaEntryResponse - The media entry response
   * @returns {MediaEntry} - The media entry
   * @static
   * @public
   */
  static getMediaEntry(ks: string, partnerId: number, uiConfId: ?number, mediaEntryResponse: any): MediaEntry {
    const mediaEntry = new MediaEntry();
    const entry = mediaEntryResponse.entry;
    const playbackContext = mediaEntryResponse.playBackContextResult;
    const metadataList = mediaEntryResponse.metadataListResult;
    const kalturaSources = playbackContext.sources;

    mediaEntry.sources = OVPProviderParser._getParsedSources(kalturaSources, ks, partnerId, uiConfId, entry, playbackContext);
    OVPProviderParser._fillBaseData(mediaEntry, entry, metadataList);
    return mediaEntry;
  }

  /**
   * Returns parsed playlist by given OVP response objects
   * @function getPlaylist
   * @param {any} playlistResponse - The playlist response
   * @returns {Playlist} - The playlist
   * @static
   * @public
   */
  static getPlaylist(playlistResponse: any): Playlist {
    const playlist = new Playlist();
    const playlistData = playlistResponse.playlistData;
    const playlistItems = playlistResponse.playlistItems.entries;
    playlist.id = playlistData.id;
    playlist.name = playlistData.name;
    playlist.description = playlistData.description;
    playlist.poster = playlistData.poster;
    playlistItems.forEach((entry: KalturaMediaEntry) => {
      const mediaEntry = new MediaEntry();
      OVPProviderParser._fillBaseData(mediaEntry, entry);
      playlist.items.push(mediaEntry);
    });
    return playlist;
  }

  /**
   * Returns parsed entry list by given OVP response objects
   * @function getEntryList
   * @param {any} playlistResponse - response
   * @returns {Playlist} - The entry list
   * @static
   * @public
   */
  static getEntryList(playlistResponse: any): EntryList {
    const entryList = new EntryList();
    const playlistItems = playlistResponse.playlistItems.entries;
    playlistItems.forEach(entry => {
      const mediaEntry = new MediaEntry();
      OVPProviderParser._fillBaseData(mediaEntry, entry);
      entryList.items.push(mediaEntry);
    });
    return entryList;
  }

  static _fillBaseData(mediaEntry: MediaEntry, entry: KalturaMediaEntry, metadataList: ?KalturaMetadataListResponse) {
    mediaEntry.poster = entry.poster;
    mediaEntry.id = entry.id;
    mediaEntry.duration = entry.duration;
    mediaEntry.metadata = this._parseMetadata(metadataList);
    mediaEntry.metadata.description = entry.description || '';
    mediaEntry.metadata.name = entry.name || '';
    mediaEntry.metadata.tags = entry.tags || '';

    mediaEntry.type = OVPProviderParser._getEntryType(entry.entryType, entry.type);
    if (mediaEntry.type === MediaEntry.Type.LIVE) {
      mediaEntry.dvrStatus = entry.dvrStatus;
    }

    return mediaEntry;
  }

  static _getEntryType(entryTypeEnum: number, typeEnum: number | string): string {
    let type = MediaEntry.Type.UNKNOWN;
    switch (entryTypeEnum) {
      case KalturaMediaEntry.MediaType.IMAGE.value:
        type = MediaEntry.Type.IMAGE;
        break;
      case KalturaMediaEntry.MediaType.AUDIO.value:
        type = MediaEntry.Type.AUDIO;
        break;
      default:
        switch (typeEnum) {
          case KalturaMediaEntry.EntryType.MEDIA_CLIP.value:
            type = MediaEntry.Type.VOD;
            break;
          case KalturaMediaEntry.EntryType.LIVE_STREAM.value:
          case KalturaMediaEntry.EntryType.LIVE_CHANNEL.value:
            type = MediaEntry.Type.LIVE;
            break;
          default:
            type = MediaEntry.Type.UNKNOWN;
        }
    }
    return type;
  }

  /**
   * Returns the parsed sources
   * @function _getParsedSources
   * @param {Array<KalturaPlaybackSource>} kalturaSources - The kaltura sources
   * @param {string} ks - The ks
   * @param {number} partnerId - The partner ID
   * @param {number} uiConfId - The uiConf ID
   * @param {Object} entry - The entry
   * @param {KalturaPlaybackContext} playbackContext - The playback context
   * @return {MediaSources} - A media sources
   * @static
   * @private
   */
  static _getParsedSources(
    kalturaSources: Array<KalturaPlaybackSource>,
    ks: string,
    partnerId: number,
    uiConfId: ?number,
    entry: Object,
    playbackContext: KalturaPlaybackContext
  ): MediaSources {
    const sources = new MediaSources();
    const addAdaptiveSource = (source: KalturaPlaybackSource) => {
      const parsedSource = OVPProviderParser._parseAdaptiveSource(source, playbackContext, ks, partnerId, uiConfId, entry.id);
      const sourceFormat = SupportedStreamFormat.get(source.format);
      sources.map(parsedSource, sourceFormat);
    };
    const parseAdaptiveSources = () => {
      kalturaSources.filter(source => !OVPProviderParser._isProgressiveSource(source)).forEach(addAdaptiveSource);
    };
    const parseProgressiveSources = () => {
      const progressiveSource = kalturaSources.find(OVPProviderParser._isProgressiveSource);
      sources.progressive = OVPProviderParser._parseProgressiveSources(progressiveSource, playbackContext, ks, partnerId, uiConfId, entry.id);
    };
    if (kalturaSources && kalturaSources.length > 0) {
      parseAdaptiveSources();
      parseProgressiveSources();
    }
    return sources;
  }

  /**
   * Returns a parsed adaptive source
   * @function _parseAdaptiveSource
   * @param {KalturaPlaybackSource} kalturaSource - A kaltura source
   * @param {KalturaPlaybackContext} playbackContext - The playback context
   * @param {string} ks - The ks
   * @param {number} partnerId - The partner ID
   * @param {number} uiConfId - The uiConf ID
   * @param {string} entryId - The entry id
   * @returns {MediaSource} - The parsed adaptive kalturaSource
   * @static
   * @private
   */
  static _parseAdaptiveSource(
    kalturaSource: ?KalturaPlaybackSource,
    playbackContext: KalturaPlaybackContext,
    ks: string,
    partnerId: number,
    uiConfId: ?number,
    entryId: string
  ): MediaSource {
    const mediaSource: MediaSource = new MediaSource();
    if (kalturaSource) {
      let playUrl: string = '';
      const mediaFormat = SupportedStreamFormat.get(kalturaSource.format);
      let extension: string = '';
      if (mediaFormat) {
        extension = mediaFormat.pathExt;
        mediaSource.mimetype = mediaFormat.mimeType;
      }
      // in case playbackSource doesn't have flavors we don't need to build the url and we'll use the provided one.
      if (kalturaSource.hasFlavorIds()) {
        if (!extension && playbackContext.flavorAssets && playbackContext.flavorAssets.length > 0) {
          extension = playbackContext.flavorAssets[0].fileExt;
        }
        playUrl = PlaySourceUrlBuilder.build({
          entryId: entryId,
          flavorIds: kalturaSource.flavorIds,
          format: kalturaSource.format,
          ks: ks,
          partnerId: partnerId,
          uiConfId: uiConfId,
          extension: extension,
          protocol: kalturaSource.getProtocol(this._getBaseProtocol())
        });
      } else {
        playUrl = kalturaSource.url;
      }
      if (playUrl === '') {
        OVPProviderParser._logger.error(
          `failed to create play url from source, discarding source: (${entryId}_${kalturaSource.deliveryProfileId}), ${kalturaSource.format}.`
        );
        return mediaSource;
      }
      mediaSource.url = OVPProviderParser._applyRegexAction(playbackContext, playUrl);
      mediaSource.id = entryId + '_' + kalturaSource.deliveryProfileId + ',' + kalturaSource.format;
      if (kalturaSource.hasDrmData()) {
        const drmParams: Array<Drm> = [];
        kalturaSource.drm.forEach(drm => {
          drmParams.push(new Drm(drm.licenseURL, KalturaDrmPlaybackPluginData.Scheme[drm.scheme], drm.certificate));
        });
        mediaSource.drmData = drmParams;
      }
    }
    return mediaSource;
  }

  /**
   * Returns parsed progressive sources
   * @function _parseProgressiveSources
   * @param {KalturaPlaybackSource} kalturaSource - A kaltura source
   * @param {KalturaPlaybackContext} playbackContext - The playback context
   * @param {string} ks - The ks
   * @param {number} partnerId - The partner ID
   * @param {number} uiConfId - The uiConf ID
   * @param {string} entryId - The entry id
   * @returns {Array<MediaSource>} - The parsed progressive kalturaSources
   * @static
   * @private
   */
  static _parseProgressiveSources(
    kalturaSource: ?KalturaPlaybackSource,
    playbackContext: KalturaPlaybackContext,
    ks: string,
    partnerId: number,
    uiConfId: ?number,
    entryId: string
  ): Array<MediaSource> {
    const videoSources: Array<MediaSource> = [];
    const audioSources: Array<MediaSource> = [];
    if (kalturaSource) {
      const protocol = kalturaSource.getProtocol(this._getBaseProtocol());
      const format = kalturaSource.format;
      const sourceId = kalturaSource.deliveryProfileId + ',' + kalturaSource.format;
      playbackContext.flavorAssets.map(flavor => {
        const mediaSource: MediaSource = new MediaSource();
        mediaSource.id = flavor.id + sourceId;
        mediaSource.mimetype = flavor.fileExt === 'mp3' ? 'audio/mp3' : 'video/mp4';
        mediaSource.height = flavor.height;
        mediaSource.width = flavor.width;
        mediaSource.bandwidth = flavor.bitrate * 1024;
        mediaSource.label = flavor.label || flavor.language;
        const playUrl = PlaySourceUrlBuilder.build({
          entryId: entryId,
          flavorIds: flavor.id,
          format: format,
          ks: ks,
          partnerId: partnerId,
          uiConfId: uiConfId,
          extension: flavor.fileExt,
          protocol: protocol
        });
        mediaSource.url = OVPProviderParser._applyRegexAction(playbackContext, playUrl);
        if (flavor.height && flavor.width) {
          videoSources.push(mediaSource);
        } else {
          audioSources.push(mediaSource);
        }
      });
    }
    //If we have only audio flavors return them, otherwise return video flavors
    return audioSources.length && !videoSources.length ? audioSources : videoSources;
  }

  /**
   * Ovp metadata parser
   * @function _parseMetaData
   * @param {KalturaMetadataListResponse} metadataList The metadata list
   * @returns {Object} Parsed metadata
   * @static
   * @private
   */
  static _parseMetadata(metadataList: ?KalturaMetadataListResponse): Object {
    const metadata = {};
    if (metadataList && metadataList.metas && metadataList.metas.length > 0) {
      metadataList.metas.forEach(meta => {
        let metaXml: Object;
        const domParser: DOMParser = new DOMParser();
        meta.xml = meta.xml.replace(/\r?\n|\r/g, '');
        meta.xml = meta.xml.replace(/>\s*/g, '>');
        meta.xml = meta.xml.replace(/>\s*/g, '>');
        metaXml = domParser.parseFromString(meta.xml, 'text/xml');
        const metasObj: Object = XmlParser.xmlToJson(metaXml);
        const metaKeys = Object.keys(metasObj.metadata);
        metaKeys.forEach(key => {
          metadata[key] = metasObj.metadata[key]['#text'];
        });
      });
    }
    return metadata;
  }

  /**
   * Returns the base protocol
   * @function _getBaseProtocol
   * @returns {string} - The base protocol
   * @static
   * @private
   */
  static _getBaseProtocol(): string {
    const config = OVPConfiguration.get();
    const protocolRegex = /^https?:/;
    const result = protocolRegex.exec(config.cdnUrl);
    const protocol = result ? result[0] : document.location.protocol;
    if (typeof protocol === 'string') {
      return protocol.slice(0, -1); // remove ':' from the end
    }
    return 'https';
  }

  /**
   * Applies the request host regex on the url
   * @function _applyRegexAction
   * @param {KalturaPlaybackContext} playbackContext - The playback context
   * @param {string} playUrl - The original url
   * @returns {string} - The request host regex applied url
   * @static
   * @private
   */
  static _applyRegexAction(playbackContext: KalturaPlaybackContext, playUrl: string): string {
    const regexAction = playbackContext.getRequestHostRegexAction();
    if (regexAction) {
      const regex = new RegExp(regexAction.pattern, 'i');
      if (playUrl.match(regex)) {
        return playUrl.replace(regex, regexAction.replacement + '/');
      }
    }
    return playUrl;
  }
}
