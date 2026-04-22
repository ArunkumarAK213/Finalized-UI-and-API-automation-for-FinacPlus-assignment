class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goToLogin() {
    await this.page.click('text=Login'); // safer than #login
  }

  async login(username, password) {
    await this.goToLogin();

    await this.page.fill('#userName', username);
    await this.page.fill('#password', password);

    await this.page.locator('#login').last().click(); // click correct login button
  }

  async getUsername() {
    return await this.page.textContent('#userName-value');
  }
}

module.exports = LoginPage;