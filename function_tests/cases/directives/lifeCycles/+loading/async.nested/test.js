const helper = (page, values = ['', '', '', '', '', '']) => Promise.all(values.map((value, index) => page.jQuery(`#span${ index + 1 }`).text().then(text => expect(text).toBe(value))));

runner('+loading directive async.nested test suite', describe, it, __dirname, async page => {
    await helper(page);
    let resolve = null;
    let promise = new Promise(r => (resolve = r));
    setTimeout(() => helper(page), 200);
    setTimeout(() => helper(page, ['', '', '', 'text1', '1', '']), 400);
    setTimeout(() => helper(page, ['text2', '1', '2', 'text1', '1', '']).then(resolve), 800);
    return promise;
});
