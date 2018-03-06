'use strict';

const fs = require('fs-extra');
const path = require('path');
const Color = require('color');
const nearestColor = require('nearest-color');
const jsdom = require('jsdom');

const palette = require('./lib/palette');
const baseSourcePath = path.join(__dirname, '../node_modules/flag-svg-collection/flags');
const baseDestinationPath = path.join(__dirname, '../public');

const getNearestBaseColor = nearestColor.from(palette.base);
const getNearestBrandColor = nearestColor.from(palette.brand);

function getColor(value) {
    const color = new Color(value).hsl();

    // Use nearest base color if the lightness is too dark/light
    if (color.color[2] < 15 || color.color[2] > 85) {
        return getNearestBaseColor(color.rgb().toString());
    }

    // Get nearest brand color
    return getNearestBrandColor(color.rgb().toString());
}

function setFill(node) {
    const fill = node.getAttribute('fill');

    if (fill) {
        if (!fill.includes('none') && !fill.includes('url')) {
            node.setAttribute('fill', getColor(fill));
        }
    } else if (node.parentNode.tagName === 'svg') {
        node.setAttribute('fill', getColor('#000'));
    }
}

function setStroke(node) {
    const stroke = node.getAttribute('stroke');

    if (stroke) {
        if (!stroke.includes('none')) {
            node.setAttribute('stroke', getColor(stroke));
        }
    }
}

function createFlag(fileName, sourcePath, destinationPath) {
    return fs.readFile(path.join(sourcePath, fileName))
        .then((contents) => {
            const dom = new jsdom.JSDOM(contents);
            const svg = dom.window.document.querySelector('svg');

            svg.querySelectorAll('*').forEach((node) => {
                setFill(node);
                setStroke(node);
            });

            return fs.writeFile(path.join(destinationPath, fileName), svg.outerHTML);
        })
        .then((file) => {
            console.log(`${fileName} written to ${destinationPath}`); // eslint-disable-line no-console
            return file;
        });
}

function createJson(fileNames, destinationPath) {
    const json = JSON.stringify(fileNames, null, 4);
    return fs.writeFile(path.join(destinationPath, 'flags.json'), json);
}

function createFlagSet(sourcePath, destinationPath) {
    return fs.readdir(sourcePath)
        .then((fileNames) => {
            return Promise.all([
                createJson(fileNames, destinationPath),
                Promise.all(fileNames.map((fileName) => {
                    return createFlag(fileName, sourcePath, destinationPath);
                }))
            ]);
        })
        .then((result) => {
            return result;
        });
}

Promise.all([
    createFlagSet(path.join(baseSourcePath, '1x1'), path.join(baseDestinationPath, '1x1')),
    createFlagSet(path.join(baseSourcePath, '4x3'), path.join(baseDestinationPath, '4x3'))
])
    .then(() => {
        console.log('All flags processed!'); // eslint-disable-line no-console
    });
