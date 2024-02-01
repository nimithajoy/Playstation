import { Locator, Page, expect } from "@playwright/test"

export class LoginPage {

    readonly page: Page
    readonly emailAddressTextBoxLocator: Locator;
    readonly emailAddressSignInLocator: Locator;
    readonly passwordTextBoxLocator: Locator;
    readonly passwordSignInLocator: Locator;
    readonly userNameLocator: Locator;
 
    constructor(page: Page) {
        this.page = page
        this.emailAddressTextBoxLocator = this.page.getByRole('textbox');
        this.emailAddressSignInLocator = this.page.locator('#signInSubmit')
        this.passwordTextBoxLocator = this.page.getByPlaceholder('Password')
        this.passwordSignInLocator = this.page.locator('#signin-password-button')
        this.userNameLocator = this.page.locator('#signin-password-button')
       
    }

    async login(emailAddress: string, password: string, username: string) {
        await this.emailAddressTextBoxLocator.fill(emailAddress);
        await this.emailAddressSignInLocator.click();
       // await this.passwordTextBoxLocator.fill(password)
      //  await this.passwordSignInLocator.click();
     // await expect(this.userNameLocator).toBeVisible();
    }

}