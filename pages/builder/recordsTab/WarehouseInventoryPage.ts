import { Page } from '@playwright/test';
import { RecordsNavBar } from '@pages/builder/recordsTab/RecordsNavBar';

export class WarehouseInventoryPage extends RecordsNavBar {
  constructor(page: Page) {
    super(page);
    this.elements = {
        addFiltersButton: this.page.locator('a[data-cy="add-filters"]'),
        ...this.elements,
    };
  }

  async applyFilter(field: string, operator: string, product: string) {
      await this.elements.addFiltersButton.isVisible();
      await this.elements.addFiltersButton.click();
      console.log(`Applying '${field} - ${operator} - ${product}' builder filter`);
      await this.page.selectOption('select[data-cy="field-list-field"]', field);
      await this.page.selectOption('select[data-cy="field-list-operator"]', operator);
      await this.page.selectOption('select[data-cy="dropdown-select"]', product);
      const responsePromise = this.page.waitForResponse(response => response.url().includes("/v1/objects") && response.status() === 200);
      await this.page.locator('button[data-cy="save-filters"]').click();
      const response = await responsePromise;
      await this.page.locator('div[data-cy="filter-summary"]', { hasText: field}).isEnabled();
      await this.page.waitForLoadState('domcontentloaded')
    }

    async checkColumnContainsText(locator: string, text: string): Promise<boolean> {
      const elements = await this.page.$$(locator);
      console.log(`Number of cells found that contains text: "${text}": ${elements.length}`);
      let containsText = true;

      for (const element of elements) {
        const elementText = await element.textContent();
        if (!elementText.includes(text)) {
          console.log(`Element: ${element.toString()} doesn't match text: "${text}"`);
          containsText = false;
        }
      }
      return containsText;
    }

    async getNumberOfRows(): Promise<number> {
      const rows = await this.page.$$('tr[data-cy="record-row"]');
      console.log(`Number of rows: "${rows.length}"`);
      return rows.length;
    }
}