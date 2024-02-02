import { Page } from "@playwright/test"
import { test } from "../pages/basePage"
import * as userData from "../testdata.json";
import { ImageCarousel } from "../pages/image-carousel";
import { STORAGE_STATE } from "../playwright.config";
import { NavigationPage } from "../pages/navigation";
import { LoginPage } from "../pages/login";


test.beforeAll('Login to Sony Website', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const navigationPage = new NavigationPage(page, context);
    await navigationPage.goToLoginPage();
    // const loginPage = new LoginPage(page);
    // await loginPage.login(userData.DefaultUser.emailAddress, userData.DefaultUser.password);
    await page.context().storageState({ path: STORAGE_STATE });
});


test.describe('Verify image carousel functionalities', () => {
    let newPage: Page;
    let imageCarouselPage: ImageCarousel;

    test.beforeEach('Navigate to PlayStation website', async ({ navigationPage }) => {
        newPage = await navigationPage.goToPlayStationPage();
        imageCarouselPage = new ImageCarousel(newPage);

    })

    test('Carousel automatically changes slides by itself', async ({ }) => {
        await imageCarouselPage.verifyCarouselAutomaticSlide();
    })

    test('Clicking on the tab under the carousel, displays the appropriate slide', async ({ }) => {
        await imageCarouselPage.selectASlide(3);
        await imageCarouselPage.selectASlide(5);
    })

    test('Verify the text and the button of each slide', async ({ }) => {
        await imageCarouselPage.verifyContentOfSlide();
    })

    test('Verify the navigation from each slide', async ({ }) => {
        await imageCarouselPage.verifySlideNavigation();
    })

    test('Verify if the first slide comes after the last slide', async ({ }) => {
        await imageCarouselPage.verifyFirstSlideAfterLastSlide();
    })

    test('Verify Slide images are not broken', async ({ }) => {
        await imageCarouselPage.verifySlideImagesAreNotBroken();
    })


})
