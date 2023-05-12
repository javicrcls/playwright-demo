import { Locator, Page } from '@playwright/test';
export class LiveAppLoginPage {
  readonly page: Page;
  readonly elements: Record<string, Locator>;

  constructor(page: Page) {
        this.page = page;
        this.elements = {
            userInput: this.page.locator('#email'),
            passwordInput: this.page.locator('#password'),
            loginButton: this.page.locator('input[type="submit"]'),
        };
  }

  async load(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async login(username: string, password: string){
    await this.elements.userInput.fill(username);
    await this.elements.passwordInput.fill(password);
    await this.elements.loginButton.click();
  }
}