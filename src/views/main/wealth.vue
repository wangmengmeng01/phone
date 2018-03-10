<template>
  <div class="wealth">
    <div class="wealthTop">
      <p>财富</p>
      <div class="wealthA">
        <span>总金额(元)</span>
        <img src="../../assets/wealth/wealth/tips.png">
        <div class="status">已开通存管账户</div>
        <div class="amount">0.00</div>
      </div>
      <div class="wealthEarn">
        <div class="yesterE">
          <div>昨日收益(元)</div>
          <div class="wealthEarnData">0.00</div>
        </div>
        <div class="totalE">
          <div>累计收益(元)</div>
          <div class="wealthEarnData">0.00</div>
        </div>
        <div class="avalibleE">
          <div>可用余额(元)</div>
          <div class="wealthEarnData">0.00</div>
        </div>
      </div>
    </div>
    <div class="RWWrap">
      <div class="withdraw" @click="$go('/webapp/wealth/withdraw')"><img src="../../assets/wealth/wealth/withdraw.png" alt="">提现</div>
      <div class="recharge" @click="$go('/webapp/wealth/recharge')"><img src="../../assets/wealth/wealth/recharge.png" alt="">充值</div>
    </div>
    <ul class="wealthContent">
      <li v-for="i in menu" @click="linkto(i.url)">
        <img :src="require(`@/assets/wealth/wealth/${i.icon}.png`)" alt="" class="icon">
        <div class="wealthCName">{{i.name}}</div>
      </li>
    </ul>
    <!-- 我的资产 -->
    <div class="wealthMyAssert">
      <div class="wealthMATop">
        <div class="wealthMATopT">0.00元</div>
        <div class="wealthMATopB">
          <div class="wealthMATopBL">
            我的资产
          </div>
          <div class="wealthMATopBR">
            更多 <img src="../../assets/common/arrow-right.png" alt="">
          </div>
        </div>
        <ul class="wealthMyObject">
          <li>
            <div class="wealthMyObjectT">
              <div class="wealthMyObjectTT">月月赢 <span>-12M500G号</span></div>
              <div class="wealthMyObjectTC">持有中</div>
              <div class="wealthMyObjectTB">查看</div>
            </div>
            <div class="wealthMyObjectC">
              <div class="wealthMyObjectCL">
                <span>持有金额</span>
                <em class="bigAmount">0.00</em>
              </div>
              <div class="wealthMyObjectCR">
                <span>昨日收益</span>
                <em>+10.00</em>
              </div>
            </div>
            <div class="wealthMyObjectB">
              <div class="wealthMyObjectBL">
                <span>到期天数</span>
                <i>42天</i>
              </div>
              <div class="wealthMyObjectBR">
                <span>持有收益</span>
                <em>+460.00</em>
              </div>
            </div>
          </li>
          <li>
            <div class="wealthMyObjectT">
              <div class="wealthMyObjectTT">月月赢 <span>-12M500G号</span></div>
              <div class="wealthMyObjectTC">持有中</div>
              <div class="wealthMyObjectTB">查看</div>
            </div>
            <div class="wealthMyObjectC">
              <div class="wealthMyObjectCL">
                <span>持有金额</span>
                <em class="bigAmount">0.00</em>
              </div>
              <div class="wealthMyObjectCR">
                <span>昨日收益</span>
                <em>+10.00</em>
              </div>
            </div>
            <div class="wealthMyObjectB">
              <div class="wealthMyObjectBL">
                <span>到期天数</span>
                <i>42天</i>
              </div>
              <div class="wealthMyObjectBR">
                <span>持有收益</span>
                <em>+460.00</em>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 为您推荐 -->
    <div class="recommend">
      <p class="recommendTip">最新热标</p>
      <p class="recommendTitle">为您推荐 <span>更多 <img src="../../assets/main/home/nextIcon.png"/></span></p>
      <!--周周赢  -->
      <div class="recommendDiv recommendDiv1">
        <img src="../../assets/main/home/bkImg.png" />
        <p class="recommendDivTitle f48">周周赢</p>
        <p class="recommendDivRate f100">10%</p>
        <p class="recommendDivWord">历史年化收益率</p>
        <div class="recommendDivBleft">
          <p>1000元起投</p>
          <p>锁定28天</p>
        </div>
        <div class="recommendDivButton">投资</div>
      </div>
      <!-- 月月赢 -->
      <div class="recommendDiv recommendDiv2">
        <img src="../../assets/main/home/bkImg.png" />
        <p class="recommendDivTitle">周周赢</p>
        <p class="recommendDivRate">10%</p>
        <p class="recommendDivWord">历史年化收益率</p>
        <div class="recommendDivBleft">
          <p>1000元起投</p>
          <p>锁定28天</p>
        </div>
        <div class="recommendDivButton">投资</div>
      </div>
      <!-- 赢计划 -->
      <div class="recommendDiv recommendDiv3">
        <img src="../../assets/main/home/bkImg.png" />
        <p class="recommendDivTitle">周周赢</p>
        <p class="recommendDivRate">10%</p>
        <p class="recommendDivWord">历史年化收益率</p>
        <div class="recommendDivBleft">
          <p>1000元起投</p>
          <p>锁定28天</p>
        </div>
        <div class="recommendDivButton">投资</div>
      </div>
    </div>

  </div>
</template>

<script>
  import { wealthIndex } from '@/service'
  export default {
    name: 'wealth',
    data() {
    return {
      menu:[
        {
          icon: 'wtradeP',
          name: '改交易密码',
          url: ''
        },
        {
          icon: 'wEarn',
          name: '收益明细',
          url: ''
        },
        {
          icon: "wcontinue",
          name: '我的续投',
          url: ''
        },
        {
          icon: 'wchangeBank',
          name: '换绑银行卡',
          url: ''
        },
        {
          icon: 'wtradeRecord',
          name: '交易记录',
          url: ''
        },
        {
          icon: 'wmyConpun',
          name: '我的优惠',
          url: ''
        },
        {
          icon: 'wautoin',
          name: '自动投标',
          url: 'autoInvest'
        },
        {
          icon: 'wrisktest',
          name: '风险测评',
          url: 'riskTest'
        },
        {
          icon: 'wmyPoint',
          name: '我的积分',
          url: ''
        }
      ]
    }
  },
  created() {
      this.init()
  },
  methods: {
    linkto(url){
      this.$go(`/webapp/wealth/${url}`)
    },
    init(){
      wealthIndex().then(res=>{
        this.res =res;
        console.log(res)
      });
    }
  },
  watch: {
  }
  }
</script>

<style lang="stylus" scoped>
  i,em{font-style: normal;}
  //背景函数
  bg(n)
    background  url("../../assets/wealth/wealth/"+n) no-repeat
    background-size 100% 100%
  //圆角兼容
  border-radius(n)
    -webkit-border-radius n
    -moz-border-radius n
    -o-border-radius n
    -ms-border-radius n
    border-radius n

  .wealthTop
    width 100%
    height 5.02rem
    bg "blueBG.png"
    p
      text-align center
      font-size 0.36rem
      color #FFFFFF
      padding-top 1.08rem
    .wealthA
      color #ffffff
      font-size 0.28rem
      text-align center
      margin-top 0.52rem
      position relative
      img
        width 0.32rem
        height 0.32rem
        position absolute
        left 58%
        top -0.24rem
      .status
        font-size:0.24rem;
        line-height:0.5rem;
        width 1.8rem
        height 0.5rem
        bg "openCG.png"
        position absolute
        right 0
        top -0.1rem
      .amount
        font-size 0.76rem
        line-height 0.86rem
        margin-top 0.06rem

  .wealthEarn
    width 100%
    display flex
    font-size 0.24rem
    color #ffffff
    margin-top 0.64rem
    >div
      flex 1
      text-align center
      line-height 0.3rem
      .wealthEarnData
        font-size 0.28rem
        line-height 0.4rem
  .RWWrap
    font-size 0.36rem
    color #3299D1
    display flex
    justify-content space-between
    padding 0.4rem 0.58rem
    >div
      width:2.6rem;
      height:0.96rem;
      background:rgba(255,255,255,1);
      border-radius: 0.2rem ;
      text-align center
      line-height 0.96rem
      img
        vertical-align middle
        margin -0.05rem 0.18rem 0 0

  .wealthContent
    height:6rem;
    background:rgba(255,255,255,1);
    border-radius: 0.2rem;
    margin:0 0.2rem;
    color #121212
    font-size 0.32rem
    flex-wrap wrap
    display flex
    li
      flex 33.3%
      text-align center
      img
        margin 0.56rem 0 0.16rem 0

  .wealthMyAssert
    overflow hidden
    padding 0 0.4rem
    margin 1rem 0.2rem 0
    height:8.42rem;
    background:rgba(255,255,255,1);
    box-shadow: 0px 5px 12px 0px rgba(219,219,219,0.5), 5px 0px 4px 0px rgba(219,219,219,0.5)
    border-radius: 0.2rem;
    .wealthMATopT
      font-size 0.28rem
      color #8D8D94
      margin 0.52rem 0 0.14rem 0
    .wealthMATopB
      display flex
      color #121212
      font-size 0.52rem
      div
        flex 1
        justify-content space-between
      .wealthMATopBR
        text-align right
        color #399DD3
        font-size 0.32rem
        line-height 0.52rem
        img
          vertical-align middle
          margin-top -0.05rem

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

  /* 为您推荐 */

  .recommend {
    margin: 0 auto;
    padding: 0;
    text-align: center;
    width: 7.1rem;
    height: 15.42rem;
    background-color: #fff;
    border-radius: 0.2rem;
    overflow: hidden;
    margin-top: 1rem;
  }

  .recommendTip {
    margin: 0.66rem 0 0.04rem 0.4rem;
    width: 6.7rem;
    height: 0.4rem;
    font-size: 0.28rem;
    text-align: left;
    line-height: 0.4rem;
    color: #8d8d94;
  }

  .recommendTitle {
    margin: 0 0.4rem 0 0.36rem;
    width: 6.34rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: left;
    color: #181818;
    font-size: 0.48rem;
    overflow: hidden;
  }

  .recommendTitle>span {
    float: right;
    font-size: 0.28rem;
    color: #3299d1;
    overflow: hidden;
  }

  .recommendTitle span>img {
    float: right;
    margin: 0.12rem;
    width: 0.2rem;
    height: 0.36rem;
  }

  .recommendDiv {
    margin: 0.6rem 0.4rem 0;
    width: 6.3rem;
    height: 3.52rem;
    overflow: hidden;
    color: #ffffff;
  }

  .recommendDiv1 {
    background: url("../../assets/main/home/yellowBg.png");
    width: 6.3rem;
    height: 3.52rem;
    background-size: 100% 100%;
  }

  .recommendDiv2 {
    background: url("../../assets/main/home/redBg.png");
    width: 6.3rem;
    height: 3.52rem;
    background-size: 100% 100%;
  }

  .recommendDiv3 {
    background: url("../../assets/main/home/blueBg.png");
    width: 6.3rem;
    height: 3.52rem;
    background-size: 100% 100%;
  }

  .recommendDiv>img {
    float: right;
    width: 1.02rem;
    height: 1.02rem;
    background-size: 100%;
  }

  .recommendDivTitle {
    float: left;
    margin: 0.20rem 0 0 0.42rem;
    height: 0.66rem;
    line-height: 0.66rem;
    font-size: 0.48rem;
    width: 2.0rem;
    text-align: left;
  }

  .recommendDivRate {
    float: left;
    margin-top: 0.12rem;
    width: 6.3rem;
    height: 1.0rem;
    line-height: 1.0rem;
    font-size: 1.0rem;
    text-align: center;
  }

  .recommendDivWord {
    float: left;
    width: 6.3rem;
    margin-top: 0.04rem;
    height: 0.24em;
    line-height: 0.24rem;
    font-size: 0.24rem;
    text-align: center;
  }

  .recommendDivBleft {
    margin: 0.26rem 0 0 0.42rem;
    float: left;
    height: 0.8rem;
    width: 3.5rem;
    text-align: left;
  }

  .recommendDivBleft>p:nth-child(1) {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.28rem;
  }

  .recommendDivBleft>p:nth-child(2) {
    margin-top: 0.05rem;
    height: 0.34rem;
    line-height: 0.34rem;
    font-size: 0.24rem;
  }

  .recommendDivButton {
    margin: 0.4rem 0.42rem 0 0;
    float: right;
    width: 1.32rem;
    height: 0.52rem;
    line-height: 0.52rem;
    text-align: center;
    font-size: 0.28rem;
    color: #3299D1;
    background-color: #F0F0F8;
    border-radius: 0.28rem;
  }



</style>

