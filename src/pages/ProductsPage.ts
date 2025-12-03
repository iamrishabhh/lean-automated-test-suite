import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class ProductsPage extends BasePage {

    private pageTitle = this.page.locator('.title');
    private inventoryContainer = this.page.locator('#inventory_container');
    private cartBadge = this.page.locator('.shopping_cart_badge');
    private cartIcon = this.page.locator('.shopping_cart_link');
    
    constructor(page: Page) {
        super(page);
    }

    async verifyProductTitle(){
        await expect(this.pageTitle).toHaveText('Products');
    }

    private productCard(productName: string): Locator {
        return this.inventoryContainer.locator('.inventory-item').filter({
            has: this.page.locator('.inventory_item_name', {hasText:productName})
        });
    }

    async addProductToCart(productName: string){
        const product = this.productCard(productName);
        const addToCartBtn = product.locator('button');
        await addToCartBtn.click();
    }

    async addMultipleProductsToCart(productNames: string[]){
        for (const productName of productNames) {
            await this.addProductToCart(productName);
        }
    }

    async verifyCartItemCount(expectedCount: number){
        await expect(this.cartBadge).toHaveText(String(expectedCount));
    }

    async goToCart() {
        await this.cartIcon.click();
    }
    
}