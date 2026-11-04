# Playwright Demo – Page Object Model + CI

A small, educational test automation framework built with **Playwright + TypeScript**, running against the public practice site [SauceDemo](https://www.saucedemo.com).

## Highlights
- Page Object Model (`pages/`)
- Stable locators (`data-test` attributes)
- Multi-browser (Chromium + Firefox)
- HTML report, trace and screenshots on failure
- GitHub Actions CI with report artifact

## Run it

```bash
npm install
npx playwright install
npm test
npm run report
```

## Why Page Object Model?

Without POM, every test repeats the locators:

```ts
// 40 tests, each with this:
await page.locator('[data-test="username"]').fill(user);
await page.locator('[data-test="password"]').fill(pass);
await page.locator('[data-test="login-button"]').click();
```

If the login button changes, you edit 40 places. With POM the locators live in one class:

```ts
const login = new LoginPage(page);
await login.login(user, pass);
```

If a locator changes, you edit it once, in `pages/LoginPage.ts`.

## Structure

```
pages/    Page objects (LoginPage, InventoryPage)
tests/    Specs (login, cart)
.github/  CI workflow
```

## Notes
- Credentials used in tests are the public demo credentials published by SauceDemo for practice.
- This project is for learning purposes and is not related to any employer's code.

---

# (عربي) نبذة

مشروع تعليمي صغير لأتمتة الاختبارات بـ Playwright وTypeScript على موقع تدريب علني. يوضح تنظيم المشروع بـ Page Object Model وتشغيله تلقائياً عبر GitHub Actions. مناسب لـ QA اليدوي اللي بدو يبدأ بالأتمتة.
