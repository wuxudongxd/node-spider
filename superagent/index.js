import superagent from "superagent";

superagent
  .get("https://wuxd.top/")
  .then((res) => {
    // res.body, res.headers, res.status
    console.log(res.text);
    console.log(res.body);
    console.log(res.header);
    console.log(res.type);
    console.log(res.charset);
  })
  .catch((err) => {
    // err.message, err.response
  });

