import { Locator, Page } from '@playwright/test';

export abstract class LiveAppNavBar {
  readonly page: Page;
  elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
        home: this.page.locator('#app-menu-list i[class="fa fa-home"]'),
        products: this.page.locator('#app-menu-list i[class="fa fa-dropbox"]'),
        inventory: this.page.locator('#app-menu-list i[class="fa fa-cubes"]'),
        suppliers: this.page.locator('#app-menu-list i[class="fa fa-sitemap"]'),
        customers: this.page.locator('#app-menu-list i[class="fa fa-users"]'),
        customerOrders: this.page.locator('#app-menu-list i[class="fa fa-plane"]'),
        warehouses: this.page.locator('#app-menu-list i[class="fa fa-building-o"]'),
        reports: this.page.locator('#app-menu-list i[class="fa fa-bar-chart-o"]'),
        stockTransfer: this.page.locator('#app-menu-list i[class="fa fa-plus"]'),
    };
  }
}


