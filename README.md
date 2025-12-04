# Lean Automated Test Suite

A comprehensive end-to-end test suite for automated testing of products checkout workflows using Playwright and TypeScript.

## Overview

This project contains automated tests for validating the complete checkout flow, including:
- User login and authentication
- Product selection and cart management
- Checkout information entry
- Payment verification

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/lean-automated-test-suite.git
cd lean-automated-test-suite
```

### 2. Install Dependencies

```bash
npm install
npx playwright install
```

This will install all required packages including Playwright and its browser dependencies.

### 3. Configure Test Data

Update `test-data/testData.json` (baseURL, credentials, checkout info) to target the Sauce Labs demo site (e.g., https://www.saucedemo.com).

```json
{
  "env": {
    "baseURL": "https://www.saucedemo.com"
  },
  "users": {
    "standardUser": {
      "username": "your-username",
      "password": "your-password"
    }
  },
  "products": [],
  "checkoutInfo": {
    "firstName": "",
    "lastName": "",
    "postalCode": ""
  }
}
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Tests in Headless Mode with disable parallel runs (if needed for E2E stability)

```bash
npx playwright test --workers=1
```

### Run a Specific Test File

```bash
npx playwright test tests/E2E_checkoutFlow.spec.ts
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## Test Behavior

- The E2E test selects 3 random available products on the Sauce Labs demo site, adds them to the cart, verifies they are present and totals match, completes checkout, and asserts successful order completion.
- Assertions include: items present in cart, correct item names/prices, subtotal/total calculation, and confirmation message on order completion.

## Project Structure

```
src/pages/              # Page Object Model classes
tests/                  # Test specifications
test-data/              # Test data for e2e test
playwright-report/      # Test report (generated)
```

## Reporting

- HTML test report (Playwright):
```bash
npx playwright show-report
```
- The project is configured to capture screenshots and videos on failure and record traces for retries. Reports live in `playwright-report/` by default.


## Usage

The test suite validates the complete checkout flow:

1. **User Login** - Authenticate with valid credentials
2. **Product Selection** - Add products to cart
3. **Cart Verification** - Verify added products
4. **Checkout Information** - Enter shipping details
5. **Payment Verification** - Validate pricing
6. **Order Completion** - Complete order successfully

### Tests Failing
- Verify baseURL in `test-data/testData.json`
- Check if the application is running
- Increase timeout in `playwright.config.ts`


