<template>
  <div class="home">
      <!-- 公告 -->        
  <div class="indexNotice center">
    <img :src="require('@/assets/main/home/NEW@2x.png')" alt="">
    <p class="indexNoticeP">公告ABC123公告ABC123…</p>
  </div>
  <!--关于我们 安全保障 运营数据 理财师加盟-->
  <div class="indexMessage center">
      <div class="indexMessageTip">
        <p class="aboutUs">
          <img :src="require('@/assets/main/home/jrwm.png')" alt="">
        </p>
        <p>关于我们</p>
      </div>
      <div class="indexMessageTip">
         <p class="safety">
            <img :src="require('@/assets/main/home/aqbz.png')" alt="">
         </p>
         <p>安全保障</p>
      </div>
      <div class="indexMessageTip">
         <p class="operationaData">
            <img :src="require('@/assets/main/home/yysj.png')" alt="">
         </p>
         <p>运营数据</p>
      </div>
      <div class="indexMessageTip">
        <p class="jionFinancial">
           <img :src="require('@/assets/main/home/jm.png')" alt="">
        </p>
        <p>理财师加盟</p>
      </div>
  </div>
  <!-- 新手专享 -->
  <div class="new">
      <p class="newTitle">新手专享</p>
      <p class="newBidName">新手宝-金色人生</p>
      <p class="newBidRate">12.18%</p>
      <p class="newBidRate2">年化收益率</p>
      <p class="newBidword">
        <span>锁定期限<i>1</i>个月</span>
        <span>剩余不到<i>6</i>万元</span>
        <span><i>1000</i>元起投</span>
      </p>
      <p class="newBtn">立即投资</p>
  </div>
  <!-- 为您推荐 -->
  <div class="recommend">
    <p class="recommendTip">最新热标</p>
    <p class="recommendTitle">为您推荐 <span>更多热标</span></p>
    <!--周周赢  -->
    <div class="recommendDiv recommendDiv1">

    </div>
    <!-- 月月赢 -->
    <div class="recommendDiv recommendDiv2">

    </div>
    <!-- 赢计划 -->
    <div class="recommendDiv recommendDiv3">

    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
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

<style scoped>

.swiper-pagination-bullet{
  width: 10px;
  height: 10px;
}


p{
  margin: 0 auto;
  padding: 0;
  font-size: 0.2rem;
}
.center{
 margin: 0 auto;
 padding: 0;
 text-align: center;
}
/*banner轮播*/
.indexSwiper {
  margin: 0 0.01rem;
  width: 7.48rem;
  height: 3.9rem;
  /* background-color:rgb(202, 35, 91); */
}
.swiper-container {
  width: 7.5rem;
  height: 3.9rem;
  overflow: hidden;
}
.swiper-wrapper {
  width: 22.5rem;
  height: 3.9rem;
}
.swiper-slide {
  float: left;
  width: 7.5rem;
  height: 100%;
  text-align: center;
  font-size: 18px;
  background: rgb(12, 185, 142);
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide>img{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
 .swiper-pagination-bullet,.fff {
  width:0.2rem;
  height: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
  font-size:0.12rem;
  color:red;
  opacity: 1;
  background: rgba(0,0,0,0.2);
  margin: 0 0.5rem;
}
.swiper-pagination-bullet-active {
  color:#ffffff;
  background: #007aff;
}
/* 公告 */
.indexNotice{
  width: 7.5rem;
  height: 0.84rem;
  background-color: #ffffff;
  overflow: hidden;
}
.indexNotice>img{
  float: left;
  width: 0.8rem;
  height: 0.4rem;
  box-sizing: 100% 100%;
  margin: 0.22rem 0.2rem 0.22rem 0.4rem;
}
.indexNoticeP{
  float: left;
  color: #3EB7F9;
  margin: 0.22rem 0;
  width: 4rem;
  height: 0.4rem;
  font-size: 0.28rem;
  line-height: 0.4rem;
  text-align: left;
}

/* 关于我们 运营数据 */
.indexMessage{
  width: 7.5rem;
  height: 2.34rem;
  overflow: hidden;
}
.indexMessageTip{
  float: left;
  width: 1.875rem;
  height: 2.34rem;
}
.indexMessageTip p{
  margin: 0 auto;
  padding: 0;
}
.indexMessageTip>p:nth-child(1){
  width: 0.68rem;
  height: 0.68rem;
  margin: 0.42rem 0.5875rem 0.1rem ;
}
.indexMessageTip>p:nth-child(2){
  width: 1.875rem;
  height: 0.28rem;
  line-height: 0.28rem;
  font-size: 0.2rem;
  color: #5D5D5D;
  text-align: center;
}
.aboutUs>img{
  float: left;
  margin: 0.02rem 0.1rem;
  width: 0.48rem;
  height: 0.64rem;
  background-size: 100% 100%;
}
.safety>img{
  float: left;
  margin: 0.04rem 0.1rem;
  width: 0.48rem;
  height: 0.60rem;
  background-size: 100% 100%;
}
.operationaData>img{
  float: left;
  margin: 0.05rem 0.07rem;
  width: 0.54rem;
  height: 0.58rem;
  background-size: 100% 100%; 
}
.jionFinancial>img{
  float: left;
  margin: 0.01rem 0.14rem;
  width: 0.44rem;
  height: 0.66rem;
  background-size: 100% 100%; 
}
/* 新手专享 */
.new{
  margin: 0 auto;
  padding: 0;
  text-align: center;
  width: 7.1rem;
  height: 6.6rem;
  background-color: #fff;
  border-radius: 0.2rem;
  overflow: hidden;
   /*background:url("../assets/main/whiteBg.png");*/
   background-size: 100% 100%;
}
.newTitle{
  float: left;
  margin: 0.3rem 0 0.64rem 0.42rem;
  width: 6.68rem;
  height: 0.66rem;
  font-size: 0.48rem;
  line-height: 0.48rem;
  color: #181818;
  text-align: left;
}
.newBidName{
  float: left;
  width: 7.1rem;
  height: 0.44rem;
  font-size: 0.32rem;
  line-height: 0.44rem;
  color: #181818;
  margin-bottom: 0.1rem;
}
.newBidRate{
  float: left;
  width: 7.1rem;
  height: 0.96rem;
  font-size: 0.76rem;
  line-height: 0.96rem;
  color: #F84740;
  text-align: center;
}
.newBidRate2{
  float: left;
  width: 7rem;
  height: 0.28rem;
  line-height: 0.28rem;
  color: #999999;
  font-size: 0.2rem;
  margin-bottom: 0.47rem;
}
.newBidword{
  float: left;
  width: 7.1rem;
  height: 0.54rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  color: #8D8D94;
  text-align: center;
}
.newBidword i{
  font-size: 0.36rem;
  color: #121212;
  font-style:normal;
}
.newBidword>span:nth-child(2){
  margin: 0 0.28rem;
}
.newBtn{
  float: left;
  margin: 0.5rem 0.69rem;
  width: 5.72rem;
  height: 0.68rem;
  background-color: #3299D1;
  line-height: 0.68rem;
  border-radius: 0.08rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.32rem;
}
/* 为您推荐 */
.recommend{
  margin: 0 auto;
  padding: 0;
  text-align: center;
  width: 7.1rem;
  height: 15.42rem;
  background-color: #fff;
  border-radius: 0.2rem;
  overflow: hidden;
  margin-top: 1.0rem;
}
.recommendTip{
  margin: 0.66rem  0 0.04rem 0.4rem;
  width: 6.7rem;
  height: 0.4rem;
  font-size: 0.28rem;
  text-align: left;
  line-height: 0.4rem;
  color: #8D8D94;
}
.recommendTitle{
  margin: 0 0.4rem 0.36rem 0.36rem;
  width: 6.34rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: left; 
  color:#181818;
  font-size: 0.48rem;
  overflow: hidden;
}
.recommendTitle>span{
  float: right;
  font-size: 0.28rem;
  color: #3299D1;
}
.recommendDiv{
  margin: 0.6rem  0.4rem 0 ;
  width: 6.3rem;
  height: 3.52rem;
}
.recommendDiv1{
   background:url("../../assets/main/home/yellowBg.png");
   width: 6.3rem;
   height: 3.52rem ;
   background-size: 100% 100%;
}
.recommendDiv2{
   background:url("../../assets/main/home/redBg.png");
   width: 6.3rem;
   height: 3.52rem ;
   background-size: 100% 100%;
}
.recommendDiv3{
   background:url("../../assets/main/home/blueBg.png");
   width: 6.3rem;
   height: 3.52rem ;
   background-size: 100% 100%;
}
</style>
