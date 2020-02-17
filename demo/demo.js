'use strict';

require('@vizia/vizia-css/build/vizia-style.min.css');

const flagList = require('../public/flags');

function flagTemplate(flag) {
    const flagSrc = flag.src['1x1'];

    return `
        <div class="flag-comparison">
            <div class="flag-comparison__header" style="background-color: ${flag.color};">${flag.id}</div>
            <div class="flag-comparison__body">
                <div class="flag">
                    <div class="flag__media">
                        <img src="/flag-svg-collection/flags/${flagSrc}" />
                    </div>
                </div>
                <div class="flag">
                    <div class="flag__media">
                        <img src="/${flagSrc}" />
                    </div>
                </div>
            </div>
        </div>
    `.trim();
}

function listTemplate() {
    const flags = flagList.map((flag) => flagTemplate(flag)).join('');
    return `
        <div class="flag-list">
            ${flags}
        </div>
    `.trim();
}

document.querySelector('#bundle-container').innerHTML = listTemplate();
