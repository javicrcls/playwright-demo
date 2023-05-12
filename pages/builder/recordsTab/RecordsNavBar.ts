import { Locator, Page } from '@playwright/test';

export abstract class RecordsNavBar {
  readonly page: Page;
  elements: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.elements = {
        tables: this.page.locator('h3', { hasText: ' Tables '}),
        products: this.page.locator('a[data-cy="Object Products"]'),
        suppliers: this.page.locator('a[data-cy="Object Suppliers"]'),
        customerOrders: this.page.locator('a[data-cy="Object Customer Orders"]'),
        warehouses: this.page.locator('a[data-cy="Object Warehouses"]'),
        warehousesInventory: this.page.locator('a[data-cy="Object Warehouse Inventory"]'),
        inventoryPurchases: this.page.locator('a[data-cy="Object Inventory Purchases"]'),
        stockTransfer: this.page.locator('a[data-cy="Object Stock Transfers"]'),

        userRoles: this.page.locator('h3', { hasText: ' User Roles '}),
        accounts: this.page.locator('a[data-cy="Object Accounts"]'),
        admins: this.page.locator('a[data-cy="Object Admins"]'),
        customers: this.page.locator('a[data-cy="Object Customers"]'),
        warehouseStaff: this.page.locator('a[data-cy="Object Warehouse Staff"]'),

        customerPayments: this.page.locator('h3', { hasText: ' Customer Payments '}),
        charges: this.page.locator('a[data-cy="Object Charges"]'),

     };
  }
}