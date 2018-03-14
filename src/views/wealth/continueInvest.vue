<template>
  <div class="continueInvest">
    <div class="CITop">
      为我的资产开启自动续期 <br/>
      到期后本金将自动购买同款产品 <br>
      避免资金闲置而损失收益
    </div>
    <ul class="CTCWrap">
      <li>
        <div class="CTCtop">
          <div class="CTCTleft">中赢宝-1234期</div>
          <div class="OOWrap" @click="autoRenewBol=!autoRenewBol">
            <div class="OOButton" v-if="autoRenewBol">关</div>
            <div class="OOButton on" v-else>开</div>
          </div>
        </div>
        <div class="CTCBottom">
          <div>续投金额 10,000.00元</div>
          <div>预计续期时间 2018.10.10</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'continueInvest',
    data() {
      return{
        autoRenewBol: true, //自动续费
      }
    },
    created() {
    },
    methods: {

    },
    watch: {
    }
  }
</script>

<style lang="stylus" scoped>
  .CITop
    height 1.32rem
    background #3299D1
    color #FFFFFF
    font-size 0.32rem
    line-height 0.44rem
    text-align center
    padding 0.64rem 0

  .CTCWrap
    li
      background #ffffff
      margin-top 0.4rem
      padding 0 0.36rem
      height 2.36rem
      overflow hidden
      .CTCtop
        display flex
        justify-content space-between
        margin-top 0.42rem
        .CTCTleft
          color #181818
          font-size 0.36rem
          line-height 0.52rem
      .CTCBottom
        display flex
        color #8D8D94
        font-size 0.28rem
        justify-content space-between
        margin-top 0.52rem
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
    .on
      left 0.4rem
      background #3299D1


</style>
