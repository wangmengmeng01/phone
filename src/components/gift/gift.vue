<template>
  <Fxd-mask  @click.native="cancel" transition="smallToBig">
    <div class="gift">
      <div class="con-margin">
        <div class="con">
          <h2 class="f36 color_font-purple"><span class="f12">+</span>{{data.profitRate}}%</h2>
          <h3 class="f36 color_font-purple">{{['加息券','现金抵扣','红包'][data.type-1]}}</h3>
          <p class="f28 p1">来自 {{data.name}} 理财师</p>
          <p class="f20 p2">投资满{{data.maxAmount}}元可用</p>
          <p class="f20 p3">{{data.startDate}}收到～{{data.endDate}}过期</p>
        </div>
        <p class="btn1 f28" @click="cancel">继续领取其他礼物</p>
        <!--<p class="btn2 f32">查看我的优惠</p>-->
      </div>
    </div>
  </Fxd-mask>
</template>
<style lang="sass" scoped>
  .gift
    height: 100vh
    width: 100vw
    text-align: center
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    .con
      margin: auto
      width: 6.32rem
      height: 6.32rem
      background: url("../../assets/found/open_gitf.png") no-repeat center center
      background-size: 100% 100%
      position: relative
      h2
        width: 100%
        position: absolute
        top: 2.26rem
      h3
        width: 100%
        position: absolute
        top: 2.98rem
      .p1
        width: 100%
        position: absolute
        top: 4.02rem
        color: rgba(255,255,255,.8)
      .p2
        width: 100%
        position: absolute
        top: 4.48rem
        color: rgba(255,255,255,.8)
      .p3
        width: 100%
        position: absolute
        top: 4.88rem
        color: rgba(255,255,255,.8)
    .btn1
      background: #F9423B
      height: .72rem
      line-height: .72rem
      width: 2.6rem
      margin: .6rem auto .4rem
      border-radius: .08rem
      color: #fff
    .btn2
      color: #fff
</style>
<script>
  import { searchCouponReceiveDetails } from '@/service'
  import mask from '@/components/mask'
    export default{
        name: 'gift',
        props: ['data'],
        data(){
          return{
            visible: false
          }
        },
        created(){
          const {receiveNo, couponNo} = this.data;
          if(receiveNo && couponNo){
          const couponList = this.$parent.item.coupon.couponList;
            searchCouponReceiveDetails({receiveNo,couponNo}).then(()=>{
              const index = couponList.findIndex(t=>t.couponNo===couponNo);
              index!==-1 && couponList.splice(index,1)
            })
          }
        },
        components: {
            'Fxd-mask':mask,
        },
        methods: {
            cancel(){
                this.$parent.gift_visible = false
            },
        }
    }
</script>
