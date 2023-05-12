import { Page } from '@playwright/test';
import { BuilderNavBar } from '@pages/builder/BuilderNavBar';

export class DashboardPage extends BuilderNavBar {
  constructor(page: Page) {
    super(page);
    this.elements = {
        header: this.page.locator('h1[data-cy="nav-app-name"]'),
        trialButton: this.page.locator('span', { hasText: 'Your trial expires '}),
        goToliveAppButton: this.page.locator('a', { hasText: 'Go to Live App '}),
        helpButton: this.page.locator('button[data-cy="nav-help-menu"]'),
        profileButton: this.page.locator('button[data-cy="nav-profile-menu"]'),
        ...this.elements,
    };
  }

}


