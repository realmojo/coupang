const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
  let elements = document.querySelectorAll('[data-category-depth="2depth"]');
  let length = elements.length;
  let i = 0;
  for (const element of elements) {
    await sleep(200);
    console.log(`${i++} / ${length}`);
    element.click();
  }
  console.log("2뎁스 클릭완료");
  await sleep(1000);

  elements = document.querySelectorAll('[data-category-depth="3depth"]');
  length = elements.length;
  i = 0;
  for (const element of elements) {
    await sleep(300);
    console.log(`${i++} / ${length}`);
    element.click();
  }
  console.log("3뎁스 클릭완료");
  await sleep(1000);
  elements = document.querySelectorAll('[data-category-depth="4depth"]');
  length = elements.length;
  i = 0;
  for (const element of elements) {
    await sleep(300);
    console.log(`${i++} / ${length}`);
    element.click();
  }
  console.log("4뎁스 클릭완료");
  await sleep(1000);
  elements = document.querySelectorAll('[data-category-depth="5depth"]');
  length = elements.length;
  i = 0;
  for (const element of elements) {
    await sleep(300);
    console.log(`${i++} / ${length}`);
    element.click();
  }
  console.log("5뎁스 클릭완료");
  await sleep(2000);
  elements = document.querySelectorAll(".seo-link-url");
  const category = document
    .querySelector(".newcx-product-list-title")
    .textContent.trim();
  const a = [];
  elements.forEach((element) => {
    const twoDepthElement = $(element).parents("ul");
    a.push({
      category,
      middleCategory:
        $(twoDepthElement).prev().prev().find("a").text().trim() || category,
      link: element.getAttribute("href"),
      title: element.textContent,
    });
  });
  console.log(a);
};

run();
