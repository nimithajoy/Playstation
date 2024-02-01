import { Locator, Page } from "@playwright/test";
import { Context } from "vm";

export class CommonUtils {

    readonly page: Page
   
    constructor(page: Page) {
        this.page = page
       
    }

    async switchToNewTab(context: Context , locatorToBeClicked: Locator) {
        const pagePromise = context.waitForEvent('page');
        await locatorToBeClicked.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }



}