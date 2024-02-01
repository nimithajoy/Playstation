import { Page } from "@playwright/test"
import { test } from "../pages/basePage"
import * as userData from "../testdata.json";
import { ImageCarousel } from "../pages/image-carousel";


test.describe('Verify image carousel functionalities', () => {
    let newPage: Page;
    let imageCarouselPage: ImageCarousel;

    test.beforeEach('Navigate to PlayStation website', async ({ navigationPage, loginPage, baseURL }) => {
        await navigationPage.goToLoginPage(baseURL);
        // await loginPage.login(userData.DefaultUser.emailAddress, userData.DefaultUser.password, userData.DefaultUser.userName);
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
