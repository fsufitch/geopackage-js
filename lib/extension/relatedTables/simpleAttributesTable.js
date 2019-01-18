/**
 * simpleAttributesTable module.
 * @module extension/relatedTables
 */

var UserTable = require('../../user/userTable')
  , UserRelatedTable = require('./userRelatedTable')
  , UserColumn = require('../../user/userColumn')
  , DataTypes = require('../../db/dataTypes')
  , RelationType = require('./relationType');

var util = require('util');

/**
 * Simple Attributes Requirements Class User-Defined Related Data Table
 * @class
 * @extends {module:extension/relatedTables~UserRelatedTable}
 * @param  {string} tableName table name
 * @param  {module:user/userColumn~UserColumn[]} columns   attribute columns
 * @param {string[]} requiredColumns required column names
 */
var SimpleAttributesTable = function(tableName, columns, requiredColumns) {
  UserRelatedTable.call(this, tableName, SimpleAttributesTable.RELATION_TYPE.name, SimpleAttributesTable.RELATION_TYPE.dataType, columns, requiredColumns);
  this.validateColumns();
}

util.inherits(SimpleAttributesTable, UserRelatedTable);

/**
 * Create a simple attributes table with the columns
 * @param  {string} tableName name of the table
 * @param  {module:user/userColumn~UserColumn[]} additionalColumns additional columns
 * @return {module:extension/relatedTables~SimpleAttributesTable}
 */
SimpleAttributesTable.create = function(tableName, additionalColumns) {
  var tableColumns = SimpleAttributesTable.createRequiredColumns(0);

  if (additionalColumns) {
    tableColumns = tableColumns.concat(additionalColumns);
  }

  return new SimpleAttributesTable(tableName, tableColumns, SimpleAttributesTable.requiredColumns());
}

/**
 * Get the required columns
 * @param  {string} [idColumnName=id] id column name
 * @return {string[]}
 */
SimpleAttributesTable.requiredColumns = function(idColumnName) {
  var requiredColumns = [];
  requiredColumns.push(idColumnName || SimpleAttributesTable.COLUMN_ID);
  return requiredColumns;
}

/**
 * Get the number of required columns
 * @return {Number}
 */
SimpleAttributesTable.numRequiredColumns = function(){
  return SimpleAttributesTable.requiredColumns().length;
}

/**
 * Create the required columns
 * @param  {Number} [startingIndex=0] starting index of the required columns
 * @param  {string} [idColumnName=id]  id column name
 * @return {module:user/userColumn~UserColumn[]}
 */
SimpleAttributesTable.createRequiredColumns = function(startingIndex, idColumnName) {
  startingIndex = startingIndex || 0;
  return [SimpleAttributesTable.createIdColumn(startingIndex++, idColumnName || SimpleAttributesTable.COLUMN_ID)];
}

/**
 * Create the primary key id column
 * @param  {Number} index        index of the column
 * @param  {string} idColumnName name of the id column
 * @return {module:user/userColumn~UserColumn}
 */
SimpleAttributesTable.createIdColumn = function(index, idColumnName) {
  return UserColumn.createPrimaryKeyColumnWithIndexAndName(index, idColumnName);
}

/**
 * Validate that Simple Attributes columns to verify at least one non id
 * column exists and that all columns are simple data types
 */
SimpleAttributesTable.prototype.validateColumns = function() {
  var columns = this.columns;
  if (columns.length < 2) {
    throw new Error('Simple Attributes Tables require at least one non id column');
  }

  for (var i = 0; i < columns.length; i++) {
    var column = columns[i];
    if (!SimpleAttributesTable.isSimple(column)) {
      throw new Error('Simple Attributes Tables only support simple data types. Column: ' + column.name + ', Non Simple Data Type: ' + column.dataType);
    }
  }
}

/**
 * Get the column index of the id column
 * @return {Number}
 */
SimpleAttributesTable.prototype.getIdColumnIndex = function() {
  return this.pkIndex;
}

/**
 * Get the primary key id column
 * @return {module:user/userColumn~UserColumn}
 */
SimpleAttributesTable.prototype.getIdColumn = function() {
  return this.getPkColumn();
}

/**
 * Determine if the column is a simple column
 * @param  {module:user/userColumn~UserColumn} column column to check
 * @return {Boolean}
 */
SimpleAttributesTable.isSimple = function(column) {
  return column.notNull && SimpleAttributesTable.isSimpleDataType(column.dataType);
}

/**
 * Determine if the data type is a simple type: TEXT, INTEGER, or REAL
 * @param {module:db/dataTypes~GPKGDataType}
 * @return {Boolean}
 */
SimpleAttributesTable.isSimpleDataType = function(dataType) {
  return dataType !== DataTypes.GPKGDataType.GPKG_DT_BLOB && dataType !== DataTypes.GPKGDataType.GPKG_DT_GEOMETRY;
}

SimpleAttributesTable.RELATION_TYPE = RelationType.SIMPLE_ATTRIBUTES;
SimpleAttributesTable.COLUMN_ID = 'id';

SimpleAttributesTable.prototype.TABLE_TYPE = 'simple_attributes';

module.exports = SimpleAttributesTable;
