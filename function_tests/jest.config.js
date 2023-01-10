module.exports = {
    globalSetup: "./setup.js",
    globalTeardown: "./teardown.js",
    testMatch: [
        '**/cases/**/*.js'
    ],
    reporters: [
        "default",
        "jest-allure"
    ],
    setupFilesAfterEnv: ["jest-allure/dist/setup"],
    testRunner: "jest-jasmine2"
};
