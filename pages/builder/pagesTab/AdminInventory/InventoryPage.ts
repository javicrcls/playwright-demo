import { Page } from '@playwright/test';
import { PagesNavBar } from '@pages/builder/pagesTab/PagesNavBar';

export class InventoryPage extends PagesNavBar {
  constructor(page: Page) {
    super(page);
    this.elements = {
        grid: this.page.locator('div[class="view-expander"]'),
        table: this.page.locator('div[class="kn-container"]'),
        viewsButton: this.page.locator('button[data-cy="page-ribbon-views"]'),
        rulesButton: this.page.locator('button[data-cy="page-ribbon-rules"]'),
        settingsButton: this.page.locator('button[data-cy="page-ribbon-settings"]'),
        ...this.elements,
    };
  }
}