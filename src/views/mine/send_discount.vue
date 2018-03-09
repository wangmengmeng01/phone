<template>
  <div class="send_discount">
    <div class="customer p4 center">
      <h2 class="title f32 color_font">送给这位客户</h2>
      <img src="/" alt="" class="place-img" >
      <p class="name center f28 color_font-s">{{item.name}}</p>
    </div>
    <div class="send p4">
      <h2 class="title f32 color_font flex">送他(她)什么好呢 <span class="f24 color_font-s">可选一个或多个优惠</span></h2>
      <Coupon v-for="(i,index) in coupon" :data="i" :key="index" class="item act" close="true" @closeCb="close"/>
      <div class="item none" @click="$go('/webapp/coupon/choose_usable',{'backurl':'/webapp/mine/send_discount'})">
        <img src="../../assets/coupon/none.png" alt="">
      </div>
    </div>
    <button class="btn" :class="[!coupon.length?'dis':'']">赠送</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'send_discount',
    data() {
      return {
        item:{
            name: '赵一'
        },
      }
    },
    computed: {
      ...mapGetters([
        'coupon'
      ])
    },
    created() {
      this.init();
    },
    components: {
      Coupon,
    },
    methods: {
      ...mapMutations([
        'DEL_COUPON',
      ]),
      init(){
      },
      close(data){
        this.DEL_COUPON(data);
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
    .btn
      position: fixed
      right: 0
      left: 0
      border-radius: 0
      bottom: 0
      margin-top: 1rem
</style>
