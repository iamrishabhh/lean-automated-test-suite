import { test, Page, BrowserContext } from '@playwright/test';
import testData from '../test-data/testData.json'

import { LoginPage } from '@pages/LoginPage';
import { ProductsPage } from '@pages/ProductsPage';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';

const { users, products, checkoutInfo } = testData;

let context: BrowserContext;
let page: Page;

let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe('User completing a successful checkout flow', () => {

  test.beforeAll( async ({ browser }) => {

    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login into application
    await loginPage.visitPage();
    await loginPage.loginToApplication(users.standardUser.username, users.standardUser.password);
    await productsPage.verifyURLContains('inventory');
  })

  test.afterAll(async () => {
    try {
      await loginPage.logoutApplication();
    } catch (error) {
      console.warn('Logout failed', error);
    }
    await context.close();
  })

  test('Verify user is able to add products from product page', async () => {
    await productsPage.verifyProductTitle();
    await productsPage.addMultipleProductsToCart(products);
    await productsPage.verifyCartItemCount(products.length);
  })

  test('Verify user is able to see added products in the cart page', async () => {
    await productsPage.goToCart();
    await cartPage.verifyURLContains('cart');
    await cartPage.verifyCartTitle();
    await cartPage.verifyMultipleProductsAddedToCart(products);
  })

  test('Verify user is able to add information in the checkout page', async () => {
    await cartPage.goToCheckout();
    await cartPage.verifyURLContains('checkout-step-one');
    await checkoutPage.enterInformation(checkoutInfo.firstName,checkoutInfo.lastName,checkoutInfo.postalCode);
    await checkoutPage.clickContinue();
  })

  test('Verify the products price plus tax price is equal to total price', async() => {
    await cartPage.verifyURLContains('checkout-step-two');
    await checkoutPage.verifyMultipleProductsDisplayedInCheckout(products);
    await checkoutPage.verifyTotalPaymentPrice();
    await checkoutPage.clickFinish();
    await checkoutPage.verifyCheckoutCompleteSuccessMsg();
  })

})



