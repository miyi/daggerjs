/* ************************************************************************
*  <copyright file="vendor.js" company="DAGGER TEAM">
*  Copyright (c) 2016, 2021 All Right Reserved
*
*  THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
*  KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
*  IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
*  PARTICULAR PURPOSE.
*  </copyright>
*  ***********************************************************************/

exports.successfulResponseWrapper = object => ({
    resultCode: 'success',
    data: object
});

exports.failedResponseWrapper = (resultCode, displayMsg) => ({
    resultCode,
    displayMsg
});
