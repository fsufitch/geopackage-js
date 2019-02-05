/**
 * VTSymbolsDao module.
 * @module extension/vt
 */

var VTSymbolsRow = require('./vtSymbolsRow')
  , VTSymbolsTable = require('./vtSymbolsTable')
  , Dao = require('../../dao/dao')
  , UserDao = require('../../user/userDao')
  , UserTableReader = require('../../user/userTableReader');

var util = require('util');

/**
 * Vector tile symbols DAO for reading symbols
 * @class
 * @extends {module:user/userDao~UserDao}
 * @param  {module:db/geoPackageConnection~GeoPackageConnection} connection        connection
 * @param  {module:user/userTable~UserTable} table table
 */
var VTSymbolsDao = function(geoPackage, table) {
  UserDao.call(this, geoPackage, table);
  this.vtSymbolsTable = table;
}

util.inherits(VTSymbolsDao, UserDao);

/**
 * Reads the table specified from the geopackage
 * @param  {module:geoPackage~GeoPackage} geoPackage      geopackage object
 * @param  {string} tableName       table name
 * @param  {string[]} requiredColumns required columns
 * @return {module:user/userDao~UserDao}
 */
VTSymbolsDao.readTable = function(geoPackage, tableName) {
  var reader = new UserTableReader(tableName);
  var userTable = reader.readTable(geoPackage.getDatabase());
  return new VTSymbolsDao(geoPackage, userTable);
}

/**
 * Create a new symbols row
 * @return {module:extension/relatedTables~MediaRow}
 */
VTSymbolsDao.prototype.newRow = function() {
  return new VTSymbolsDao(this.vtSymbolsTable);
}

/**
 * Create a VT symbols row with the column types and values
 * @param  {module:db/dataTypes[]} columnTypes  column types
 * @param  {module:dao/columnValues~ColumnValues[]} values      values
 * @return {module:extension/vt~VTSymbolsRow}             VT symbols row
 */
VTSymbolsDao.prototype.newRowWithColumnTypes = function (columnTypes, values) {
  return new VTSymbolsDao(this.vtLayersTable, columnTypes, values);
};

/**
 * Gets the symbols table
 * @return {module:extension/vt~VTSymbolsTable}
 */
VTSymbolsDao.prototype.getTable = function() {
  return this.vtSymbolsTable;
}

/**
 * Gets the rows in this table by id
 * @param  {Number[]} ids ids to query for
 * @return {Object[]}
 */
VTSymbolsDao.prototype.getRows = function(ids) {
  var vtSymbolsRows = [];
  for (var i = 0; i < ids.length; i++) {
    var row = this.queryForId(ids[i]);
    if (row) {
      vtSymbolsRows.push(row);
    }
  }
  return vtSymbolsRows;
}

VTSymbolsDao.prototype.getAllRows = function() {
  return this.queryForAll();
}

VTSymbolsDao.prototype.getRowsForSymbolId = function(symbolId) {
  return this.queryForAllEq(VTSymbolsTable.COLUMN_SYMBOL_ID, symbolId);
}

module.exports = VTSymbolsDao;
