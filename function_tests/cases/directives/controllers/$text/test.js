runner('$text directive test suite', describe, it, __dirname, async page => {
    const helper = async (expectedValue) => {
        let text = await page.jQuery('#span1').text();
        expect(text).toBe(expectedValue);
        text = await page.jQuery('#span2').text();
        expect(text).toBe(`The text content is: ${ expectedValue }`);
        text = await page.jQuery('#span3').text();
        expect(text).toBe(expectedValue);
        text = await page.jQuery('#span4').text();
        expect(text).toBe(`The text content is: ${ expectedValue }`);
    };
    await helper('Hello dagger');
    await page.jQuery('#button1').click();
    await helper('Hello dagger!');
    await page.jQuery('#button2').click();
    text = await page.jQuery('#span1').text();
    expect(text).toBe('{"a":1,"b":[]}');
    text = await page.jQuery('#span2').text();
    expect(text).toBe('The text content is: [object Object]');
    text = await page.jQuery('#span3').text();
    expect(text).toBe('[object Object]');
    text = await page.jQuery('#span4').text();
    expect(text).toBe('The text content is: [object Object]');
});
