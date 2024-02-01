import { Locator, Page, expect } from "@playwright/test";


export class ImageCarousel {

    readonly page: Page
    readonly carouselSlidesLocator: Locator
    readonly sliderControlLocator: Locator
    readonly buttonBlockLocator: Locator
    readonly titleBlockLocator: Locator
    readonly headingLocator: Locator
    readonly sliderControlImageLocator: Locator
 
    constructor(page: Page) {
        this.page = page;
        this.carouselSlidesLocator = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]');
        this.sliderControlLocator = this.page.locator('xpath=//div[contains(@class,"slider__controls carousel")]//div[@role="button"]');
        this.buttonBlockLocator = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]//div[contains(@class,"btn-block")]')
        this.titleBlockLocator = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]//div[contains(@class,"title-block")]')
        this.headingLocator = this.page.locator('xpath=//div[@class="homepage-hero-wrapper"]//div[@class="slider__slides"]/div[contains(@class, "slider__slide")]//a[@aria-label="PAGE_BANNER_ARIA_LABEL"]')
        this.sliderControlImageLocator = this.page.locator('xpath=//div[contains(@class,"slider__controls carousel")]//div[@role="button"]//picture//source');
       
    

    }

    async verifyCarouselAutomaticSlide() {
        for (let slide of await this.carouselSlidesLocator.all()) {
            await slide.waitFor();
        }
    }

    async verifyFirstSlideAfterLastSlide() {
        let count = await this.carouselSlidesLocator.count();
        for (let i = 0; i < count; i++) {
            await this.carouselSlidesLocator.nth(i).waitFor()
            if (i == count - 1) {
                await this.carouselSlidesLocator.nth(0).waitFor();
            }

        }
    }

    async selectASlide(position: number) {
        await this.sliderControlLocator.nth(position - 1).click();
        await expect(this.sliderControlLocator.nth(position - 1)).toHaveClass(/selected/);
    }

    async verifyContentOfSlide() {
        let count = await this.sliderControlLocator.count();
        for (let i = 0; i < count; i++) {
            await this.sliderControlLocator.nth(i).click();
            await expect(this.titleBlockLocator.nth(i)).toBeVisible();
            await expect(this.buttonBlockLocator.nth(i)).toBeVisible();

        }
    }

    async verifySlideNavigation() {
        let count = await this.carouselSlidesLocator.count();
        for (let i = 0; i < count; i++) {
            await this.sliderControlLocator.nth(i).click();
            await this.carouselSlidesLocator.nth(i).waitFor();
            const link = await this.headingLocator.nth(i).getAttribute("href");
            await this.carouselSlidesLocator.nth(i).click();
            await this.page.waitForLoadState();
            const currentUrl = this.page.url();
            expect(currentUrl).toContain(link);
            await this.page.goBack();
            await this.page.waitForLoadState();

        }
    }

    async verifySlideImagesAreNotBroken() {
        for (let image of await this.sliderControlImageLocator.all()) {
            const imgSrc = await image.getAttribute("srcset");
            expect(imgSrc?.length).toBeGreaterThan(1);
        }
    }
}