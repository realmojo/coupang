const express = require("express");
const app = express();

const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const run = async () => {
  // 1. chromedriver 경로 설정 // chromedriver가 있는 경로를 입력
  const service = new chrome.ServiceBuilder("./chromedriver").build();
  chrome.setDefaultService(service);

  // 2. chrome 브라우저 빌드
  const driver = await new webdriver.Builder().forBrowser("chrome").build();

  // 3. google 사이트 열기
  console.log("인스타그램을 엽니다.");
  await driver.get("https://instagram.com");
  await driver.sleep(3000);

  console.log("로그인을 합니다.");
  const loginInput = await driver.findElement(By.name("username"));
  await driver.sleep(1000);
  loginInput.click();
  await driver.sleep(1000);
  await loginInput.sendKeys("ID");
  await driver.sleep(1000);

  const passwordInput = await driver.findElement(By.name("password"));
  await driver.sleep(1000);
  passwordInput.click();
  await driver.sleep(1000);
  await passwordInput.sendKeys("PW");
  await driver.sleep(1000);

  const submit = await driver.findElement(
    By.xpath("//*[@id='loginForm']/div/div[3]/button")
  );
  await driver.sleep(1000);
  submit.click();
  await driver.sleep(5000);

  console.log("인스타그램을 태그검색을 합니다.");
  // await driver.get("https://www.instagram.com/explore/tags/한복/");
  await driver.get("https://www.instagram.com/explore/tags/비녀/");
  console.log("20초 기다립니다.");
  await driver.sleep(20000);

  // console.log("나중에 하기 클릭1");
  // const laterButton = await driver.findElement(
  //   By.xpath("//*[@id='react-root']/section/main/div/div/div/div/button")
  // );

  // await driver.sleep(1000);
  // laterButton.click();
  // console.log("20초 기다려야합니다.");
  // await driver.sleep(20000);

  let count = 0;
  console.log("인기게시물 좋아요를 실행합니다.");
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      console.log(`${++count}번째 게시물 좋아요를 실행합니다.`);
      let post = await driver.findElement(
        By.xpath(
          `//*[@id="react-root"]/section/main/article/div[1]/div/div/div[${i}]/div[${j}]/a`
        )
      );
      await driver.sleep(1000);
      post.click();
      await driver.sleep(5000);

      let likeBtn = await driver.findElement(
        By.xpath(
          "/html/body/div[6]/div[2]/div/article/div[3]/section[1]/span[1]/button"
        )
      );
      await driver.sleep(1000);
      likeBtn.click();
      await driver.sleep(3000);

      let closeBtn = await driver.findElement(
        By.xpath("/html/body/div[6]/div[3]/button")
      );
      await driver.sleep(1000);
      closeBtn.click();
      await driver.sleep(10000);
    }
  }

  console.log("일반게시물 좋아요를 실행합니다.");
  count = 0;
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 3; j++) {
      console.log(`${++count}번째 게시물 좋아요를 실행합니다.`);
      let post = await driver.findElement(
        By.xpath(
          `//*[@id="react-root"]/section/main/article/div[2]/div/div[${i}]/div[${j}]/a`
        )
      );
      await driver.sleep(1000);
      post.click();
      await driver.sleep(5000);

      let likeBtn = await driver.findElement(
        By.xpath(
          "/html/body/div[6]/div[2]/div/article/div[3]/section[1]/span[1]/button"
        )
      );
      await driver.sleep(1000);
      likeBtn.click();
      await driver.sleep(3000);

      let closeBtn = await driver.findElement(
        By.xpath("/html/body/div[6]/div[3]/button")
      );
      await driver.sleep(1000);
      closeBtn.click();
      await driver.sleep(10000);
    }
  }

  await driver.sleep(10000);
  // 4. 3초 후에 브라우저 종료
  setTimeout(async () => {
    await driver.quit();
    process.exit(0);
  }, 100000);
};

run();

// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log("Server is working : PORT - ", port);
// });
