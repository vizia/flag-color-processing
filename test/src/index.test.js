'use strict';

const test = require('ava');
const SandboxedModule = require('sandboxed-module');

function requireGetFlag() {
    const mockFlags = [
        {
            id: 'us',
            src: {
                '1x1': '1x1/us.svg',
                '4x3': '4x3/us.svg'
            }
        },
        {
            id: 'gb',
            src: {
                '1x1': '1x1/gb.svg',
                '4x3': '4x3/gb.svg'
            }
        }
    ];

    return SandboxedModule.require('../../src', {
        requires: {
            '../public/flags': mockFlags
        }
    });
}

test('Gets a flag with a default viziaAssetsPath', (t) => {
    const getFlag = requireGetFlag();
    const result = getFlag('us');

    t.is(
        result.src['1x1'],
        '@vizia-assets/flags/public/1x1/us.svg'
    );
    t.is(
        result.src['4x3'],
        '@vizia-assets/flags/public/4x3/us.svg'
    );
});

test('Gets a flag with the provided viziaAssetsPath', (t) => {
    const getFlag = requireGetFlag();
    const result = getFlag('us', {viziaAssetsPath: 'custom-path'});

    t.is(
        result.src['1x1'],
        'custom-path/flags/public/1x1/us.svg'
    );
    t.is(
        result.src['4x3'],
        'custom-path/flags/public/4x3/us.svg'
    );
});

test('Resolves gb flag as uk', (t) => {
    const getFlag = requireGetFlag();
    const result = getFlag('uk');

    t.is(
        result.id,
        'gb'
    );
});

test('Resolves ISO3 USA flag as us', (t) => {
    const getFlag = requireGetFlag();
    const result = getFlag('USA');

    t.is(
        result.id,
        'us'
    );
});
