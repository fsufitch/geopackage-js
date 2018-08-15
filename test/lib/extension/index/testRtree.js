
var GeoPackageAPI = require('../../../..')
  , GeoPackage = require('../../../../lib/geoPackage')
  , FeatureTableIndex = require('../../../../lib/extension/index/featureTableIndex')
  , RTreeIndexDao = require('../../../../lib/extension/index/rtreeIndex').RTreeIndexDao
  , BoundingBox = require('../../../../lib/boundingBox')
  , Verification = require('../../../fixtures/verification')
  , testSetup = require('../../../fixtures/testSetup')
  , should = require('chai').should()
  , fs = require('fs')
  , path = require('path')
  , async = require('async');

describe('RTree tests', function() {
  var geoPackage;
  var featureDao;

  var originalFilename = path.join(__dirname, '..', '..', '..', 'fixtures', 'super.gpkg');
  var filename;

  function copyGeopackage(orignal, copy, callback) {
    if (typeof(process) !== 'undefined' && process.version) {
      var fsExtra = require('fs-extra');
      fsExtra.copy(originalFilename, filename, callback);
    } else {
      filename = originalFilename;
      callback();
    }
  }

  beforeEach('should open the geopackage', function(done) {
    this.timeout(0);
    filename = path.join(__dirname, '..', '..', '..', 'fixtures', 'tmp', testSetup.createTempName());
    copyGeopackage(originalFilename, filename, function(err) {
      GeoPackageAPI.open(filename, function(err, gp) {
        geoPackage = gp;
        should.not.exist(err);
        should.exist(gp);
        should.exist(gp.getDatabase().getDBConnection());
        gp.getPath().should.be.equal(filename);
        featureDao = geoPackage.getFeatureDaoWithTableName('line1');
        done();
      });
    });
  });

  afterEach('should close the geopackage', function(done) {
    geoPackage.close();
    testSetup.deleteGeoPackage(filename, done);
  });

  it('should return the index status of true', function() {
    var fti = new FeatureTableIndex(geoPackage.getDatabase(), featureDao);
    var indexed = fti.isIndexed();
    fti.rtreeIndexed.should.be.equal(true);
    indexed.should.be.equal(true);
    var exists = fti.hasExtension(RTreeIndexDao.EXTENSION_NAME, fti.tableName, fti.columnName)
    exists.should.be.equal(true);

    var extensionDao = fti.extensionsDao;
    var extensions = extensionDao.queryByExtensionAndTableNameAndColumnName(RTreeIndexDao.EXTENSION_NAME, fti.tableName, fti.columnName);
    var extension = extensions[0];
    extension.getAuthor().should.be.equal('gpkg');
    extension.getExtensionNameNoAuthor().should.be.equal('rtree_index');
    extension.definition.should.be.equal('http://www.geopackage.org/spec/#extension_rtree');
    extension.column_name.should.be.equal('geometry');
    extension.table_name.should.be.equal('line1');
    extension.scope.should.be.equal('write-only');
    extension.extension_name.should.be.equal('gpkg_rtree_index');

  });

  it('should query the index from the geopackage api', function() {
    return GeoPackageAPI.getGeoJSONFeaturesInTile(geoPackage, 'line1', 0, 0, 0)
    .then(function(features) {
      features.length.should.be.equal(1);
    });
  });

  it('should query the index with a geometry envelope', function() {
    var fti = new FeatureTableIndex(geoPackage.getDatabase(), featureDao);
    var bb = new BoundingBox(-105, -103, 39, 40);
    var envelope = bb.buildEnvelope();
    var iterator = fti.queryWithGeometryEnvelope(envelope);
    var count = 0;
    for (var feature of iterator) {
      count++;
    }
    count.should.be.equal(1);
  });

  it('should query the index with a geometry envelope around the 180 line', function() {
    var fti = new FeatureTableIndex(geoPackage.getDatabase(), featureDao);
    var bb = new BoundingBox(-103, -105, 39, 40);
    var envelope = bb.buildEnvelope();
    var iterator = fti.queryWithGeometryEnvelope(envelope);
    var count = 0;
    for (var feature of iterator) {
      count++;
    }
    count.should.be.equal(0);
  });

  it('should query the index with a geometry envelope around the 180 line and find something', function() {
    var fti = new FeatureTableIndex(geoPackage.getDatabase(), featureDao);
    var bb = new BoundingBox(-178, -179, 39, 40);
    var envelope = bb.buildEnvelope();
    var iterator = fti.queryWithGeometryEnvelope(envelope);
    var count = 0;
    for (var feature of iterator) {
      count++;
    }
    count.should.be.equal(1);
  });
});