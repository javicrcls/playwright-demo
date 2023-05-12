import { BuilderLoginPage } from '@pages/builder/BuilderLoginPage';
import { LiveAppLoginPage } from '@pages/liveapp/LiveAppLoginPage';
import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

type MyFixtures = {
    builder: Page;
    liveApp: Page;
};

export const test = base.extend<MyFixtures>({
  builder: async ({ page }, use) => {
      const loginPage = new BuilderLoginPage(page);
      await loginPage.load(process.env.WAREHOUSE_URL);
      await loginPage.login(process.env.E2E_BUILER_USER, process.env.E2E_BUILER_PASSWORD);
      await use(page);
    },
  
    liveApp: async ({ page }, use) => {
      const loginPage = new LiveAppLoginPage(page);
      await loginPage.load(process.env.LIVEAPP_URL);
      await loginPage.login(process.env.E2E_LIVEAPP_USER, process.env.E2E_LIVEAPP_PASSWORD);
      await use(page);
    },
  });

export { expect } from '@playwright/test';

