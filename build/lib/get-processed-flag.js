'use strict';

const jsdom = require('jsdom');

const getNearestColor = require('./get-nearest-color');

function setFill(node) {
    const fill = node.getAttribute('fill');

    if (fill) {
        if (!fill.includes('none') && !fill.includes('url')) {
            node.setAttribute('fill', getNearestColor(fill));
        }
    } else if (node.parentNode.tagName === 'svg') {
        node.setAttribute('fill', getNearestColor('#000'));
    }
}

function setStroke(node) {
    const stroke = node.getAttribute('stroke');

    if (stroke) {
        if (!stroke.includes('none')) {
            node.setAttribute('stroke', getNearestColor(stroke));
        }
    }
}

function getProcessedFlag(input) {
    const dom = new jsdom.JSDOM(input);
    const svg = dom.window.document.querySelector('svg');

    svg.querySelectorAll('*').forEach((node) => {
        setFill(node);
        setStroke(node);
    });

    return svg.outerHTML;
}

module.exports = getProcessedFlag;
