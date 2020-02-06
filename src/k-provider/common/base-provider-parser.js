// @flow
import {SupportedStreamFormat} from '../../entities/media-format'
import MediaEntry from '../../entities/media-entry'
import MediaSources from '../../entities/media-sources'
import MediaSource from '../../entities/media-source'
import type {OTTKontorolPlaybackSource} from '../ott/response-types/kontorol-playback-source'
import type {OVPKontorolPlaybackSource} from '../ovp/response-types/kontorol-playback-source'

export default class BaseProviderParser {
  static getMediaEntry(...parms): MediaEntry { // eslint-disable-line no-unused-vars
    throw new TypeError(`getMediaEntry method must be implement by the derived class`);
  }

  static _getParsedSources(...parms): MediaSources { // eslint-disable-line no-unused-vars
    throw new TypeError(`_getParsedSources method must be implement by the derived class`);
  }

  static _parseAdaptiveSource(...parms): MediaSource { // eslint-disable-line no-unused-vars
    throw new TypeError(`_parseAdaptiveSource method must be implement by the derived class`);
  }

  static _isProgressiveSource(source: OVPKontorolPlaybackSource | OTTKontorolPlaybackSource): boolean {
    const sourceFormat = SupportedStreamFormat.get(source.format);
    return !!sourceFormat && sourceFormat.name === 'mp4';
  }

  static hasBlockActions(assetResponse: any): any {
    if (assetResponse && assetResponse.playBackContextResult) {
      const playbackContext = assetResponse.playBackContextResult;
      for (let actionIndex = 0; actionIndex < playbackContext.actions.length; actionIndex++) {
        if (playbackContext.actions[actionIndex].type === "BLOCK") {
          return playbackContext.actions[actionIndex];
        }
      }
    }
    return null;
  }

  static hasErrorMessage(assetResponse: any): any {
    const messages = assetResponse.playBackContextResult.messages;
    for (let messagesIndex = 0; messagesIndex < messages.length; messagesIndex++) {
      if (messages[messagesIndex].code !== "OK") {
        return messages[messagesIndex];
      }
    }
    return null;
  }
}
