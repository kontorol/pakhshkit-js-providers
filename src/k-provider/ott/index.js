// @flow
import OTTProvider from './provider';
import KontorolPlaybackContext from './response-types/kontorol-playback-context';
import KontorolAsset from './response-types/kontorol-asset';

declare var __VERSION__: string;
declare var __NAME__: string;

const NAME = __NAME__ + '-ott';
const VERSION = __VERSION__;

const ContextType = KontorolPlaybackContext.Type;
const MediaType = KontorolAsset.Type;

export {OTTProvider as Provider, ContextType, MediaType, NAME, VERSION};
