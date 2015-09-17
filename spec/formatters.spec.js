const Format = require('../lib/format');

describe('formatters module', () => {

  it('toControllerName', () => {
    const transform = Format.toControllerName;

    expect(transform('new_sample')).toEqual('NewSampleController');
    expect(transform('new_sample_ctrl')).toEqual('NewSampleController');
    expect(transform('new_sampleController')).toEqual('NewSampleController');
    expect(transform('newSampleCtrl')).toEqual('NewSampleController');
  });

  it('toControllerVarName', () => {
    const transform = Format.toControllerVarName;

    expect(transform('new_sample')).toEqual('newSampleController');
    expect(transform('new_sample_ctrl')).toEqual('newSampleController');
    expect(transform('new_sampleController')).toEqual('newSampleController');
    expect(transform('newSampleCtrl')).toEqual('newSampleController');
  });

  it('toConstName', () => {
    expect(Format.toConstName('new_sample')).toEqual('NewSample');
  });

  it('toServiceName', () => {
    const transform = Format.toServiceName;

    expect(transform('new_sample')).toEqual('NewSample');
    expect(transform('newSampleService')).toEqual('NewSample');
    expect(transform('newSampleSrv')).toEqual('NewSample');
    expect(transform('NewSampleProvider')).toEqual('NewSample');
    expect(transform('new_sample_factory')).toEqual('NewSample');
  });

  it('toDirectiveName', () => {
    const transform = Format.toDirectiveName;

    expect(transform('new_sampleDirective')).toEqual('newSample');
    expect(transform('newSampleDrv')).toEqual('newSample');
    expect(transform('NewSample')).toEqual('newSample');
  });

  it('toDirectiveTagName', () => {
    const transform = Format.toDirectiveTagName;

    expect(transform('new_sampleDirective')).toEqual('new-sample');
    expect(transform('newSampleDrv')).toEqual('new-sample');
    expect(transform('NewSample')).toEqual('new-sample');
  });

  it('toFilterName', () => {
    expect(Format.toFilterName('newSampleFilter')).toEqual('newSample');
    expect(Format.toFilterName('New_sample')).toEqual('newSample');
  });

  it('toFolderName', () => {
    expect(Format.toFolderName('newSample')).toEqual('new_sample');
  });

  it('toJSFileName', () => {
    const transform = Format.toJSFileName;

    expect(transform('newSample_controller')).toEqual('new_sample.js');
    expect(transform('newSample_spec')).toEqual('new_sample.spec.js');
    expect(transform('newSample')).toEqual('new_sample.js');
  });

  it('toHTMLFileName', () => {
    expect(Format.toHTMLFileName('NewSample')).toEqual('new_sample.html');
  });

  it('toSCSSFileName', () => {
    expect(Format.toSCSSFileName('NewSample')).toEqual('new_sample.scss');
  });

  it('toPartialName', () => {
    expect(Format.toPartialName('NewSample')).toEqual('_new_sample.html');
  });

  it('toPartialControllerName', () => {
    expect(Format.toPartialControllerName('NewSample')).toEqual('_new_sample.js');
  });

  it('toPartialControllerSpecName', () => {
    expect(Format.toPartialControllerSpecName('NewSample')).toEqual('_new_sample.spec.js');
  });

  it('parentPath', () => {
    expect(Format.parentPath(['new', 'sample', 'path'])).toEqual('new/sample/path/');
  });

  it('parentState', () => {
    expect(Format.parentState(['new', 'sample', 'state'])).toEqual('new.sample.state');
  });

});
