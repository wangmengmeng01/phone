# fxd-webapp

> this is fxd-webapp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## vuex的使用
定义部分：
例如，存储用户信息，
1. 在config.json中"state"中定义需要储存到state中的数据，比如"user"
2. 在store，index中定义action和mutations，action表示异步存储，比如调用接口的存储，mutations则同步调用不需要调用接口
  actions: {  // 异步调用
      set_user({ commit }, data) {
        commit('SET_USER', data)    // SET_USER则为下面mutations定义的函数
      },
    },
    mutations: {  // 同步调用
      SET_USER(state, data) {
        state.user = data;          // 此时就把data数据传入进来赋值给user了
      },
    },
3. 定义获取store存储的状态，在store下面的getters定义需要在store获取的属性，比如获取user
   user: state => state.user,

使用部分：
1. 在vue文件中调用存储文件的函数
   import { mapActions, mapMutations } from 'vuex'
   mapActions是定义的actions
   mapMutations是定义的mutations

2.  如果需要异步存储user，需要再methods里面定义
  ...mapActions([
    'set_user',       这个则是第一步action定义的函数
  ])
  调用this.set_user(data）data则为需要存储最终store.user中的数据


  如果需要同步存储user，需要再methods里面定义
    ...mapMutations([
      'SET_USER',     这个则是第一步mutations定义的函数
    ]),
  调用this.SET_USER(data）data则为需要存储最终store.user中的数据

  如上操作则将data里面的数据存入state里面的user属性下，

获取部分：
  import { mapGetters } from 'vuex'
  computed: {
    ...mapGetters([
      'user'    这个则是定义部分user: state => state.user,里面的函数
    ])
  },
  this.user则可以获取最终在state.user中定义的数据了
