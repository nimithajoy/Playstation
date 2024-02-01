import { test as base } from '@playwright/test';
import { LoginPage } from './login';
import { NavigationPage } from './navigation';
import { ImageCarousel } from './image-carousel';

type pages = {
    loginPage: LoginPage;
    navigationPage: NavigationPage;
    imageCarouselPage: ImageCarousel;
  
  };

  export const test = base.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
  
    navigationPage: async ({ context,page }, use) => {
      await use(new NavigationPage(page,context));
    },

    imageCarouselPage: async ({ page }, use) => {
        await use(new ImageCarousel(page));
      },

  });