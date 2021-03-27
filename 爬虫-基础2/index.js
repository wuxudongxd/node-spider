"use strict";
import cheerio from "cheerio";

import agent from "../登录/index.js";

const baseUrl = "http://glidedsky.com/level/web/crawler-basic-2";

const outerArr = [];
for (let j = 0; j < 10; j++) {
  const reqArr = [];
  for (let i = 1; i <= 100; i++) {
    reqArr.push(agent.get(baseUrl + `?page=${i + j * 100}`));
  }
  outerArr.push(reqArr);
}

let total = 0;
for (let j = 0; j < 10; j++) {
  let sum = await Promise.all(outerArr[j]).then((results) => {
    let allNum = 0;
    for (const res of results) {
      const $ = cheerio.load(res.text);
      let pageNum = 0;
      $(".card .card-body .col-md-1").each((i, elem) => {
        let _this = $(elem);
        pageNum += _this.text().trim() * 1;
      });
      allNum += pageNum;
    }
    return allNum;
  });
  console.log(`第${j}次请求，sum=${sum}`);
  total += sum;
}

console.log(total);
