<template>
  <div class="claims">
    <ul v-show="list.length">
      <li v-for="(i,index) in list" class="item flex">
        <div class="left">
          <div class="top">
            <img src="../../assets/wealth/wealth/zq.png" alt="" class="icon">
            <h2 class="color_font f28">债券ID {{i.id}}</h2>
            <p class="color_font-s f24">{{i.matchDate}} 购入</p>
          </div>
          <div class="bottom">
            <h2 class="color_font f28">{{i.deptGrade}}</h2>
            <p class="color_font-s f24">债权评级</p>
          </div>
        </div>
        <div class="right">
          <p class="p1 flex color_font f36"><span>{{i.currValue|formatNum}}</span><span>{{i.deptProportion|tofixed2}}%</span></p>
          <p class="p2 flex color_font-s f24"><span>债权价值(元)</span><span>占资产金额比重</span></p>
          <p class="p3 f40 color_main">{{i.borrowName}}</p>
          <!--<p class="p4 color_font-s f24">对应借款项目<img src="../../assets/common/arrow-right.png" alt=""></p>-->
          <p class="p5 flex color_font f36"><span>{{i.borrowAmount|formatNum}}</span><span>正常</span></p>
          <p class="p6 flex color_font-s f24"><span>募集总额(元)</span><span>还款状态</span></p>
        </div>
      </li>
    </ul>
  
    <div class="joinListDiv1" v-show="!list.length" style="background-color: #f1f1f9;float: left;width: 7.5rem;overflow: hidden;">
      <img style="margin: 1.14rem 1.74rem 0.5rem;width: 4.02rem;height: 4.1rem;background-size: 100% 100%;" src="../../assets/main/prod/norecord.png" />
      <p class="noRecord" style="text-align: center;font-size: 0.28rem;color: #8D8D94;margin-bottom: 1.0rem;">暂无记录</p>
    </div>
  
  
  </div>
</template>

<script>
  import {
    serchDebtHoldedRecord
  } from '@/service'
  export default {
    name: 'claims',
    data() {
      return {
        item: {
          cashNo: '',
          pageNum: 1,
        },
        list: [],
        totalPage: 0,
      }
    },
    created() {
      this.item.cashNo = this.$route.query.cashNo;
      this.init();
  
  
  
    },
    mounted() {
      window.scroll(0, 0);
      document.body.onscroll = () => {
  
        if ((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
  
          this.item.pageNum++;
          if (this.item.pageNum > this.totalPage) {
            return;
          }
          this.init();
  
        }
      }
  
    },
    methods: {
      init() {
        serchDebtHoldedRecord(this.item).then(res => {
          this.list = this.list.concat(res.deptHoldedList);
          this.totalPage = Math.ceil(res.totalNum / 10);
        });
      }
    },
    watch: {}
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
