/**
 *
 * 모든 링크를 구한다.
 *
 * 짧은 쿠팡 url을 만든다.
 * 챗 지피티에게 상품 작성을 시킨다.
 * 블로그 혹은 워드프레스에 올린다.
 *
 * 네이버서치어드바이저 등록한다.
 */

const axios = require("axios");
const cpMenuItems = require("./cp-category.json");
const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
// const webdriver = require("selenium-webdriver");
// const { By } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");
// const moment = require("moment");

// const gs_cred = require("./sheet.json");
// const { GoogleSpreadsheet } = require("google-spreadsheet");
// const doc = new GoogleSpreadsheet(
//   "1wDltbK7Q9j2Qg0ze23s7jGKCaaF81UFUs8OAf6a7zs0"
// );

const createCPShortUrl = async (link) => {
  const url = `https://partners.coupang.com/api/v1/url/any?coupangUrl=${encodeURI(
    link
  )}`;
  const response = await axios.get(url);

  return response;
};

// month, 날짜 입력후, 구글 시트 맞추고 실행
const run = async () => {
  console.log("START");

  const menuItems = cpMenuItems.slice(0, 3);
  console.log(menuItems);

  // const url =
  //   "https://www.coupang.com/vp/products/12804417?itemId=6172130063&vendorItemId=3018137311&sourceType=CATEGORY&categoryId=501340";
  // const cpShortUrl = createCPShortUrl(url);

  // console.log(cpShortUrl);

  await new chrome.ServiceBuilder("./chromedriver").build();
  const driver = await new webdriver.Builder().forBrowser("chrome").build();

  const pages = 2;
  for (const item of menuItems) {
    const params = {
      BigCategory: item.bigCategory,
      MiddleCategory: item.middleCategory,
      category: item.category,
    };

    for (let i = 1; i <= pages; i++) {
      await driver.sleep(1000);
      const url = `${item.url}?page=${i}`;
      try {
        // HTML 파일 로컬 경로 설정 (파일 경로는 절대경로로 설정해주세요)
        await driver.get(url);

        // 상품 요소를 모두 선택
        const products = await driver.findElements(
          By.css("#productList li.baby-product")
        );

        for (let product of products) {
          // 썸네일 이미지 src 속성 가져오기
          let thumbnailElement = await product.findElement(
            By.css("dt.image img")
          );
          let thumbnail = await thumbnailElement.getAttribute("src");

          // 상품 링크 가져오기
          let linkElement = await product.findElement(
            By.css("a.baby-product-link")
          );
          let link = await linkElement.getAttribute("href");

          // 상품명 가져오기
          let nameElement = await product.findElement(
            By.css("dd.descriptions .name")
          );
          let name = await nameElement.getText();

          console.log("상품명:", name);
          console.log("링크:", link);
          console.log("썸네일:", thumbnail);
          console.log("--------------------------------------");
        }
      } catch (error) {
        console.error("에러 발생:", error);
      } finally {
        await driver.quit();
      }
    }
  }
  await driver.quit();
};

run();
