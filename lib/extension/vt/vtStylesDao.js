/**
 * VTStylesDao module.
 * @module extension/vt
 */

var VTStylesRow = require('./vtStylesRow')
  , VTStylesTable = require('./vtStylesTable')
  , Dao = require('../../dao/dao')
  , UserDao = require('../../user/userDao')
  , UserTableReader = require('../../user/userTableReader');

var util = require('util');

/**
 * Vector tile styles DAO for reading style sheets
 * @class
 * @extends {module:user/userDao~UserDao}
 * @param  {module:db/geoPackageConnection~GeoPackageConnection} connection        connection
 * @param  {module:user/userTable~UserTable} table table
 */
var VTStylesDao = function(geoPackage, table) {
  UserDao.call(this, geoPackage, table);
  this.vtStylesTable = table;
}

util.inherits(VTStylesDao, UserDao);

/**
 * Reads the table specified from the geopackage
 * @param  {module:geoPackage~GeoPackage} geoPackage      geopackage object
 * @param  {string} tableName       table name
 * @param  {string[]} requiredColumns required columns
 * @return {module:user/userDao~UserDao}
 */
VTStylesDao.readTable = function(geoPackage, tableName) {
  var reader = new UserTableReader(tableName);
  var userTable = reader.readTable(geoPackage.getDatabase());
  return new VTStylesDao(geoPackage, userTable);
}

/**
 * Create a new vector styles row
 * @return {module:extension/relatedTables~MediaRow}
 */
VTStylesDao.prototype.newRow = function() {
  return new VTStylesRow(this.vtStylesTable);
}

/**
 * Create a VT styles row with the column types and values
 * @param  {module:db/dataTypes[]} columnTypes  column types
 * @param  {module:dao/columnValues~ColumnValues[]} values      values
 * @return {module:extension/vt~VTStylesRow}             VT styles row
 */
VTStylesDao.prototype.newRowWithColumnTypes = function (columnTypes, values) {
  return new VTStylesRow(this.vtLayersTable, columnTypes, values);
};

/**
 * Gets the styles table
 * @return {module:extension/vt~VTStylesTable}
 */
VTStylesDao.prototype.getTable = function() {
  return this.vtStylesTable;
}

/**
 * Gets the rows in this table by id
 * @param  {Number[]} ids ids to query for
 * @return {Object[]}
 */
VTStylesDao.prototype.getRows = function(ids) {
  var vtStylesRows = [];
  for (var i = 0; i < ids.length; i++) {
    var row = this.queryForId(ids[i]);
    if (row) {
      vtStylesRows.push(row);
    }
  }
  return vtStylesRows;
}

VTStylesDao.prototype.getAllRows = function() {
  return this.queryForAll();
}
VTStylesDao.prototype.getRowsForLayerSet = function(layerSet) {
  return this.queryForAllEq(VTStylesTable.COLUMN_LAYER_SET, layerSet);
}

module.exports = VTStylesDao;
