import router from "./index";
import store from "@/store/";

// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果url上面有参数，判断是不是header的属性，是的话存到store中
  const query = Object.keys(to.query);
  if (query.length) {
    query.includes("userToken") && store.commit("SET_USER", to.query);
  }

  const user = localStorage.getItem("user");
  const version = localStorage.getItem("version");
  const config = require("@/config.json"); // 获取json

  if (user) {
    // 有的话取localStorage, 并且存到store中
    const data = JSON.parse(user); // 存储的版本
    if (!!version && parseFloat(version) < parseFloat(config.version)) {
      // 如果当前web版本大于存储的版本，重置
      store.commit("RESET");
    } else {
      data.userToken && store.commit("SET_USER", data)
    }
  }

  // 设置title
  document.title = to.meta.title || "理财师";
  if (!!store.state.user.userToken) {
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
