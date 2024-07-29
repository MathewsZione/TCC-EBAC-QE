const { join } = require("path");
const allure = require("allure-commandline");
const video = require("wdio-video-reporter");

exports.config = {
  hostname: "localhost",
  port: 4723,
  path: "/wd/hub",
  services: ['appium'],
  specs: ["./test/specs/**/catalogo.spec.js"],
  framework: "mocha",
  capabilities: [
    {
      "platformName": "iOS",
      "appium:deviceName": "iPhone 14 Pro Max",
      "appium:platformVersion": "16.0",
      "appium:orientation": "PORTRAIT",
      "appium:automationName": "XCUITest",
      "appium:app": "/Users/lucasboes/Documents/exercicio-m29/testes-mobile-ebac-shop/app/ios/loja-ebac.app",
      "appium:wdaStartupRetries": "4",
      "appium:iosInstallPause": "8000",
      "appium:wdaStartupRetryInterval": "20000"
    },
  ],
  waitforTimeout: 1000000,
  mochaOpts: {
    timeout: 1000000,
  },

  // relatório de execução
  reporters: [
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
      },
    ],

    // vídeo da execução
    [
      video,
      {
        saveAllVideos: false, // se verdadeiro, salva também os casos de teste de sucesso
        videoSlowdownMultiplier: 3, // quanto maior o valor, mais lentos os vídeos [valores 1-100]
      },
    ],
  ],

  // configs do allure reporter
  onComplete: function () {
    const reportError = new Error("Could not generate Allure report");
    const generation = allure(["generate", "allure-results", "--clean"]);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);

      generation.on("exit", function (exitCode) {
        clearTimeout(generationTimeout);

        if (exitCode !== 0) {
          return reject(reportError);
        }

        console.log("Allure report successfully generated");
        resolve();
      });
    });
  },
  afterStep: async function (
    step,
    scenario,
    { error, duration, passed },
    context
  ) {
    if (error) {
      await driver.takeScreenshot();
    }
  },
};