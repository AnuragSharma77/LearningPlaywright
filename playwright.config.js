// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout : 40*1000, // time for loading elements , loctors
  expect : {
  timeout : 40*1000
  },
  use: {

      browserName : 'chromium',
      headless : false
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },


});
module.exports = config

