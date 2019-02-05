/**
 * vector tile style table module.
 * @module extension/vt
 */

var UserTable = require('../../user/userTable')
  , UserColumn = require('../../user/userColumn')
  , DataType = require('../../db/dataTypes');

var util = require('util');


var VTStylesTable = function() {
  var columns = VTStylesTable.createRequiredColumns();
  UserTable.call(this, 'gpkgext_stylesheets', columns);
}

util.inherits(VTStylesTable, UserTable);

/**
 * Get the required columns
 * @return {string[]}
 */
VTStylesTable.requiredColumns = function() {
  var requiredColumns = [];
  requiredColumns.push(VTStylesTable.COLUMN_ID);
  requiredColumns.push(VTStylesTable.COLUMN_LAYER_SET);
  requiredColumns.push(VTStylesTable.COLUMN_STYLE);
  requiredColumns.push(VTStylesTable.COLUMN_STYLESHEET);
  requiredColumns.push(VTStylesTable.COLUMN_FORMAT);
  requiredColumns.push(VTStylesTable.COLUMN_NAME);
  requiredColumns.push(VTStylesTable.COLUMN_DESCRIPTION);
  return requiredColumns;
}

/**
 * Get the number of required columns
 * @return {Number}
 */
VTStylesTable.numRequiredColumns = function(){
  return VTStylesTable.requiredColumns().length;
}

/**
 * Create the required columns
 * @param  {Number} [startingIndex=0] starting index of the required columns
 * @param  {string} [idColumnName=id]  id column name
 * @return {module:user/userColumn~UserColumn[]}
 */
VTStylesTable.createRequiredColumns = function(startingIndex) {
  startingIndex = startingIndex || 0;
  return [
    VTStylesTable.createIdColumn(startingIndex++),
    VTStylesTable.createLayerSetColumn(startingIndex++),
    VTStylesTable.createStyleColumn(startingIndex++),
    VTStylesTable.createStyleSheetColumn(startingIndex++),
    VTStylesTable.createFormatColumn(startingIndex++),
    VTStylesTable.createTitleColumn(startingIndex++),
    VTStylesTable.createDescriptionColumn(startingIndex++)
  ];
}

/**
 * Create the primary key id column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createIdColumn = function(index) {
  return UserColumn.createPrimaryKeyColumnWithIndexAndName(index, VTStylesTable.COLUMN_ID);
}

/**
 * Create the layer set column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createLayerSetColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTStylesTable.COLUMN_LAYER_SET, DataType.GPKGDataType.GPKG_DT_TEXT, true);
}

/**
 * Create the style column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createStyleColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTStylesTable.COLUMN_STYLE, DataType.GPKGDataType.GPKG_DT_TEXT, true);
}

/**
 * Create the stylesheet column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createStyleSheetColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTStylesTable.COLUMN_STYLESHEET, DataType.GPKGDataType.GPKG_DT_BLOB, true);
}

/**
 * Create the format column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createFormatColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTStylesTable.COLUMN_FORMAT, DataType.GPKGDataType.GPKG_DT_TEXT, true);
}

/**
 * Create the title column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createTitleColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTStylesTable.COLUMN_TITLE, DataType.GPKGDataType.GPKG_DT_TEXT, false);
}

/**
 * Create the description column
 * @param  {Number} index        index of the column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.createDescriptionColumn = function(index) {
  return UserColumn.createColumnWithIndex(index, VTStylesTable.COLUMN_DESCRIPTION, DataType.GPKGDataType.GPKG_DT_TEXT, false);
}

/**
 * Get the primary key id column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getIdColumn = function() {
  return this.getPkColumn();
}

/**
 * Get the layer set column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getLayerSetColumn = function() {
  return this.getColumnWithColumnName(VTStylesTable.COLUMN_LAYER_SET);
}

/**
 * Get the style column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getStyleColumn = function() {
  return this.getColumnWithColumnName(VTStylesTable.COLUMN_STYLE);
}

/**
 * Get the stylesheet column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getStyleSheetColumn = function() {
  return this.getColumnWithColumnName(VTStylesTable.COLUMN_STYLESHEET);
}

/**
 * Get the format column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getFormatColumn = function() {
  return this.getColumnWithColumnName(VTStylesTable.COLUMN_FORMAT);
}

/**
 * Get the title column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getTitleColumn = function() {
  return this.getColumnWithColumnName(VTStylesTable.COLUMN_TITLE);
}

/**
 * Get the description column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesTable.prototype.getDescriptionColumn = function() {
  return this.getColumnWithColumnName(VTStylesTable.COLUMN_DESCRIPTION);
}


VTStylesTable.COLUMN_ID = 'id';
VTStylesTable.COLUMN_LAYER_SET = 'layer_set';
VTStylesTable.COLUMN_STYLE = 'style';
VTStylesTable.COLUMN_STYLESHEET = 'stylesheet';
VTStylesTable.COLUMN_FORMAT = 'format';
VTStylesTable.COLUMN_TITLE = 'title';
VTStylesTable.COLUMN_DESCRIPTION = 'description';

module.exports = VTStylesTable;
