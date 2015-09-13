var format = require('../lib/formatters');

describe('formatters module', function () {

  it('toControllerName', function () {
    var transform = format.toControllerName;

    expect(transform('new_sample')).toEqual('NewSampleController');
    expect(transform('new_sample_ctrl')).toEqual('NewSampleController');
    expect(transform('new_sampleController')).toEqual('NewSampleController');
    expect(transform('newSampleCtrl')).toEqual('NewSampleController');
  });

  it('toControllerVarName', function () {
    var transform = format.toControllerVarName;

    expect(transform('new_sample')).toEqual('newSampleController');
    expect(transform('new_sample_ctrl')).toEqual('newSampleController');
    expect(transform('new_sampleController')).toEqual('newSampleController');
    expect(transform('newSampleCtrl')).toEqual('newSampleController');
  });

  it('toConstName', function () {
    expect(format.toConstName('new_sample')).toEqual('NewSample');
  });

  it('toServiceName', function () {
    var transform = format.toServiceName;

    expect(transform('new_sample')).toEqual('NewSample');
    expect(transform('newSampleService')).toEqual('NewSample');
    expect(transform('newSampleSrv')).toEqual('NewSample');
    expect(transform('NewSampleProvider')).toEqual('NewSample');
    expect(transform('new_sample_factory')).toEqual('NewSample');
  });

  it('toDirectiveName', function () {
    var transform = format.toDirectiveName;

    expect(transform('new_sampleDirective')).toEqual('newSample');
    expect(transform('newSampleDrv')).toEqual('newSample');
    expect(transform('NewSample')).toEqual('newSample');
  });

  it('toDirectiveTagName', function () {
    var transform = format.toDirectiveTagName;

    expect(transform('new_sampleDirective')).toEqual('new-sample');
    expect(transform('newSampleDrv')).toEqual('new-sample');
    expect(transform('NewSample')).toEqual('new-sample');
  });

  it('toFilterName', function () {
    expect(format.toFilterName('newSampleFilter')).toEqual('newSample');
    expect(format.toFilterName('New_sample')).toEqual('newSample');
  });

  it('toFolderName', function () {
    expect(format.toFolderName('newSample')).toEqual('new_sample');
  });

  it('toJSFileName', function () {
    var transform = format.toJSFileName;

    expect(transform('newSample_controller')).toEqual('new_sample.js');
    expect(transform('newSample_spec')).toEqual('new_sample.spec.js');
    expect(transform('newSample')).toEqual('new_sample.js');
  });

  it('toHTMLFileName', function () {
    expect(format.toHTMLFileName('NewSample')).toEqual('new_sample.html');
  });

  it('toSCSSFileName', function () {
    expect(format.toSCSSFileName('NewSample')).toEqual('new_sample.scss');
  });

  it('toPartialName', function () {
    expect(format.toPartialName('NewSample')).toEqual('_new_sample.html');
  });

  it('toPartialControllerName', function () {
    expect(format.toPartialControllerName('NewSample')).toEqual('_new_sample.js');
  });

  it('toPartialControllerSpecName', function () {
    expect(format.toPartialControllerSpecName('NewSample')).toEqual('_new_sample.spec.js');
  });

  it('parentPath', function () {
    expect(format.parentPath(['new', 'sample', 'path'])).toEqual('new/sample/path/');
  });

  it('parentState', function () {
    expect(format.parentState(['new', 'sample', 'state'])).toEqual('new.sample.state');
  });

});
