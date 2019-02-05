/**
 * VTStylesRow module.
 * @module extension/vt
 */

var UserRow = require('../../user/userRow');

var util = require('util');

/**
 * Vector Tile Styles Row containing the values from a single result set row
 * @class
 * @extends {module:user/userRow~UserRow}
 * @param  {module:extension/vt~VTStylesTable} vtStylesTable
 * @param  {module:db/dataTypes[]} columnTypes  column types
 * @param  {module:dao/columnValues~ColumnValues[]} values      values
 */
var VTStylesRow = function(vtStylesTable, columnTypes, values) {
  UserRow.call(this, vtStylesTable, columnTypes, values);
  this.vtStylesTable = vtStylesTable;
}

util.inherits(VTStylesRow, UserRow);

/**
 * Gets the id column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getIdColumn = function() {
  return this.vtStylesTable.getIdColumn();
}

/**
 * Gets the id
 * @return {Number}
 */
VTStylesRow.prototype.getId = function() {
  return this.getValueWithColumnName(this.getIdColumn().name);
}

/**
 * Get the layer set column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getLayerSetColumn = function() {
  return this.vtStylesTable.getLayerSetColumn();
}

/**
 * Gets the layer set
 * @return {string}
 */
VTStylesRow.prototype.getLayerSet = function() {
  return this.getValueWithColumnName(this.getLayerSetColumn().name);
}

/**
 * Sets the layer set for the row
 * @param  {string} layerSet the layer set
 */
VTStylesRow.prototype.setLayerSet = function(layerSet) {
  this.setValueWithColumnName(this.getTableNameColumn().name, layerSet);
}

/**
 * Get the style column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getStyleColumn = function() {
  return this.vtStylesTable.getStyleColumn();
}

/**
 * Gets the style
 * @return {string}
 */
VTStylesRow.prototype.getStyle = function() {
  return this.getValueWithColumnName(this.getStyleColumn().name);
}

/**
 * Sets the style for the row
 * @param  {string} style the style
 */
VTStylesRow.prototype.setLayerSet = function(style) {
  this.setValueWithColumnName(this.getStyleColumn().name, style);
}

/**
 * Get the stylesheet column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getStyleSheetColumn = function() {
  return this.vtStylesTable.getStyleSheetColumn();
}

/**
 * Gets the stylesheet
 * @return {Buffer}
 */
VTStylesRow.prototype.getStyleSheet = function() {
  return this.getValueWithColumnName(this.getStyleSheetColumn().name);
}

/**
 * Sets the stylesheet for the row
 * @param  {Buffer} stylesheet the stylesheet
 */
VTStylesRow.prototype.setStyleSheet = function(stylesheet) {
  this.setValueWithColumnName(this.getStyleSheetColumn().name, stylesheet);
}

/**
 * Get the format column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getFormatColumn = function() {
  return this.vtStylesTable.getFormatColumn();
}

/**
 * Gets the format
 * @return {string}
 */
VTStylesRow.prototype.getFormat = function() {
  return this.getValueWithColumnName(this.getFormatColumn().name);
}

/**
 * Sets the format for the row
 * @param  {string} format the format
 */
VTStylesRow.prototype.setFormat = function(format) {
  this.setValueWithColumnName(this.getFormatColumn().name, format);
}

/**
 * Get the title column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getTitleColumn = function() {
  return this.vtStylesTable.getTitleColumn();
}

/**
 * Gets the title
 * @return {string}
 */
VTStylesRow.prototype.getTitle = function() {
  return this.getValueWithColumnName(this.getTitleColumn().name);
}

/**
 * Sets the title for the row
 * @param  {string} title the title
 */
VTStylesRow.prototype.setTitle = function(title) {
  this.setValueWithColumnName(this.getTitleColumn().name, title);
}

/**
 * Get the description column
 * @return {module:user/userColumn~UserColumn}
 */
VTStylesRow.prototype.getDescriptionColumn = function() {
  return this.vtStylesTable.getDescriptionColumn();
}

/**
 * Gets the description
 * @return {string}
 */
VTStylesRow.prototype.getDescription = function() {
  return this.getValueWithColumnName(this.getDescriptionColumn().name);
}

/**
 * Sets the description for the row
 * @param  {string} description the description
 */
VTStylesRow.prototype.setDescription = function(description) {
  this.setValueWithColumnName(this.getDescriptionColumn().name, description);
}

module.exports = VTStylesRow;
