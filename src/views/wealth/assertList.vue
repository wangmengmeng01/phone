<template>
  <div class="wealthMyAssert">
    <div class="wealthMATop" v-show="invesProperty.res.length">
      <div class="wealthMATopB">
        <div class="wealthMATopBL">
          我的资产
        </div>
        <div class="wealthMATopT">合计{{invesProperty.res.totalAmount | formatNum}}元</div>

      </div>
      <ul class="wealthMyObject">
        <li v-for="(i) in invesProperty.res">
          <div class="wealthMyObjectT">
            <div class="wealthMyObjectTT">{{i.borrowName}} </div>
            <div class="wealthMyObjectTC">{{i.cashStatus=='4'?'已到期':'持有中'}}</div>
            <div class="wealthMyObjectTB" @click="$go('/wealth/productDetail',{bidNo:i.borrowNo,backTitle:'资产详情',cashNo:i.cashNo,bidType:i.borrowType})">查看</div>
          </div>
          <div class="wealthMyObjectC">
            <div class="wealthMyObjectCL">
              <span>持有金额</span>
              <em class="bigAmount">{{i.initCashAmount | formatNum
                }}</em>
            </div>
            <div class="wealthMyObjectCR">
              <span>昨日收益</span>
              <em>+{{i.yesterdayAmount | formatNum
                }}</em>
            </div>
          </div>
          <div class="wealthMyObjectB">
            <div class="wealthMyObjectBL">
              <span>到期天数</span>
              <i>{{i.interestEndDate}}天</i>
            </div>
            <div class="wealthMyObjectBR">
              <span>持有收益</span>
              <em>+{{i.holdAmount | formatNum
                }}</em>
            </div>
          </div>
        </li>
      </ul>
    </div>
    
     <div class="joinListDiv1" v-show="!invesProperty.res.length" style="background-color: #f1f1f9;">
			<img src="../../assets/main/prod/norecord.png" />
			<p class="noRecord">暂无记录</p>
	</div>
    
    
  </div>
</template>

<script>
  import { invesProperty } from '@/service'
  export default {
    name: 'changeBank',
    data() {
      return{
        invesProperty:{
          data:{
            bidType: '2',
            status: '1',
            pageNum: '1'
          },
          res:[]
        },
        totalPage:0,
      }
    },
    created() {
      this.init()
    },
     mounted() {
		window.scroll(0, 0);
		document.body.onscroll = () => {
			if(document.documentElement.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
				this.invesProperty.data.pageNum++;
				if(this.invesProperty.data.pageNum > this.totalPage) {
					return;
				}
				this.init();
			}
		}

	},
    methods: {
      init(){
        invesProperty(this.invesProperty.data).then(res=>{
          console.log(res)
          this.invesProperty.res = this.invesProperty.res.concat(res.dataList);
          this.totalPage = Math.ceil(res.totalNum / 10);
        });
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" scoped>
  i,em{font-style: normal;}
  .hide{
    display: none;
  }

  .wealthMyAssert
    padding 0 0.4rem
    margin 0.4rem 0.2rem 0
    background:rgba(255,255,255,1);
    box-shadow: 0px 5px 12px 0px rgba(219,219,219,0.5), 5px 0px 4px 0px rgba(219,219,219,0.5)
    border-radius: 0.2rem;
    .wealthMATopB
      display flex
      color #121212
      font-size 0.52rem
      justify-content space-between
      padding-top 0.6rem
      .wealthMATopT
        font-size 0.28rem
        color #8D8D94
        line-height 0.52rem

  .wealthMyObject
    li
      border-bottom 1px solid #CDCED3
      padding 0 0 0.34rem 0
    .wealthMyObjectT
      display: flex
      justify-content space-between
      padding 0.62rem 0 0.58rem 0
      .wealthMyObjectTT
        font-size 0.4rem
        color #181818
        line-height 0.56rem
        span
          font-size 0.28rem
      .wealthMyObjectTC
        width:0.8rem;
        height:0.28rem;
        border-radius: 4px ;
        font-size:0.2rem;
        color:rgba(244,31,31,1);
        line-height:0.28rem;
        border 1px solid #F41F1F
        text-align center
        margin 0.14rem 0
      .wealthMyObjectTB
        width:1.32rem;
        height:0.52rem;
        background:rgba(240,240,248,1);
        border-radius: 0.32rem;
        color #3299D1
        font-size 0.28rem
        text-align center
        line-height 0.52rem

    .wealthMyObjectC,.wealthMyObjectB
      display flex
      justify-content space-between
      color #3F4040
      font-size 0.2rem
      div
        flex 1
        padding 0 0 0.22rem 0
        span
          color #121212
        i
          font-size 0.24rem
          color #121212
        .bigAmount
          color #121212
          font-size 0.36rem
        &:nth-child(2)
          text-align right
          em
            font-size 0.28rem
            color #F41F1F
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
