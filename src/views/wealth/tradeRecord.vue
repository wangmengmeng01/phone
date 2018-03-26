<template>
  <div class="tradeRecord">
    <ul class="tradeRecordContent" v-show="list.length">
      <li v-for="(i,index) in list">
        <div class="top">
          <div>{{i.typeName}}</div>
          <div>{{i.optype|optype}}{{i.operationAmount|formatNum}}</div>
        </div>
        <div class="bottom">
          <div>{{i.createTime}}</div>
          <div>可用余额 {{i.availableAmountAfter|formatNum}}</div>
        </div>
      </li>
    </ul>
    <!--<div class="tradeRecordFooter">上拉加载更多…</div>-->
  
    <div class="joinListDiv1" v-show="!list.length" style="background-color: #f1f1f9;">
      <img src="../../assets/main/prod/norecord.png" />
      <p class="noRecord">暂无记录</p>
    </div>
  
  
  </div>
</template>

<script>
  import {
    transactionRecord
  } from '@/service'
  export default {
    name: 'tradeRecord',
    data() {
      return {
        item: {
          type: '0',
          pageIndex: 1,
        },
        list: [],
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
  
        transactionRecord(this.item).then(res => {
          console.log(res);
          this.list = this.list.concat(res.dataList);
          this.totalPage = Math.ceil(res.total / 10);
        });
  
  
      }
    },
    watch: {}
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
