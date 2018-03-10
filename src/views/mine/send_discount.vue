<template>
  <div class="send_discount">
    <div class="customer p4 center">
      <h2 class="title f32 color_font">送给这位客户</h2>
      <img src="/" alt="" class="place-img" >
      <p class="name center f28 color_font-s">{{coupon.params.realName}}</p>
    </div>
    <div class="send p4">
      <h2 class="title f32 color_font flex">送他(她)什么好呢 <span class="f24 color_font-s">可选一个或多个优惠</span></h2>
      <Coupon v-for="(i,index) in coupon.data" :data="i" :key="index" class="item act" close="true" @closeCb="close"/>
      <div class="item none" @click="choose">
        <img src="../../assets/coupon/none.png" alt="">
      </div>
    </div>
    <button class="btn" :class="[!coupon.data.length?'dis':'']" @click="submit">赠送</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { saveGiveCoupon } from '@/service'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'send_discount',
    computed: {
      ...mapGetters([
        'coupon'
      ])
    },
    components: {
      Coupon,
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_COUPON',
        'DEL_COUPON',
        'SET_SUCC_PAGE'
      ]),
      choose(){
        this.SET_COUPON({backurl: this.$route.path});
        this.$go('/webapp/coupon/choose_usable')
      },
      close(data){
        this.DEL_COUPON(data);
      },
      submit(){
        saveGiveCoupon({
          giveUserCode: this.coupon.params.userCode,
          receiveNoList: this.coupon.receiveNoList
        }).then(()=>{
          this.RESET('coupon');
          this.SET_SUCC_PAGE({
            "title": "赠送客户优惠成功",
            "sub_title": "优惠已存入客户为的优惠中",
            "btn_text": "继续赠送其他客户",
            "sub_btn_text": "查看赠送记录",
            "sub_backurl": "/webapp/mine/customer",
            "backurl": "/webapp/mine/customer"
          });
          this.$go('/webapp/static/succ');
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .send_discount
    padding-bottom: .88rem
    padding-top: .42rem
    height: 100%
    background: #f1f1f9
    .title
      text-align: left
      line-height: 1rem
    .customer
      background: #fff
      .icon
        width: 1.48rem
      .name
        padding: .18rem 0 .66rem
    .send
      margin-top: .42rem
      background: #fff
      padding: 0 .4rem .4rem
      .title
        padding-bottom: .2rem
      .item
        margin: .2rem
        &.none
          border: 1px dashed #8D8D94
          border-radius: .2rem
          height: 3.16rem
          display: flex
          align-items: center
          justify-content: center
          img
            height: .76rem
        &.act
          margin: 0
          margin-top: .2rem
    .btn
      position: fixed
      right: 0
      left: 0
      border-radius: 0
      bottom: 0
      margin-top: 1rem
</style>
