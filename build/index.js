'use strict';

const fs = require('fs-extra');
const path = require('path');

const getProcessedFlag = require('./lib/get-processed-flag');

const baseSourcePath = path.join(__dirname, '../node_modules/flag-svg-collection/flags');
const baseDestinationPath = path.join(__dirname, '../public');

function createJson(fileNames) {
    const output = fileNames.map((fileName) => {
        return {
            id: fileName.split('.')[0],
            color: '#666666',
            src: {
                '1x1': `1x1/${fileName}`,
                '4x3': `4x3/${fileName}`
            }
        };
    });
    const json = JSON.stringify(output, null, 4);

    return fs.writeFile(path.join(baseDestinationPath, 'flags.json'), json);
}

function processFlag(fileName) {
    return Promise.all([
        fs.readFile(path.join(baseSourcePath, '1x1', fileName))
            .then(getProcessedFlag)
            .then((result) => fs.writeFile(path.join(baseDestinationPath, '1x1', fileName), result)),
        fs.readFile(path.join(baseSourcePath, '4x3', fileName))
            .then(getProcessedFlag)
            .then((result) => fs.writeFile(path.join(baseDestinationPath, '4x3', fileName), result))
    ])
        .then(() => fileName);
}

function processAllFlags() {
    return Promise.all([
        fs.mkdirp(baseDestinationPath),
        fs.mkdirp(path.join(baseDestinationPath, '1x1')),
        fs.mkdirp(path.join(baseDestinationPath, '4x3'))
    ])
        .then(() => {
            return fs.readdir(path.join(baseSourcePath, '1x1'))
                .then((fileNames) => Promise.all(fileNames.map(processFlag)))
                .then((fileNames) => createJson(fileNames));
        });
}

processAllFlags()
    .then(() => {
        console.log('All flags processed!');
    })
    .catch((error) => {
        console.error(error);
    });
