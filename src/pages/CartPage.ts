import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    
    private pageTitle: Locator = this.page.locator('.title');
    private inventoryContainer: Locator = this.page.locator('#inventory_container');
    private checkout: Locator = this.page.locator('#checkout');

    constructor(page: Page) {
        super(page);
    }

    async verifyCartTitle(){
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    private productCard(productName: string): Locator {
        return this.inventoryContainer.locator('.inventory-item').filter({
            has: this.page.locator('.inventory_item_name', {hasText:productName})
        });
    }

    async verifyMultipleProductsAddedToCart(productNames: string[]){
        for (const productName of productNames) {
            await expect(this.productCard(productName)).toBeVisible();
        }
    }

    async goToCheckout() {
        await this.checkout.click();
    }


}