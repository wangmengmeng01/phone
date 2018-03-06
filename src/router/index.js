import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = require("@/config.json").route; // 获取配置的路由
/**
 * ios键盘弹起会把页面顶上去，所以当切换到新路由时，需要页面滚到顶部 示例：https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html
 * @param {*} to
 * @param {*} from
 * @param {*} savedPosition
 */
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {};
    if (to.hash) {
      position.selector = to.hash;
    } else {
      position.x = 0;
      position.y = 0;
    }
    return position;
  }
};

/**
 * 处理动态路由
 * @param arr
 * @param child 是否是子路由
 */
const dealRoutes = (arr, child = false) => {
  let newArr = []; // 登录接口返回的数组
  arr.map(t => {
    if (t.redirect) {
      // 重定向的先做处理
      newArr.push({
        path: `${t.path}`,
        redirect: `${t.redirect}`
      });
    } else {
      // 正常的路由
      let path = `${child ? "" : "/webapp/"}${t.path}`; // 如果是子路由则无需加上webapp前置
      let name = `${child ? child + "-" : ""}${t.path}`; // 子路由名字 = 子组件+加上父组件

      // 子组件需要加上父组件的路径，如果是父组件需要加上index的路由，不知道为什么这个自动生成的时候没有默认找index，太懒了
      let url = t.component || t.path; // 如果没有component属性则是用path来代替
      let component = () =>
        import(`@/views/${child ? child + "/" : ""}${
          !child && t.children ? url + "/index" : url
        }`);

      let title = t.title; // 标题
      let back = typeof t.back === 'boolean' ? t.back : t.back || true; // 标题
      let filter = !!t.filter; // 是否过滤

      if (t.path.includes("webapp")) {
        // 如果是 webapp单独做下处理
        path = "/webapp";
      }
      if (t.path.includes("*")) {
        // 同上
        path = "*";
      }

      let config = {
        path,
        name,
        component,
        meta: {
          title,
          filter,
          back
        }
      };
      // 有子组件的做递归处理，并且删除父组件的name和meta属性
      if (t.children) {
        delete config.name;
        delete config.meta;
        config.children = dealRoutes(t.children, url);
      }
      newArr.push(config);
    }
  });
  return child // 子组件只需要返回重组数组
    ? newArr
    : {
        mode: "history",
        scrollBehavior,
        routes: newArr
      };
};
// console.log(dealRoutes(routes))
export default new Router(dealRoutes(routes));
