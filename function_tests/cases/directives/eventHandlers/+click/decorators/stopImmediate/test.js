runner('+click directive stop decorator test suite', describe, it, __dirname, page => page.jQuery('#button').click().then(() => Promise.all([page.jQuery('#count1').text().then(text => expect(text).toBe('0')), page.jQuery('#count2').text().then(text => expect(text).toBe('1')), page.jQuery('#count3').text().then(text => expect(text).toBe('0'))])).then(() => page.jQuery('#div').click().then(() => Promise.all([page.jQuery('#count1').text().then(text => expect(text).toBe('1')), page.jQuery('#count2').text().then(text => expect(text).toBe('1')), page.jQuery('#count3').text().then(text => expect(text).toBe('0'))]))));
