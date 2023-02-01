const puppeteer = require('puppeteer');
const { pageExtend } = require('puppeteer-jquery');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const baseContentPath = resolve(__dirname, './cases');
const htmlTemplateStart = readFileSync('./template/index-start.html').toString();
const htmlTemplateEnd = readFileSync('./template/index-end.html').toString();
const versions = require('./versions.json');
const frameworks = {};
versions.forEach(({ tag, path }) => (frameworks[tag] = readFileSync(`../src/dagger${ path }.js`).toString()));

const initialize = async (tag, integrity, contentPath, configs = '') => browser.newPage().then(page => page.setContent(`${ htmlTemplateStart.replace('%CONFIGS%', configs).replace('%INTEGRITY%', integrity) }${ frameworks[tag] }${ htmlTemplateEnd.replace('%CONTENT%', readFileSync(contentPath)) }`) && page).then(page => pageExtend(page));

global.runner = (name, describe, it, dirName, callback, contentPath = 'content.html') => describe(name, () => versions.forEach(({ tag, desc, integrity }) => it(desc, () => initialize(tag, integrity, resolve(dirName, contentPath)).then(page => {
    let promises = callback(page);
    Array.isArray(promises) || (promises = [promises]);
    return Promise.all(promises.map(promise => Object.is(typeof promise, 'function') ? promise() : promise)).then(() => page.close());
}))));

module.exports = async () => (global.browser = await puppeteer.launch({
    headless: true,
    args: [
        '–disable-gpu',
        '–disable-dev-shm-usage',
        '–disable-setuid-sandbox',
        '–no-first-run',
        '–no-sandbox',
        '–no-zygote',
        '–single-process'
    ]
}));
