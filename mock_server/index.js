/* ************************************************************************
*  <copyright file="index.js" company="DAGGER TEAM">
*  Copyright (c) 2016, 2021 All Right Reserved
*
*  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
*  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
*  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
*  PARTICULAR PURPOSE.
*  </copyright>
*  ***********************************************************************/

const fs = require('fs');
const util = require('util');
const path = require('path');
const Hjson = require('hjson');
const cors = require('cors');
const express = require('express');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(compress());
app.use(cookieParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; // Fixed the UNABLE_TO_VERIFY_LEAF_SIGNATURE problem for superagent.
process.env.NODE_ENV && (process.env.NODE_ENV != 'local') && app.enable('view cache');

// please note the order of middlewares is very IMPORTANT! Never mess it up unless you know clearly what you are doing.
['data', 'file'].forEach(middleware => require(util.format('./express_middlewares/%s_middleware', middleware)).register(app, express));

app.listen(process.env.NODE_PORT || '8086');
