const helper = (page, values = ['', '']) => Promise.all(values.map((value, index) => page.jQuery(`#span${ index + 1 }`).text().then(text => expect(text).toBe(value))));

runner('+loading directive async test suite', describe, it, __dirname, async page => {
    await helper(page);
    let resolve = null;
    let promise = new Promise(r => (resolve = r));
    setTimeout(() => helper(page), 200);
    setTimeout(() => helper(page, ['text', '1']).then(resolve), 400);
    return promise;
});
