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

// const gs_cred = require("./credentials.json");
// const { GoogleSpreadsheet } = require("google-spreadsheet");
// const { JWT } = require("google-auth-library");

// console.log(gs_cred);
// const serviceAccountAuth = new JWT({
//   email: gs_cred.client_email,
//   key: gs_cred.private_key,
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });

// const createCPShortUrl = async (link) => {
//   const url = `https://partners.coupang.com/api/v1/url/any?coupangUrl=${encodeURI(
//     link
//   )}`;
//   const response = await axios.get(url);

//   return response;
// };

const addCoupangData = async (items) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = {
    items: items,
  };

  await axios.post(
    "https://api.mindpang.com/api/coupang/add.php",
    data,
    config
  );
};

const run = async () => {
  console.log("START");

  const menuItems = cpMenuItems;
  console.log(menuItems);

  // const doc = new GoogleSpreadsheet(
  //   "1wDltbK7Q9j2Qg0ze23s7jGKCaaF81UFUs8OAf6a7zs0",
  //   serviceAccountAuth
  // );

  // await doc.loadInfo();
  // const sheet = doc.sheetsByIndex[0];

  const options = new chrome.Options();

  // 디버그 포트로 실행된 크롬에 attach
  options.options_["debuggerAddress"] = "127.0.0.1:9222";

  await new chrome.ServiceBuilder("./chromedriver.exe").build();
  const driver = await new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  const pages = 17;
  for (const item of menuItems) {
    for (let i = 1; i <= pages; i++) {
      const url = `${item.link}?page=${i}`;
      try {
        console.log(url);
        // HTML 파일 로컬 경로 설정 (파일 경로는 절대경로로 설정해주세요)
        // await driver.sleep(200);
        await driver.get(url);

        await driver.sleep(200);
        // 상품 요소를 모두 선택
        const products = await driver.findElements(
          By.css("#productList li.baby-product")
        );

        let results = [];
        for (let product of products) {
          const params = {
            bigCategory: item.bigCategory,
            middleCategory: item.middleCategory,
            category: item.category,
          };
          // 품절 여부 확인: .out-of-stock 클래스가 존재하면 skip
          const outOfStockElements = await product.findElements(
            By.css(".out-of-stock")
          );
          if (outOfStockElements.length > 0) {
            console.log("품절된 상품입니다. 건너뜁니다.\n");
            continue; // skip
          }

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

          // 가격 가져오기
          let price = "0";
          try {
            let priceElement = await product.findElement(
              By.css(".price-value")
            );
            price = await priceElement.getText();
          } catch {
            price = "0";
          }

          params.title = name;
          params.thumbnail = thumbnail;
          params.link = link;
          params.price = price || "0";

          results.push(params);
        }
        if (results.length > 0) {
          console.log("mindpang db 저장을 시작합니다.");
          // await driver.sleep(1000);
          await addCoupangData(results);
          console.log(
            `mindpang db 저장(${results.length}개)이 완료되었습니다.`
          );
        } else {
          console.log("전부 품절 상태라 다음으로 넘어갑니다.");
        }
      } catch (error) {
        console.log("url 오류 발생 지점: ", url);
        console.error("에러 발생:", error);
      }
    }
  }
  await driver.quit();
};

run();
