/* ************************************************************************
*  <copyright file="data_middleware.js" company="DAGGER TEAM">
*  Copyright (c) 2016, 2021 All Right Reserved
*
*  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
*  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
*  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
*  PARTICULAR PURPOSE.
*  </copyright>
*  ***********************************************************************/

const fs = require('fs');
const path = require('path');
const vendor = require('./vendor');

exports.register = (app, express) => app.use('/data', (request, response) => {
    switch (request.path) {
    case '/getCommandList': {
        setTimeout(() => response.send(vendor.successfulResponseWrapper([{
            text: 'type1',
            value: 1
        }, {
            text: 'type2',
            value: 2
        }, {
            text: 'type3',
            value: 3
        }])), 10000);
        break;
    }
    case '/getTextDemoText': {
        response.send(vendor.successfulResponseWrapper('hello dagger!'));
        break;
    }
    case '/getValueNum': {
        response.send(vendor.successfulResponseWrapper(0));
        break;
    }
    default: {
        response.send(vendor.failedResponseWrapper(500, `invalid request url path: ${ request.path }`));
    }
    }
});
