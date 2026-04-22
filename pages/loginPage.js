class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goToLogin() {
    await this.page.click('text=Login');
  }

  async login(username, password) {
    await this.goToLogin();

    await this.page.fill('#userName', username);
    await this.page.fill('#password', password);

    await this.page.locator('#login').last().click(); 
  }

  async getUsername() {
    return await this.page.textContent('#userName-value');
  }
}

module.exports = LoginPage;
