'use strict';

const fs = require('fs-extra');
const path = require('path');

const getProcessedFlag = require('./lib/get-processed-flag');

const baseSourcePath = path.join(__dirname, '../node_modules/flag-svg-collection/flags');
const baseDestinationPath = path.join(__dirname, '../public');

function createJson(items) {
    const output = items.map((item) => {
        return Object.assign({}, item, {
            src: {
                '1x1': `1x1/${item.id}.svg`,
                '4x3': `4x3/${item.id}.svg`
            }
        });
    });
    const json = JSON.stringify(output, null, 4);

    return fs.writeFile(path.join(baseDestinationPath, 'flags.json'), json);
}

function processFlag(fileName) {
    return Promise.all([
        fs.readFile(path.join(baseSourcePath, '1x1', fileName))
            .then(getProcessedFlag)
            .then((result) => {
                return fs.writeFile(path.join(baseDestinationPath, '1x1', fileName), result.svg)
                    .then(() => result);
            }),
        fs.readFile(path.join(baseSourcePath, '4x3', fileName))
            .then(getProcessedFlag)
            .then((result) => {
                return fs.writeFile(path.join(baseDestinationPath, '4x3', fileName), result.svg)
                    .then(() => result);
            })
    ])
        .then((result) => {
            console.log(`Processed ${fileName}`);
            return {
                id: fileName.split('.')[0],
                color: result[0].color
            };
        });
}

function processAllFlags() {
    return Promise.all([
        fs.mkdirp(baseDestinationPath),
        fs.mkdirp(path.join(baseDestinationPath, '1x1')),
        fs.mkdirp(path.join(baseDestinationPath, '4x3'))
    ])
        .then(() => fs.readdir(path.join(baseSourcePath, '1x1')))
        .then((fileNames) => Promise.all(fileNames.map(processFlag)))
        .then(createJson);
}

processAllFlags()
    .then(() => {
        console.log('All flags processed!');
    })
    .catch((error) => {
        console.error(error);
    });
