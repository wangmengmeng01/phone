<template>
  <div class="tradeRecord">
    <ul class="tradeRecordContent">
      <li>
        <div class="top">
            <div>充值</div>
            <div>+100.00</div>
        </div>
        <div class="bottom">
          <div>2017-10-11</div>
          <div>可用余额 200.00</div>
        </div>
      </li>
      <li>
        <div class="top">
            <div>充值</div>
            <div>+100.00</div>
        </div>
        <div class="bottom">
          <div>2017-10-11</div>
          <div>可用余额 200.00</div>
        </div>
      </li>
    </ul>
    <div class="tradeRecordFooter">上拉加载更多…</div>
  </div>
</template>

<script>
  export default {
    name: 'tradeRecord',
    data() {
      return{
        res: {},
        item: {

        }
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
  .tradeRecordContent
    background #ffffff
    padding 0 0.4rem 2rem
    margin-top 0.4rem
    li
      height 1.18rem
      border-bottom 1px solid #CDCED3
      overflow hidden
      .top
        display flex
        justify-content space-between
        color #181818
        font-size 0.28rem
        margin-top 0.24rem
      .bottom
        display flex
        justify-content space-between
        color #8D8D94
        font-size 0.2rem
        margin-top 0.12rem

.tradeRecordFooter
  color #979797
  font-size 0.28rem
  text-align center
  margin-top 0.54rem

</style>
