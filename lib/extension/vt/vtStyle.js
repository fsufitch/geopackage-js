/**
 * VTStyle module.
 * @module extension/vt
 */

var VTStyleLayer = function(id, type, sourceLayer, style, filterFunc) {
    this.id = id;
    this.type = type;
    this.sourceLayer = sourceLayer;
    this.style = style;
    this.filterFunc = filterFunc;
}

/**
 * Vector tile style class for encapsulating style information
 * @class
 * @param  {string} title       the title of the style
 * @param  {string} filter      the type of the style (e.g. Night, Topographic, Overlay)
 */
var VTStyle = function(title, filter) {
    this.title = title;
    this.filter = filter;

    this.layers = [];
}

VTStyle.prototype.getStyleLayersForSourceLayer = function(name, properties) {
    return this.layers
        .filter(layer => layer.sourceLayer == name)
        .filter(layer => layer.filterFunc(properties));
}

/**
 * Reads and parses a Mapbox Style specification into a generic VTStyle object
 * @param  {string} title       the title of the style
 * @param  {string} filter      the type of the style (e.g. Night, Topographic, Overlay)
 * @param  {Buffer} data       data
 * @return {extension/vt~VTStyle}
 */
VTStyle.fromMbstyle = function(title, filter, data) {
    var vtStyle = new VTStyle(title, filter);
    var mbStyleText = new TextDecoder("utf-8").decode(data);
    var mbStyleParsed = JSON.parse(mbStyleText);
    for (var layer of mbStyleParsed.layers) {
        vtStyle.layers.push(new VTStyleLayer(
            layer.id,
            layer.type,
            layer['source-layer'],
            stubStyle(layer.type), // TODO: actual parsing
            function(attributes){return true;}, // TODO: actual filter function
        ))
    }
    return vtStyle;
}

function stubStyle(layerType) {
    var styleObj = {};
    switch (layerType) {
    case 'fill':
        styleObj.stroke = true;
        styleObj.color = '#0F0';
        styleObj.weight = 3;
        styleObj.opacity = 1;
        styleObj.fill = true;
        styleObj.fillColor = '#F0F';
        styleObj.fillOpacity = 0.5;
        break;

    case 'line':
        styleObj.stroke = true;
        styleObj.color = '#F0F';
        styleObj.weight = 2;
        styleObj.opacity = 1;
        break;
    }
    return styleObj;
}

/**
 * Reads and parses a SLD Style specification into a generic VTStyle object
 * @param  {string} title       the title of the style
 * @param  {string} filter      the type of the style (e.g. Night, Topographic, Overlay)
 * @param  {Buffer} data       data
 * @return {extension/vt~VTStyle}
 */
VTStyle.fromSld = function(title, filter, data) {
    throw "SLD not supported yet";
}

/**
 * Reads and parses a CMSS Style specification into a generic VTStyle object
 * @param  {string} title       the title of the style
 * @param  {string} filter      the type of the style (e.g. Night, Topographic, Overlay)
 * @param  {Buffer} data       data
 * @return {extension/vt~VTStyle}
 */
VTStyle.fromCmss = function(title, filter, data) {
    throw "CMSS not supported yet";
}

module.exports = VTStyle;