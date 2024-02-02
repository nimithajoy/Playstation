import { Locator, Page, expect } from "@playwright/test"
import { CommonUtils } from "../utils/common-utils"
import { Context } from "vm";

export class NavigationPage {

    readonly context: Context
    readonly page: Page
    readonly cookieRejectButtonLocator: Locator;
    readonly mySonyButtonLocator: Locator;
    readonly loginIconLocator: Locator;
    readonly mainMenuIconLocator: Locator;
    readonly playStationTextLocator: Locator;
    constructor(page: Page, context: Context) {
        this.context = context
        this.page = page
        this.cookieRejectButtonLocator = this.page.getByRole('button', { name: 'Reject All' });
        this.mySonyButtonLocator = this.page.getByLabel('My Sony')
        this.loginIconLocator = this.page.locator('xpath=//a[@class="GlobalHeaderCrm__SignUpButton js-signin-input js-datalayer-action-event"]')
        this.mainMenuIconLocator = this.page.getByLabel('ariaLabelClose')
        this.playStationTextLocator = this.page.getByRole('link', { name: 'PlayStation' })
    }

    async goToLoginPage() {
        await this.page.goto('/');
        if(await this.cookieRejectButtonLocator.isVisible()){
            await this.cookieRejectButtonLocator.click();
        }
        await expect(this.page).toHaveTitle(/Sony UK/);
        await this.mySonyButtonLocator.click();
        await this.loginIconLocator.click()
    }

    async goToPlayStationPage() {
        await this.page.goto('/');
        await this.mainMenuIconLocator.click();
        const utils = new CommonUtils(this.page)
        const newPage = await utils.switchToNewTab(this.context, this.playStationTextLocator)
        await expect(newPage).toHaveTitle(/PlayStation/);
        return newPage;
    }


}