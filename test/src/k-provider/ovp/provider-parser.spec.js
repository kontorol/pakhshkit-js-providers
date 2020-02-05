import OVPProviderParser from '../../../../src/k-provider/ovp/provider-parser';
import playbackContext from '../../../../src/k-provider/ovp/response-types/kontorol-playback-context';
import {
  kontorolDashSource,
  kontorolProgressiveSourceNotSecured,
  kontorolProgressiveSourceSecured,
  kontorolProgressiveMultiProtocol,
  kontorolProgressiveSourceFlavorAssets,
  kontorolDashSourceFlavorAssets,
  kontorolSourceProtocolMismatch,
  kontorolSourceProtocolMismatchFlavorAssets
} from './playback-sources-data';
import {youtubeMediaEntryResult, youtubeMediaEntryData} from './provider-parser-data';

describe('provider parser', function() {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });
  describe('_parseAdaptiveSource', () => {
    it('should return a valid adaptive source for a valid input', () => {
      const context = new playbackContext({});
      context.flavorAssets = kontorolDashSourceFlavorAssets;
      const adaptiveSource = OVPProviderParser._parseAdaptiveSource(kontorolDashSource, context, 'myKS', 'myPid', 1234, 1234);
      adaptiveSource.should.exist;
      adaptiveSource.id.should.equal('1234_911,mpegdash');
      adaptiveSource.mimetype.should.equal('application/dash+xml');
      adaptiveSource.url.should.be.a('string');
    });
    it('should return null if play url is empty', () => {
      const context = new playbackContext({});
      context.flavorAssets = kontorolSourceProtocolMismatchFlavorAssets;
      const adaptiveSource = OVPProviderParser._parseAdaptiveSource(kontorolSourceProtocolMismatch, context, 'myKS', 'myPid', 1234, 1234);
      (adaptiveSource === null).should.be.true;
    });
  });
  describe('_parseProgressiveSource', () => {
    it('should return a valid progressive sources when getting separate http/s', () => {
      const context = new playbackContext({});
      context.flavorAssets = kontorolProgressiveSourceFlavorAssets;
      const progressiveSource = OVPProviderParser._getParsedSources(
        [kontorolProgressiveSourceNotSecured, kontorolProgressiveSourceSecured],
        'myKS',
        1234,
        1234,
        {
          id: '1_938734'
        },
        context
      );
      progressiveSource.should.exist;
      progressiveSource.progressive[0].id.should.equal('0_5407xm9j19951,url');
    });
    it('should return a valid progressive source for a valid input', () => {
      const context = new playbackContext({});
      context.flavorAssets = kontorolProgressiveSourceFlavorAssets;
      const progressiveSource = OVPProviderParser._getParsedSources(
        [kontorolProgressiveMultiProtocol],
        'myKS',
        1234,
        1234,
        {
          id: '1_938734'
        },
        context
      );
      progressiveSource.should.exist;
      progressiveSource.progressive[0].id.should.equal('0_5407xm9j19961,url');
    });
  });
  describe('getMediaEntry', () => {
    it('should return a valid youtube source for a valid input', () => {
      const mediaEntry = OVPProviderParser.getMediaEntry(...youtubeMediaEntryData);
      mediaEntry.should.deep.equal(youtubeMediaEntryResult);
    });
  });
});
