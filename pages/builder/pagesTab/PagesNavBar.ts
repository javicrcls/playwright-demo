import { Locator, Page } from '@playwright/test';

export abstract class PagesNavBar {
  readonly page: Page;
  elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
        allPages: this.page.locator('h3', { hasText: ' All Pages '}),
        userPages: this.page.locator('h3', { hasText: ' User Pages '}),
        usersLogin: this.page.locator('div[data-cy="All Users > Login"]'),
        adminProducts: this.page.locator('div[data-cy="Admin > Products"]'),
        adminInventory: this.page.locator('div[data-cy="Admin > Inventory"]'),
        adminSuppliers: this.page.locator('div[data-cy="Admin > Suppliers"]'),
        adminCustomers: this.page.locator('div[data-cy="Admin > Customers"]'),
        adminOrders: this.page.locator('div[data-cy="Admin > Orders"]'),
        adminWarehouses: this.page.locator('div[data-cy="Admin > Warehouses"]'),
        adminReports: this.page.locator('div[data-cy="Admin > Reports"]'),
        warehouseOrders: this.page.locator('div[data-cy="Warehouse > Orders"]'),
        warehouseInventory: this.page.locator('div[data-cy="Warehouse > Inventory"]'),
        warehousePurchases: this.page.locator('div[data-cy="Warehouse > Purchases"]'),
        warehouseCustomers: this.page.locator('div[data-cy="Warehouse > Customers"]'),
        warehouseReports: this.page.locator('div[data-cy="Warehouse > Reports"]'),
        accountSettings: this.page.locator('div[data-cy="Account Settings"]')
     };
  }
}