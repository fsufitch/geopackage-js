/**
 * VTSymbolsRow module.
 * @module extension/vt
 */

var UserRow = require('../../user/userRow');

var util = require('util');

/**
 * Vector Tile Symbols Row containing the values from a single result set row
 * @class
 * @extends {module:user/userRow~UserRow}
 * @param  {module:extension/vt~VTSymbolsTable} vtSymbolsTable
 * @param  {module:db/dataTypes[]} columnTypes  column types
 * @param  {module:dao/columnValues~ColumnValues[]} values      values
 */
var VTSymbolsRow = function(vtSymbolsTable, columnTypes, values) {
  UserRow.call(this, vtSymbolsTable, columnTypes, values);
  this.vtSymbolsTable = vtSymbolsTable;
}

util.inherits(VTSymbolsRow, UserRow);

/**
 * Gets the id column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsRow.prototype.getIdColumn = function() {
  return this.vtSymbolsTable.getIdColumn();
}

/**
 * Gets the id
 * @return {Number}
 */
VTSymbolsRow.prototype.getId = function() {
  return this.getValueWithColumnName(this.getIdColumn().name);
}

/**
 * Get the symbol id column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsRow.prototype.getSymbolIdColumn = function() {
  return this.vtSymbolsTable.getSymbolIdColumn();
}

/**
 * Gets the symbol id
 * @return {string}
 */
VTSymbolsRow.prototype.getSymbolId = function() {
  return this.getValueWithColumnName(this.getSymbolIdColumn().name);
}

/**
 * Sets the symbol id for the row
 * @param  {string} symbolId the symbol id
 */
VTSymbolsRow.prototype.setSymbolId = function(symbolId) {
  this.setValueWithColumnName(this.getSymbolIdColumn().name, symbolId);
}

/**
 * Get the content type column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsRow.prototype.getContentTypeColumn = function() {
  return this.vtSymbolsTable.getContentTypeColumn();
}

/**
 * Gets the content type
 * @return {string}
 */
VTSymbolsRow.prototype.getContentType = function() {
  return this.getValueWithColumnName(this.getContentTypeColumn().name);
}

/**
 * Sets the content type for the row
 * @param  {string} contentType the content type
 */
VTSymbolsRow.prototype.setContentType = function(contentType) {
  this.setValueWithColumnName(this.getContentTypeColumn().name, contentType);
}

/**
 * Get the symbol column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsRow.prototype.getSymbolColumn = function() {
  return this.vtSymbolsTable.getSymbolColumn();
}

/**
 * Gets the symbol
 * @return {Buffer}
 */
VTSymbolsRow.prototype.getSymbol = function() {
  return this.getValueWithColumnName(this.getSymbolColumn().name);
}

/**
 * Sets the symbol for the row
 * @param  {Buffer} symbol the symbol
 */
VTSymbolsRow.prototype.setSymbol = function(symbol) {
  this.setValueWithColumnName(this.getSymbolColumn().name, symbol);
}

/**
 * Get the title column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsRow.prototype.getTitleColumn = function() {
  return this.vtSymbolsTable.getTitleColumn();
}

/**
 * Gets the title
 * @return {string}
 */
VTSymbolsRow.prototype.getTitle = function() {
  return this.getValueWithColumnName(this.getTitleColumn().name);
}

/**
 * Sets the title for the row
 * @param  {string} title the title
 */
VTSymbolsRow.prototype.setTitle = function(title) {
  this.setValueWithColumnName(this.getTitleColumn().name, title);
}

/**
 * Get the description column
 * @return {module:user/userColumn~UserColumn}
 */
VTSymbolsRow.prototype.getDescriptionColumn = function() {
  return this.vtSymbolsTable.getDescriptionColumn();
}

/**
 * Gets the description
 * @return {string}
 */
VTSymbolsRow.prototype.getDescription = function() {
  return this.getValueWithColumnName(this.getDescriptionColumn().name);
}

/**
 * Sets the description for the row
 * @param  {string} description the description
 */
VTSymbolsRow.prototype.setDescription = function(description) {
  this.setValueWithColumnName(this.getDescriptionColumn().name, description);
}

module.exports = VTSymbolsRow;
