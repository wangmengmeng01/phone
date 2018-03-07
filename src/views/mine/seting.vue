<template>
  <div class="seting">
    <ul class="item">
      <li v-for="i in pwdList" class="m4 flex border-notend-b">
        <span class="f32 color_font">{{i.name}}</span>
        <img src="../../assets/common/arrow-right.png" alt="">
      </li>
    </ul>
    <ul class="item">
      <li v-for="i in infoList" class="m4 flex border-notend-b">
        <span class="f32 color_font">{{i.name}}</span>
        <img src="../../assets/common/arrow-right.png" alt="">
      </li>
    </ul>
    <ul class="item">
      <li class="p4">
        <a href="tel:400-088-0888" class="flex border-notend-b">
          <span class="f32 color_font">客服电话 400-088-0888</span>
          <div class="flex">
            <span class="color_main f32 tel">拨打</span>
            <img src="../../assets/common/arrow-right.png" alt="">
          </div>
        </a>
      </li>
    </ul>
    <p class="tip f24 color_font-s">服务时间 9:00-18:00</p>
    <button class="btn" @click="$go('/webapp/login')">退出登录</button>
  </div>
</template>

<script>
  export default {
    name: 'seting',
    data() {
      return {
        pwdList:[{
          name: '修改登录密码',
          url: ''
        },{
          name: '修改交易密码',
          url: ''
        }],
        infoList:[{
          name: '关于我们',
          url: ''
        },{
          name: '安全保障',
          url: ''
        },{
          name: '信息披露',
          url: ''
        }]
      }
    },
    created() {
    },
    components: {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .seting
    .item
      margin-top: .4rem
      background: #fff
      .tel
        margin-right: .2rem
      li

        height: 1.16rem
        img
            height: .34rem
        a
          height: 1.16rem
          text-decoration: none
    .tip
      margin: .2rem auto 2.7rem .4rem
    .btn
      background: #fff
      border-radius: 0
      color: #181818
      font-size: .36rem

</style>
