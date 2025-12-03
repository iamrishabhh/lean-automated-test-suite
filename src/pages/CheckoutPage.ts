import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    private pageTitle: Locator = this.page.locator('.title');
    private customerFirstName: Locator = this.page.locator('#first-name');
    private customerLasttName: Locator = this.page.locator('#last-name');
    private customerPostalCode: Locator = this.page.locator('#postal-code');
    private continueButton: Locator = this.page.locator('#continue');
    private checkoutContainer: Locator = this.page.locator('#checkout_summary_container');
    private itemPrices: Locator = this.page.locator('.inventory_item_price'); 
    private taxAmount: Locator = this.page.locator('[data-test="tax-label"]');
    private totalAmount: Locator = this.page.locator('[data-test="total-label"]');
    private finishButton : Locator = this.page.locator('#finish');
    private orderCompleteMsg: Locator = this.page.locator('[data-test="complete-header"]');

    constructor(page: Page) {
        super(page);
    }

    async verifyCheckoutTitle(){
        await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    }

    async enterInformation(firstName: string, lastName: string, postalCode: string) {
        await this.customerFirstName.fill(firstName);
        await this.customerLasttName.fill(lastName);
        await this.customerPostalCode.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    private productCard(productName: string): Locator {
        return this.checkoutContainer.locator('.cart_item').filter({
            has: this.page.locator('.inventory_item_name', {hasText:productName})
        });
    }

    async verifyMultipleProductsDisplayedInCheckout(productNames: string[]){
        for (const productName of productNames) {
            await expect(this.productCard(productName)).toBeVisible();
        }
    }

    async extractNumericPrice(ele: Locator): Promise<number> {
        const text = await ele.innerText();
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    async getTotalPriceOfProducts(): Promise<number>{
        const count = await this.itemPrices.count();
        let sum = 0;

        for (let i =0 ; i < count; i++){
            const price = await this.extractNumericPrice(this.itemPrices.nth(i));
            sum = sum + price;
        }

        return parseFloat(sum.toFixed(2));
    }

    async getTaxPrice(): Promise<number> {
        return this.extractNumericPrice(this.taxAmount);
    }

    async getTotalAmount(): Promise<number> {
        return this.extractNumericPrice(this.totalAmount);
    }

    async verifyTotalPaymentPrice() {
        const productsTotal = await this.getTotalPriceOfProducts();
        const taxPrice = await this.getTaxPrice();
        const displayedTotalPrice = await this.getTotalAmount();

        const expectedTotalPrice = parseFloat((productsTotal + taxPrice).toFixed(2));

        console.log(`Products Total: ${productsTotal}`);
        console.log(`Tax Price: ${taxPrice}`);
        console.log(`Expected Total: ${expectedTotalPrice}`);
        console.log(`Displayed Total: ${displayedTotalPrice}`);

        expect(displayedTotalPrice).toBe(expectedTotalPrice);

    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async verifyCheckoutCompleteSuccessMsg(){
        await expect(this.orderCompleteMsg).toHaveText('Thank you for your order!');
    }


}