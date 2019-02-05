'use strict';

const Color = require('color');

const getNearestColor = require('./get-nearest-color');
const palette = require('./palette');

const baseColorValues = palette.base.map((color) => new Color(color).toString());

function getAmbientColor(colors) {
    const ambientColor = colors
        .map((color) => new Color(color))
        .filter((color) => {
            return !baseColorValues.includes(color.toString());
        })
        .sort((colorA, colorB) => colorA.luminosity() - colorB.luminosity())
        .find((color) => color);

    if (ambientColor && ambientColor.luminosity() <= 0.5) {
        return ambientColor.toString();
    }
    return getNearestColor('#000000');
}

module.exports = getAmbientColor;
