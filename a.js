const menuItems = require("./cp-menu.json");

console.log(menuItems.length);

const a = [];
menuItems.map((item) => {
  if (a.includes(item.link) !== -1) {
    a.push(item.link);
  }
});

console.log(a.length);
