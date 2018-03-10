<template>
  <div class="autoInvestWrap">
    <div class="autoInvest">
      <div class="offOn">
        <div class="OOFont">自动投标</div>
        <div class="OOWrap">
          <div class="OOButton">关</div>
        </div>
      </div>
      <div class="autoIC">授权存管方开启自动复投</div>
      <div class="autoIB"><img src="../../assets/wealth/tips.png" alt=""> <span>在您投资计划标之前，请务必先开启此功能</span></div>
    </div>
    <div class="autoIIllustrate">
      <p>授权复投流程</p>
      <div class="AIITips"><img src="../../assets/wealth/Triangle.png">放心：自动委托</div>
      <div class="AIITips"><img src="../../assets/wealth/Triangle.png">安心：资金不站岗</div>
      <div class="AIITips"><img src="../../assets/wealth/Triangle.png">省心：设置灵活</div>
    </div>
  </div>
</template>

<script>
  import { autoInvestQuary } from '@/service'
  export default {
    name: 'autoInvest',
    data() {
      return{
        res: {},
        item: {

        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        autoInvestQuary().then(res=>{
          this.res =res;
          // this.$go('/webapp')
          console.log(res)
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" scoped>
  .autoInvest
    height:2.94rem;
    background:rgba(255,255,255,1);
    margin-top 0.4rem
    padding-top 0.5rem
  .offOn
    display flex
    justify-content space-between
    padding 0 0.36rem
    .OOFont
      color #181818
      font-size 0.36rem
  .OOWrap
    width:1rem;
    height:0.52rem;
    background:rgba(240,240,248,1);
    border-radius: 0.32rem ;
    position relative
    .OOButton
      width:0.6rem;
      height:0.52rem;
      background:rgba(141,141,148,1);
      border-radius: 0.32rem;
      line-height 0.52rem
      color #ffffff
      font-size 0.28rem
      text-align center
      position absolute
      left 0
  .autoIC
    color #8D8D94
    font-size 0.28rem
    padding 0.6rem 0 0 0.6rem
  .autoIB
    color #181818
    font-size 0.24rem
    padding 0.16rem 0 0 0.6rem
    line-height 0.48rem
    img
      width 0.44rem
      height 0.44rem
      position relative
      top 0.12rem
    span
      display inline-block
      margin-left 0.2rem
  .autoIIllustrate
    height:3.54rem;
    background:rgba(255,255,255,1);
    margin-top 0.4rem
    p
      color #181818
      font-size 0.36rem
      padding 0.5rem 0 0.4rem 0.36rem
    .AIITips
      color #8D8D94
      font-size 0.24rem
      padding 0.18rem 0 0 0.6rem
      img
        width 0.2rem
        height 0.2rem
        padding-right 0.11rem
</style>
