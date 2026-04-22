const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const BookPage = require('../pages/bookPage');
const { saveBook } = require('../utils/fileUtils');

test('Book Store Flow', async ({ page }) => {

  await page.goto('https://demoqa.com/books');

  const login = new LoginPage(page);
  await login.login('user', 'user@12345');

  const user = await login.getUsername();
  expect(user).not.toBeNull();

  const book = new BookPage(page);
  await book.searchAndSelectBook('Learning JavaScript Design Patterns');

  const details = await book.getBookDetails();

  expect(details.title).toContain('JavaScript');

  saveBook(details);

  await page.click('#submit'); // logout
});