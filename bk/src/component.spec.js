//'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const fs = require("fs");
const mockfs = require('mock-fs');
var JSONfn = require('json-fn');

const path = require('path');

describe('component', function() {

  let c = null;

  before(function() {
  });

  after(function() {
  });

  beforeEach(function () {
    component = require('./component').create(require('./logger').create(0), '/some/path', null, 'test-component', [] );
  })

  afterEach(function () {
    component = null;
  })

  it('Component can be created', function() {
    const cwd = process.cwd();
    expect(component).to.be.an('object');
  });

  it('Enum folders', function() {
    mockfs({
      'android': {},
      'cmake': {},
      'docker': {},
      '.git': {},
      '.tln': {},
      'java': {},
      'maven': {},
      'nodejs': {},
      '.tln.conf': '{}'
    });
    const folders = component.enumFolders('.');
    expect(folders.length).to.be.equal(6);
    mockfs.restore();
  });

  it('Merge descs from hierarchy of folders', function() {
    const desc = component.mergeDescs(path.join(process.cwd(), 'presets'), true);
    expect(desc.components()).to.not.equal(null);
    expect(desc.components().length).to.not.equal(0);
  });

  it.skip('Generate configuration', function() {
    fs.mount("/some", mockfs.fs({
      "/path": {}
    }))
    component.initConfiguration({repo: null, force: false, lightweight: false});
    expect(fs.existsSync('/some/path/.tln.conf')).to.be.true;
    fs.unmount("/some");
  });

});