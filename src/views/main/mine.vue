<template>
  <div class="mine">
    <div class="head flex" @click="$go('/mine/qrcode')">
      <img :src="item.pic || head" alt="" class="head_icon">
      <div class="msg">
        <h2 class="f44 flex"><span>{{item.userName}}</span><span v-if="(item.position=='1')||(item.position=='2')" class="status"><img src="../../assets/main/mine/status_yellow.png" alt=""><i class="f12">{{['一般理财师','大区经理'][parseInt(item.position)-1]}}</i></span></h2>
        <p class="f24">{{item.pic}}</p>
        <p class="f24">手机号  {{item.mobile}}</p>
      </div>
      <span class="qrcode flex">
        <img src="../../assets/main/mine/qrcode.png" alt="" class="qrcode_icon">
        <img src="../../assets/common/arrow-transparent-right.png" alt="" class="arrow-transparent">
      </span>
    </div>
    <!--菜单栏-->
    <ul class="item" v-for="i in menu" v-if="menu.length">
      <li v-for="j in i" class="flex border-notend-b" @click="$go(j.icon==='join' ? j.url : `/mine/${j.url}`)">
        <img :src="require(`@/assets/main/mine/${j.icon}.png`)" alt="" class="icon">
        <span class="name f32">{{j.name}}</span>
        <span class="f28 color_font-s" v-if="!j.url">敬请期待</span>
        <img src="../../assets/common/arrow-right.png" alt="" class="arrow">
      </li>
    </ul>
    <p class="RiskTips">————<i>出借有风险，选择需谨慎</i>————</p>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { searchUserInfo } from '@/service'
  export default {
    name: 'mine',
    data() {
      return {
        head: require('@/assets/main/mine/head.png'),
        item: {},
        menu:[],
       menu_normal:[[
//           {
//           icon: 'sweep',
//           name: '扫一扫添加客户',
//           url: 'qrcode'
//         },
         {
           icon: 'mine',
           name: '我的理财师',
           url: 'master'
         },{
           icon: 'join',
           name: '我要加盟的理财师',
           url: '/home/joinFinlManager'
         }],[{
         icon: 'seting',
         name: '设置',
         url: 'seting'
       }]],
      menu_manage: [[
//          {
//        icon: 'sweep',
//        name: '扫一扫添加客户',
//        url: 'qrcode'
//      },{
//        icon: 'sweep',
//        name: '扫一扫添加理财师',
//         url: 'qrcode'
//      },
        {
        icon: 'mine',
        name: '我的理财师',
         url: 'master'
      }],[{
        icon: 'have',
        name: '已有客户',
         url: 'customer'
      },{
        icon: 'customer',
        name: '潜在客户',
         url: 'customer_potential'
      }],[{
        icon: 'advertisement',
        name: '广告卓信产品记录',
         url: ''
      },{
        icon: 'advertisement',
        name: '针对客户展业记录',
         url: ''
      },{
        icon: 'share',
        name: '邀约客户投资记录',
         url: ''
      },{
        icon: 'discount',
        name: '赠送客户优惠记录',
         url: ''
      }], [{
        icon: 'commission',
        name: '我的佣金',
         url: ''
      }], [{
        icon: 'seting',
        name: '设置',
         url: 'seting'
      }]]
      }
    },
    created() {
      this.init()
    },
    methods: {
      ...mapActions([
        'set_user_info',
      ]),
      init(){
        searchUserInfo().then(r=>{
          this.item = r;
          this.menu = r.flag === 1 ? this.menu_manage : this.menu_normal;
          this.set_user_info(r);
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .mine
    min-height: 100vh
    .head
      padding: .76rem .4rem .6rem
      align-items: flex-start
      color: #fff
      background: rgb(50,153,209)
      .head_icon
        border-radius: 50%
        width: 1.16rem
        height: 1.16rem
      .msg
        flex: 1
        padding: 0 .4rem
        h2
          justify-content: flex-start
          .status
            left: .1rem
            position: relative
            height: .38rem
            line-height: .38rem
            width: 1.54rem
            display: flex
            align-items: center
            justify-content: center
            i
              padding-left: .2rem
              position: relative
              z-index: 1
              font-style: normal
            img
              height: 100%
              width: 100%
              left: 0
              top: 0
              position: absolute
        p
          margin-top: .1rem
          line-height: .34rem
      .qrcode_icon
        width: .72rem
      .arrow-transparent
        height: .4rem
        padding-left: .4rem
    .item
      padding: 0 .4rem
      background: #fff
      margin-top: .4rem
      li
        height: 1.16rem
        .icon
          width: .56rem
        .name
          padding: 0 .4rem
          color: #252525
          flex: 1
        .arrow
          padding-left: .2rem
          height: .34rem
    .RiskTips
      margin: 1.06rem 0 0.98rem
      height: 0.84rem
      text-align: center
      line-height: 0.24rem
      font-size: 0.24rem
      color: #B6B2B2
      i
        font-style: inherit
        margin: 0 0.2rem
</style>
