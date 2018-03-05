import router from "./index";
import store from "@/store/";

// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果url上面有参数，判断是不是header的属性，是的话存到store中
  const query = Object.keys(to.query);
  if (query.length) {
    query.includes("juid") && store.commit("DEAL_HEADER", to.query);
  }

  const header = localStorage.getItem("header");
  const user = localStorage.getItem("user");
  const version = localStorage.getItem("version");
  const config = require("@/config.json"); // 获取json

  if (header) {
    // 有的话取localStorage, 并且存到store中
    const data = JSON.parse(header); // 存储的版本
    if (parseFloat(data.version) < parseFloat(config.state.header.version)) {
      // 如果当前API版本大于储存的版本，重置
      store.commit("RESET");
    } else if (!!version && parseFloat(version) < parseFloat(config.version)) {
      // 如果当前web版本大于存储的版本，重置
      store.commit("RESET");
    } else {
      data.juid &&
        store.commit("DEAL_HEADER", data) &&
        store.commit("SET_USER", user);
    }
  }

  // 设置title
  document.title = to.meta.title || "理财师";
  if (!!store.state.header.juid) {
    //如果有就直接到首页咯
    next();
  } else {
    if (to.meta.filter) {
      // 过滤不需要登录的页面
      next();
    } else {
      //不然就跳转到登录；
      // next("/webapp/login");
      next();
    }
  }
});
