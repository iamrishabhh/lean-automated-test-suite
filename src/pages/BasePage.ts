import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string = '/') {
    await this.page.goto(path);
  }

  getTitle(): Promise<string> {
    return this.page.title();
  }

  async verifyURLContains(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
