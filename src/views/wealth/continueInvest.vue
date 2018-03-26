<template>
  <div class="continueInvest">
    <div class="CITop">
      为我的资产开启自动续期 <br/> 到期后本金将自动购买同款产品 <br> 避免资金闲置而损失收益
    </div>
    <ul class="CTCWrap" v-show="list.length">
      <li v-for="(i,index) in list">
        <div class="CTCtop">
          <div class="CTCTleft">{{i.bidName}}</div>
          <div class="OOWrap">
            <div class="OOButton" :class="[i.continueFlag==1?'on':'']" @click="submit(i.investId,i.continueFlag,index)">{{i.continueFlag==1?'开':'关'}}</div>
          </div>
        </div>
        <div class="CTCBottom">
          <div>续投金额{{i.investAmount|formatNum}}元</div>
          <div>预计续期时间 {{i.investDueDate}}</div>
        </div>
      </li>
    </ul>
  
    <div class="joinListDiv1" v-show="!list.length" style="background-color: #f1f1f9;">
      <img src="../../assets/main/prod/norecord.png" />
      <p class="noRecord">暂无记录</p>
    </div>
  </div>
</template>

<script>
  import {
    getUserEarningsDetail,
    continueOpenOperator
  } from '@/service'
  export default {
    name: 'continueInvest',
    data() {
      return {
        autoRenewBol: true, //自动续费
        item: {
          pageIndex: 1, //续投列表分页
        },
        totalPage: 0,
        list: [], //购买记录
  
      }
    },
    created() {
      this.init();
    },
    mounted() {
      window.scroll(0, 0);
      document.body.onscroll = () => {
        if ((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
          this.item.pageIndex++;
          if (this.item.pageIndex > this.totalPage) {
            return;
          }
          this.init();
        }
      }
  
    },
    methods: {
      init() {
        getUserEarningsDetail(this.item).then(res => {
          console.log(res);
          this.list = this.list.concat(res.list);
          this.totalPage = Math.ceil(res.totalCount / 10);
        });
      },
      submit(a, b, c) {
        if (b == 1) {
          b = 2;
        } else {
          b = 1;
        }
  
        continueOpenOperator({
          investId: a,
          isContinue: b,
        }).then(res => {
  
          if (res.isContinue == 1) {
            this.list[c].continueFlag = 1;
          } else {
            this.list[c].continueFlag = 2;
          }
  
        });
  
        //				
      }
    },
    watch: {}
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

.joinListDiv1 {
	float: left;
	width: 7.5rem;
	overflow: hidden;
}

.joinListDiv1>img {
	margin: 1.14rem 1.74rem 0.5rem;
	width: 4.02rem;
	height: 4.1rem;
	background-size: 100% 100%;
} 
.noRecord {
		text-align: center;
		font-size: 0.28rem;
		color: #8D8D94;
	}
</style>
