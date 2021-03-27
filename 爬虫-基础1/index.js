"use strict";
import cheerio from "cheerio";

import agent from "../登录/index.js";

const res = await agent.get("http://glidedsky.com/level/web/crawler-basic-1");
const $ = cheerio.load(res.text);
let sum = 0;
$(".card .card-body .col-md-1").each((i, elem) => {
  let _this = $(elem);
  sum += _this.text().trim() * 1;
});
console.log(sum);
