import { Page } from '@playwright/test';
import { LiveAppNavBar } from './LiveAppNavBar';

export class LiveAppPage extends LiveAppNavBar {
  constructor(page: Page) {
    super(page);
    this.elements = {
        header: this.page.locator('h1[id="knack-logo"]'),
        trialButton: this.page.locator('span', { hasText: 'Account Settings'}),
        liveAppButton: this.page.locator('a', { hasText: 'Log Out'}),
        ...this.elements,
    };
  }

  async checkElementColor(color: string, locator: string): Promise<boolean> {
    const elements = await this.page.$$(locator);

    for (const element of elements) {
      const elementColor = await element.getAttribute('style');
      if (!elementColor.includes(`color: ${color}`)) {
        return false;
      }
    }
    return true; 
  }

  async applyFilter(field: string, operator: string, product: string) {
    const addFiltersButton = await this.page.locator('span' ,{ hasText: 'Add filters'});
    await addFiltersButton.isVisible();
    await addFiltersButton.click();
    console.log(`Applying '${field} - ${operator} - ${product}' liveApp filter`);
    await this.page.selectOption('select[class="field select"]', field);
    await this.page.selectOption('select[class="operator kn-select"]', operator);
    await this.page.selectOption('select[name="value"]', product);
    const responsePromise = this.page.waitForResponse(response => response.url().includes("/records") && response.status() === 200);
    await this.page.locator('input[id="kn-submit-filters"]').click();
    const response = await responsePromise;
    await this.page.locator('div[id="view_151_filters"]', { hasText: field}).isEnabled();
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
    const rows = await this.page.$$('tbody tr[id]');
    console.log(`Number of rows: "${rows.length}"`);
    return rows.length;
  }

}


