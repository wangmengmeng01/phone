<template>
  <div class="claims">
    <ul>
      <li class="item flex">
        <div class="left">
          <div class="top">
            <img src="" alt="" class="icon">
            <h2 class="color_font f28">债权ID001</h2>
            <p class="color_font-s f24">2018.01.01 购入</p>
          </div>
          <div class="bottom">
            <h2 class="color_font f28">A+</h2>
            <p class="color_font-s f24">债权评级</p>
          </div>
        </div>
        <div class="right">
          <p class="p1 flex color_font f36"><span>10,000.00</span><span>16.24%</span></p>
          <p class="p2 flex color_font-s f24"><span>债权价值(元)</span><span>占资产金额比重</span></p>
          <p class="p3 f40 color_main">南方机械厂购生产线项目</p>
          <p class="p4 color_font-s f24">对应借款项目<img src="../../assets/common/arrow-right.png" alt=""></p>
          <p class="p5 flex color_font f36"><span>10,000.000.00</span><span>正常</span></p>
          <p class="p6 flex color_font-s f24"><span>募集总额(元)</span><span>还款状态</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'claims',
    data() {
      return{
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

<style lang="sass" scoped>
  .claims
    .item
      margin-top: .4rem
      height: 5rem
      .left
        text-align: center
        height: 100%
        background: rgba(255,255,255,0.5)
        width: 2.4rem
        display: flex
        flex-direction: column
        img
          width: 1rem
          height: 1rem
        h2
          padding-bottom: .06rem
          line-height: .4rem
        .top
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          flex: 1
        .bottom
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          flex: 1
      .right
        padding-left: .2rem
        padding-right: .38rem
        height: 100%
        background: #fff
        flex: 1
        img
          height: .23rem
          padding-left: .1rem
        .p1
          padding-top: .4rem
          line-height: .5rem
        .p2
          padding-top: .06rem
          line-height: .34rem
        .p3
          padding-top: .86rem
          line-height: .6rem
        .p4
          padding: 0
          padding-top: .04rem
          line-height: .34rem
        .p5
          padding-top: .48rem
          line-height: .44rem
        .p6
          padding-top: .08rem
          line-height: .34rem
</style>
