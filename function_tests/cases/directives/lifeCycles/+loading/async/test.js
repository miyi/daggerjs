runner('+loading directive async test suite', describe, it, __dirname, async page => {
    await page.jQuery('#span1').text().then(text => expect(text).toBe(''));
    await page.jQuery('#span2').text().then(text => expect(text).toBe(''));
    let resolve = null;
    let promise = new Promise(r => (resolve = r));
    setTimeout(async () => {
        await page.jQuery('#span1').text().then(text => expect(text).toBe(''));
        await page.jQuery('#span2').text().then(text => expect(text).toBe(''));
    }, 200);
    setTimeout(async () => {
        await page.jQuery('#span1').text().then(text => expect(text).toBe('text'));
        await page.jQuery('#span2').text().then(text => expect(text).toBe('1'));
        resolve(true);
    }, 400);
    return promise;
});
