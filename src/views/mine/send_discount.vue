<template>
  <div class="send_discount">
  	
  	
    <!--<div class="customer p4 center">
      <h2 class="title f32 color_font">送给这位客户</h2>
      <img src="/" alt="" class="place-img">
      <p class="name center f28 color_font-s">{{coupon.params.realName}}</p>
    </div>
    
    
    <div class="send p4">
      <h2 class="title f32 color_font flex">送他(她)什么好呢 <span class="f24 color_font-s">可选一个或多个优惠</span></h2>
      <Coupon v-for="(i,index) in coupon.data" :data="i" :key="index" class="item act" close="true" @closeCb="close(i)" />
      <div class="item none" @click="choose">
        <img src="../../assets/coupon/none.png" alt="">
      </div>
    </div>-->
    <div class="send_discount-top f28">
   	 	<span>送给客户</span>
   	 	<span class="color_font-36"  > <i style="font-style: inherit;"  v-show="coupon.params.realName != null ||coupon.params.realName!= undefined" >{{coupon.params.realName|nameDesensitization}}</i>{{coupon.params.mobile|desensitization}}</span>
    </div>
    <div class="send_discount-gift">
    		<p class="f28 color_font-36">送Ta礼物<i>(可送多个优惠)</i></p>
    		 <Coupon v-for="(i,index) in coupon.data" :data="i" :key="index" class="item act" close="true" @closeCb="close(i)" />
    		<div class="send_discount-gift-add" @click="choose">
    			<img src="../../assets/main/mine/yhadd.png"/>
    		</div>
    </div>
    
    
    
    <button class="send_discount-btn send_discount-button" :class="[!coupon.data.length?'dis':'']" @click="submit">赠送</button>
    
    
    
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import {
    saveGiveCoupon
  } from '@/service'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: 'send_discount',
    computed: {
      ...mapGetters([
        'coupon'
      ])
    },
    components: {
      Coupon,
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_COUPON',
        'DEL_COUPON',
        'SET_SUCC_PAGE'
      ]),
      choose() {
        this.SET_COUPON({
          backurl: this.$route.path
        });
        this.$go('/coupon/choose_usable',{rollType:1})
      },
      close(data) {
        this.DEL_COUPON(data);
      },
      submit() {
        saveGiveCoupon({
          giveUserCode: this.coupon.params.userCode,
          receiveNoList: this.coupon.receiveNoList
        }).then(() => {
          this.RESET('coupon');
          this.SET_SUCC_PAGE({
            "title": "赠送客户优惠成功",
            "sub_title": "优惠已存入客户为的优惠中",
            "btn_text": "继续赠送其他客户",
            "backurl": "/mine"
          });
          this.$go('/static/succ');
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .send_discount{
  	margin: 0 auto;
  	padding: 0;
  	width: 7.5rem;
  	padding-bottom: 1.3rem;
  	&-button{
  		border: none;
  	}
  	&-top{
  		margin: 0 .3rem;
  		width: 6.9rem;
  		height: .86rem;
  		line-height: .86rem;
  		display: flex;
  		justify-content: space-between;
  		color: #666666;
  		border-bottom: 1px solid #E5E5E5;
  	}
  	&-gift{
  		margin: 0 .3rem;
  		width: 6.9rem;
  		p{
  			margin: .69rem 0 .4rem;
  			line-height: .28rem;
  			i{
  				color:  #999999;
  				font-style: inherit;
  			}
  		}
  		.item{
  			margin: .4rem 0;
  		}
  		&-add{
  			width: 6.9rem;
  			height: 2.84rem;
  			background: #FFFFFF;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.06);
			border-radius: 6px;
			display: flex;
			align-items:center;
			justify-content:center;
			img{
				width: .96rem;
				height: .96rem;
				background-size: 100% 100%;
			}
  		}
  	}
  	&-btn{
  		position: fixed;
  		z-index: 100;
  		left: 0;
  		right: 0;
  		bottom: 0;
  		width: 7.5rem;
  		height: 1.0rem;
  		line-height: 1.0rem;
  		text-align: center;
  		color: #FFFFFF;
  		background: #208AFF;
  		font-size: .32rem; 
  	}
  	.dis{
  		background: #E1E1E1;
  		pointer-events: none;
  	}
  }
   
</style>
