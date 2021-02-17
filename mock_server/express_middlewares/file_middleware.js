/* ************************************************************************
*  <copyright file="file_middleware.js" company="DAGGER TEAM">
*  Copyright (c) 2016, 2021 All Right Reserved
*
*  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
*  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
*  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
*  PARTICULAR PURPOSE.
*  </copyright>
*  ***********************************************************************/

const fs = require('fs');
const multer = require('multer');
const vendor = require('./vendor');

const upload = multer({
    storage: multer.diskStorage({
        destination: 'temp_upload_files/',
        filename: (request, file, callback) => callback(null, `${ file.originalname }-${ Date.now() }`)
    })
});

exports.register = (app, serverConfigs) => app.use('/file', upload.single('file'), (request, response) => {
    try {
        const filePath = (request.file || {}).path;
        if (filePath) {
            response.send(vendor.successfulResponseWrapper(filePath));
        } else {
            response.send(vendor.failedResponseWrapper(200, 'upload file failed!'));
        }
    } catch (exception) {
        response.send(vendor.failedResponseWrapper(500, 'node server internal error'));
    }
});
