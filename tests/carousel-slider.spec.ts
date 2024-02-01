import { Page, test } from "@playwright/test"
import { LoginPage } from "../pages/login"
import { NavigationPage } from "../pages/navigation";
import * as userData from "../testdata.json";
import { ImageCarousel } from "../pages/image-carousel";


test.describe('Verify image carousel functionalities', () => {
    let newPage: Page;

    test.beforeAll('Navigate to PlayStation website', async ({ browser ,baseURL}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
      //  const loginPage = new LoginPage(page);
        const navigationPage = new NavigationPage(page, context);
        await navigationPage.goToLoginPage(baseURL);
       // await loginPage.login(userData.DefaultUser.emailAddress, userData.DefaultUser.password, userData.DefaultUser.userName);
        newPage = await navigationPage.goToPlayStationPage();

    })

    test('Carousel automatically changes slides by itself', async ({ }) => {
        const imageCarouselPage = new ImageCarousel(newPage);
        await imageCarouselPage.verifyCarouselAutomaticSlide();

    })

    test('Clicking on the tab under the carousel, displays the appropriate slide', async ({ }) => {
        const imageCarouselPage = new ImageCarousel(newPage);
        await imageCarouselPage.selectASlide(3);
        await imageCarouselPage.selectASlide(5);
    })

    test('Verify the text and the button of each slide', async ({ }) => {
        const imageCarouselPage = new ImageCarousel(newPage);
        await imageCarouselPage.verifyContentOfSlide();
    })

    test('Verify the navigation from each slide', async ({ }) => {
        const imageCarouselPage = new ImageCarousel(newPage);
        await imageCarouselPage.verifySlideNavigation();
    })


    test('Verify if the first slide comes after the last slide', async ({ }) => {
        const imageCarouselPage = new ImageCarousel(newPage);
        await imageCarouselPage.verifyFirstSlideAfterLastSlide();
    })

    test('Verify Slide images are not broken', async ({ }) => {
        const imageCarouselPage = new ImageCarousel(newPage);
        await imageCarouselPage.verifySlideImagesAreNotBroken();
    })
})
