import superagent from "superagent";
import cheerio from "cheerio";
import { readFile } from "fs/promises";

const baseUrl = "http://glidedsky.com/login";
const agent = superagent.agent();

const loginedAgent = async () => {
  try {
    // get请求登录页以获取 _token 字段 (_token 字段是用于网站xsrf防护的吧，似乎与cookie中字段有对应关系)
    const res1 = await agent.get(baseUrl);
    // 解析dom
    const dom1 = cheerio.load(res1.text);
    // 从json文件读取账号密码
    let loginForm = await readFile(
      new URL("./loginInfo.json", import.meta.url),
      {
        encoding: "utf-8",
      }
    );
    // 字符串转为json对象方便动态添加字段
    loginForm = JSON.parse(loginForm);
    // 添加 _token 字段
    loginForm._token = dom1("form input").attr("value");
    // 请求登录接口（send里要填json对象，而不是字符串。。。）
    const res2 = await agent.post(baseUrl).type("form").send(loginForm);
    if (res2.status == "200") {
      console.log("登录成功");
    }
    // 返回带有cookies的superagent对象副本
    return agent;
  } catch (err) {
    console.error(err);
  }
};

// 返回函数运行的结果, 即带有登录后cookie的agent对象
export default await loginedAgent();
