var format = require('../lib/formatters');

describe('formatters module', function () {

  it('toControllerName', function () {
    expect(format.toControllerName('new_sample')).toEqual('NewSampleController');
    expect(format.toControllerName('new_sample_ctrl')).toEqual('NewSampleController');
    expect(format.toControllerName('new_sampleController')).toEqual('NewSampleController');
    expect(format.toControllerName('newSampleCtrl')).toEqual('NewSampleController');
  });

  it('toControllerVarName', function () {
    expect(format.toControllerVarName('new_sample')).toEqual('newSampleController');
    expect(format.toControllerVarName('new_sample_ctrl')).toEqual('newSampleController');
    expect(format.toControllerVarName('new_sampleController')).toEqual('newSampleController');
    expect(format.toControllerVarName('newSampleCtrl')).toEqual('newSampleController');
  });

  it('toConstName', function () {
    expect(format.toConstName('new_sample')).toEqual('NewSample');
  });

  it('toServiceName', function () {
    expect(format.toServiceName('new_sample')).toEqual('NewSample');
    expect(format.toServiceName('newSampleService')).toEqual('NewSample');
    expect(format.toServiceName('newSampleSrv')).toEqual('NewSample');
    expect(format.toServiceName('NewSampleProvider')).toEqual('NewSample');
    expect(format.toServiceName('new_sample_factory')).toEqual('NewSample');
  });

  it('toDirectiveName', function () {
    expect(format.toDirectiveName('new_sampleDirective')).toEqual('newSample');
    expect(format.toDirectiveName('newSampleDrv')).toEqual('newSample');
    expect(format.toDirectiveName('NewSample')).toEqual('newSample');
  });

  it('toDirectiveTagName', function () {
    expect(format.toDirectiveTagName('new_sampleDirective')).toEqual('new-sample');
    expect(format.toDirectiveTagName('newSampleDrv')).toEqual('new-sample');
    expect(format.toDirectiveTagName('NewSample')).toEqual('new-sample');
  });

  it('toFilterName', function () {
    expect(format.toFilterName('newSampleFilter')).toEqual('newSample');
    expect(format.toFilterName('New_sample')).toEqual('newSample');
  });

  it('toFolderName', function () {
    expect(format.toFolderName('newSample')).toEqual('new_sample');
  });

  it('toJSFileName', function () {
    expect(format.toJSFileName('newSample_controller')).toEqual('new_sample.controller.js');
    expect(format.toJSFileName('newSample_spec')).toEqual('new_sample.spec.js');
    expect(format.toJSFileName('newSample')).toEqual('new_sample.js');
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
    expect(format.toPartialControllerName('NewSample')).toEqual('_new_sample.controller.js');
  });

  it('toPartialControllerSpecName', function () {
    expect(format.toPartialControllerSpecName('NewSample')).toEqual('_new_sample.controller.spec.js');
  });

  it('parentPath', function () {
    expect(format.parentPath(['new', 'sample', 'path'])).toEqual('new/sample/path/');
  });

  it('parentState', function () {
    expect(format.parentState(['new', 'sample', 'state'])).toEqual('new.sample.state');
  });

});
