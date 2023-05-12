import { expect } from '@playwright/test';
import { test } from '@fixtures/setupFixture';
import { color } from 'pengrape';
import { DashboardPage } from '@pages/builder/DashboardPage';
import { InventoryPage } from '@pages/builder/pagesTab/AdminInventory/InventoryPage';
import { LiveAppPage } from '@pages/liveapp/LiveAppPage';
import { LiveAppLoginPage } from '@pages/liveapp/LiveAppLoginPage';
import { WarehouseInventoryPage } from '@pages/builder/recordsTab/WarehouseInventoryPage';


test.describe('Kack test suite: ', () => {

  test('Icon Color for Display Rules', async ({ builder }) => {
    const dashboardPage = new DashboardPage(builder);
    const inventoryPage = new InventoryPage(builder);
    const liveAppLoginPage = new LiveAppLoginPage(builder);
    const liveAppPage = new LiveAppPage(builder);

    await expect(dashboardPage.elements.header).toBeVisible();
    await dashboardPage.elements.pages.click();
    await inventoryPage.elements.adminInventory.click();
    await builder.locator('div[data-cy="Inventory"]').click();

    await inventoryPage.elements.table.hover();
    await inventoryPage.elements.table.click();
    await builder.locator('th[data-item="6"]').click();

    const existingRule = builder.locator('div[id="display-rules-editor"]');
    const selectedIcon = builder.locator('i[class="fa fa-warning"]');
    await expect(existingRule).toBeVisible();
    await expect(selectedIcon).toBeVisible();

    const randomColor = color({format: 'hex'})
    await builder.locator('input[class="kn-input kn-colorInput_input"]').fill(randomColor);
    const saveChangesButton = builder.locator('text=save changes');
    await saveChangesButton.click();

    await liveAppLoginPage.load(process.env.LIVEAPP_URL);
    await liveAppLoginPage.login(process.env.E2E_LIVEAPP_USER, process.env.E2E_LIVEAPP_PASSWORD);
    await liveAppPage.elements.inventory.click();
    const elementMatchColor = await liveAppPage.checkElementColor(randomColor,selectedIcon['_selector']);
    expect(elementMatchColor).toBeTruthy();
  });

  test('Filtering inventory', async ({ builder }) => {
    const dashboardPage = new DashboardPage(builder);
    const warehouseInventoryPage = new WarehouseInventoryPage(builder);
    const liveAppLoginPage = new LiveAppLoginPage(builder);
    const liveAppPage = new LiveAppPage(builder);

    await expect(dashboardPage.elements.header).toBeVisible();
    await dashboardPage.elements.records.click();
    await warehouseInventoryPage.elements.warehousesInventory.click();
    await warehouseInventoryPage.applyFilter('Needs Re-Order', 'is', 'Yes');

    const builderFilterResult = await warehouseInventoryPage.checkColumnContainsText('td[data-cy="table-cell-field_142"]', 'Yes');
    expect(builderFilterResult).toBe(true);

    const bundleNumberOfRows = await warehouseInventoryPage.getNumberOfRows();

    await liveAppLoginPage.load(process.env.LIVEAPP_URL);
    await liveAppLoginPage.login(process.env.E2E_LIVEAPP_USER, process.env.E2E_LIVEAPP_PASSWORD);
    await liveAppPage.elements.inventory.click();
    await liveAppPage.applyFilter('Needs Re-Order', 'is', 'Yes');

    const liveAppFilterResult = await liveAppPage.checkColumnContainsText('td[class="field_142"]', 'Yes');
    expect(liveAppFilterResult).toBe(true);

    const liveAppNumberOfRows = await liveAppPage.getNumberOfRows();
    expect(bundleNumberOfRows).toBe(liveAppNumberOfRows);
  });

  test('Liveapp nav bar is rendered', async ({ liveApp }) => {
    const liveAppPage = new LiveAppPage(liveApp);
    await expect(liveAppPage.elements.home).toBeVisible();
    await expect(liveAppPage.elements.products).toBeVisible();
    await expect(liveAppPage.elements.inventory).toBeVisible();
    await expect(liveAppPage.elements.suppliers).toBeVisible();    
    await expect(liveAppPage.elements.customers).toBeVisible();
    await expect(liveAppPage.elements.customerOrders).toBeVisible();
    await expect(liveAppPage.elements.warehouses).toBeVisible();
    await expect(liveAppPage.elements.reports).toBeVisible();
    await expect(liveAppPage.elements.stockTransfer).toBeVisible();    
  });


});

