/**
 * vector tile style table module.
 * @module extension/vt
 */

var UserTable = require('../../user/userTable')
  , UserColumn = require('../../user/userColumn')
  , DataType = require('../../db/dataTypes');

var util = require('util');


var VTSymbolsTable = function() {
  var columns = VTSymbolsTable.createRequiredColumns();
  UserTable.call(this, 'gpkgext_symbols', columns);
}

util.inherits(VTSymbolsTable, UserTable);

/**
 * Get the required columns
 * @return {string[]}
 */
VTSymbolsTable.requiredColumns = function() {
  var requiredColumns = [];
  requiredColumns.push(VTSymbolsTable.COLUMN_ID);
  requiredColumns.push(VTSymbolsTable.COLUMN_SYMBOL_ID);
  requiredColumns.push(VTSymbolsTable.COLUMN_CONTENT_TYPE);
  requiredColumns.push(VTSymbolsTable.COLUMN_SYMBOL);
  requiredColumns.push(VTSymbolsTable.COLUMN_NAME);
  requiredColumns.push(VTSymbolsTable.COLUMN_DESCRIPTION);
  return requiredColumns;
}

/**
 * Get the number of required columns
 * @return {Number}
 */
VTSymbolsTable.numRequiredColumns = function(){
  return VTSymbolsTable.requiredColumns().length;
}

/**
 * Create the required columns
 * @param  {Number} [startingIndex=0] starting index of the required columns
 * @param  {string} [idColumnName=id]  id column name
 * @return {module:user/userColumn~UserColumn[]}
 */
VTSymbolsTable.createRequiredColumns = function(startingIndex) {
  startingIndex = startingIndex || 0;
  return [
    VTSymbolsTable.createIdColumn(startingIndex++),
    VTSymbolsTable.createSymbolIdColumn(startingIndex++),
    VTSymbolsTable.createContentTypeColumn(startingIndex++),
    VTSymbolsTable.createSymbolColumn(startingIndex++),
    VTSymbolsTable.createNameColumn(startingIndex++),
    VTSymbolsTable.createDescriptionColumn(startingIndex++)
  ];
}

/**
 * Create the primary key id column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.createIdColumn = function(index) {
  return UserColumn.createPrimaryKeyColumnWithIndexAndName(index, VTSymbolsTable.COLUMN_ID);
}

/**
 * Create the symbol id column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.createSymbolIdColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTSymbolsTable.COLUMN_SYMBOL_ID, DataType.GPKGDataType.GPKG_DT_TEXT, true);
}

/**
 * Create the content type column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.createContentTypeColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTSymbolsTable.COLUMN_CONTENT_TYPE, DataType.GPKGDataType.GPKG_DT_TEXT, true);
}

/**
 * Create the symbol column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.createSymbolColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTSymbolsTable.COLUMN_SYMBOL, DataType.GPKGDataType.GPKG_DT_BLOB, true);
}

/**
 * Create the title column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.createTitleColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTSymbolsTable.COLUMN_TITLE, DataType.GPKGDataType.GPKG_DT_TEXT, false);
}

/**
 * Create the description column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.createDescriptionColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTSymbolsTable.COLUMN_DESCRIPTION, DataType.GPKGDataType.GPKG_DT_TEXT, false);
}

/**
 * Get the primary key id column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.prototype.getIdColumn = function() {
  return this.getPkColumn();
}

/**
 * Get the symbol id column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.prototype.getSymbolIdColumn = function() {
  return this.getColumnWithColumnName(VTSymbolsTable.COLUMN_SYMBOL_ID);
}

/**
 * Get the content type column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.prototype.getContentTypeColumn = function() {
  return this.getColumnWithColumnName(VTSymbolsTable.COLUMN_CONTENT_TYPE);
}

/**
 * Get the symbol column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.prototype.getSymbolColumn = function() {
  return this.getColumnWithColumnName(VTSymbolsTable.COLUMN_SYMBOL);
}

/**
 * Get the title column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.prototype.getTitleColumn = function() {
  return this.getColumnWithColumnName(VTSymbolsTable.COLUMN_TITLE);
}

/**
 * Get the description column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsTable.prototype.getDescriptionColumn = function() {
  return this.getColumnWithColumnName(VTSymbolsTable.COLUMN_DESCRIPTION);
}


VTSymbolsTable.COLUMN_ID = 'id';
VTSymbolsTable.COLUMN_SYMBOL_ID = 'symbol_id';
VTSymbolsTable.COLUMN_CONTENT_TYPE = 'content_type';
VTSymbolsTable.COLUMN_SYMBOL = 'symbol';
VTSymbolsTable.COLUMN_TITLE = 'title';
VTSymbolsTable.COLUMN_DESCRIPTION = 'description';

module.exports = VTSymbolsTable;
