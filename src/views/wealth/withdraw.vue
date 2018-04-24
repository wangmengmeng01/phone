<template>
  <div class="withdraw pageCenter">
    <div class="withdraw-bank">
    		<p class="f28 p1"> <img class="logo" :src="require(`../../assets/wealth/whiteLogo/${bankNo}.png`)" /> <span>{{cardMes.bankName}}</span> <img class="img1" src="../../assets/wealth/kjzf.png"/></p>
    		<p class="f48 p2 center">{{cardMes.bankCardNo|hideBankNum}}</p>
    </div>
    <p class="withdraw-tips f28">预计到账时间<i>T+1</i>工作日，节假日顺延<br />(该时间为平台预估时间，具体以实际到账时间为准)</p>
    
    <p class="withdraw-div borderB f28 color_font-36">
    		<span class="withdraw-div-s1">可提现金额(元)</span>
    		<span class="withdraw-div-s2">{{accountMes.canWithdrawAmount|formatNum}}</span>
    </p>
    <p class="withdraw-div borderB f28 color_font-36">
    		<span class="withdraw-div-s1">提现金额(元)</span>
    		<input type="tel" class="withdraw-div-s2 f28 input" name="" id=""  @blur="onblur" oninput="if( ! /^-?\d+\.?\d{0,2}$/.test(this.value)){ var s = this.value;this.value=s.substring(0,s.length-1);}" v-model="withdrawMoney" placeholder="请输入提现金额" />
    		<span class="withdraw-div-s3"  @click="wall">全提</span>
    </p>
     <p class="withdraw-div borderB f28 color_font-36">
    		<span class="withdraw-div-s1">手续费(元)</span>
    		<span class="withdraw-div-s2">{{userCashFeeMoney|formatNum}}</span>
    </p>
     <p class="withdraw-div borderB f28 color_font-36">
    		<span class="withdraw-div-s1">实际到账(元)</span>
    		<span class="withdraw-div-s2">{{actualccountMoney|formatNum}}</span>
    </p>
    
    
    <button class="btn withdraw-btn"  :class="[(withdrawMoney.length || withdrawBol) ?'':'dis']" @click="toCash">提现</button>
  </div>
</template>

<script>
  import {
    selectBeforeRecharge,
    accountAcmountInfo,
    userCashFee,
    toCash
  } from '@/service'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'withdraw',
    data() {
      return {
      	bankNo:100,
        cardMes: {}, //银行卡信息
        accountMes: {}, //账户金额
        accountMoney: 0||0.0, //可提现金额
        withdrawMoney: '', //提现金额
        withdrawBol: false, //是否全选
        userCashFeeMoney: 0 || 0.0, //提现手续费
        actualccountMoney: 0, //实际到账回调地址
        retUrl: location.origin + location.pathname, //返回地址
        formItem: '',
  
      }
    },
    created() {
      if (this.$route.query.isfromhuifu) {
        // 开始清楚成功页面的缓存
        this.RESET('succ_page');
        this.SET_SUCC_PAGE({
          "title": "提现已发起",
          'sub_title': "系统已收到您所发起的提现，将尽快处理",
          "btn_text": "完成",
          "backurl": "/wealth",
          "sub_btn_text": "",
          "sub_backurl": "/"
        });
        this.$go('/static/succ', '', true);
      }
  
      const retUrl = this.retUrl = location + '?isfromhuifu=1';
      selectBeforeRecharge().then(res => {
        this.cardMes = res;
        this.bankNo=parseInt( this.cardMes.bankNo);
      });
  
      accountAcmountInfo().then(res => {
        this.accountMes = res;
        this.accountMoney = res.canWithdrawAmount;
      });
  
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_SUCC_PAGE'
      ]),
      /*余额全提*/
      wall() {
        this.withdrawMoney = this.accountMoney;
        this.userCashFee();
        this.withdrawBol = true;
      },
      /*计算手续费*/
      userCashFee() {
        userCashFee({
          transAmount: this.withdrawMoney,
          cashWay: 'GENERAL',
        }).then(res => {
          this.userCashFeeMoney = res.fee;
          this.actualccountMoney = this.withdrawMoney - this.userCashFeeMoney;
        });
      },
      onblur() {
        this.userCashFee();
      },
      toCash() {
  
        if (!this.withdrawMoney) {
          this.$toask('提现金额不能为空');
          return;
        }
  
        if (this.withdrawMoney < 100) {
          this.$toask('提现金额不能小于100元');
          return;
        }
  
        toCash({
          transAmount: this.withdrawMoney,
          cashWay: 'GENERAL',
          retUrl: this.retUrl,
          receiveNo: '',
          fee: this.userCashFeeMoney
  
        }).then(res => {
          // 调用汇付先清除地址栏的参数
          window.history.replaceState(null, null, this.$route.path);
          axios({
            method: 'post',
            url: location.origin + new URL(res.serviceUrl).pathname,
            data: res.inMap,
            transformRequest: [function(data) {
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret.slice(0, ret.length - 1)
            }],
          }).then(r => {
            if (r.status === 200) {
              if (r.data) {
                document.body.innerHTML = r.data;
                setTimeout(() => {
                  document.form.submit()
                }, 0)
              }
            }
          })
        });
      }
  
    },
    watch: {
  
    }
  }
</script>

<style lang="scss" scoped>
  .withdraw{
  	&-bank{
  		margin: 0.24rem  .3rem  0;
  		width: 6.9rem;
  		height: 2.4rem;
		border-radius: 6px;
		color: #FFFFFF;
		background-image: linear-gradient( #FF7553 11%, #FB613B 100%);
		overflow: hidden;
		.p1{
			float: left;
			margin: .38rem 0 .44rem .54rem;
			line-height: .48rem;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.logo{
				width: .48rem;
				height: .48rem;
				background-size: 100% 100%;
				
			}
			.img1{
				width: 1.12rem;
				height: .36rem;
				background-size: 100% 100%;
			}
			span{
				margin: 0 .2rem;
			}
			
		}
		.p2{
			float: left;
			margin-bottom: .44rem;
			width: 6.9rem;
		}
  	}
  	&-tips{
  		margin: 0.22rem  .3rem .4rem;
  		width:6.9rem;
  		line-height: .44rem;
  		color: #666666;
  		i{
  			font-style: inherit;
  			color: #FB613B;
  		}
  	}
  	&-div{
  		margin: 0 .3rem;
  		width: 6.9rem;
  		height: 1.0rem;
  		display: flex;
  		justify-content: flex-start;
  		align-items: center;
  		&-s1{
  			width: 2.26rem;
  			text-align: left;
  		}
  		&-s2{
  			width: 4.04rem;
  		}
  		&-s3{
  			width: .56rem;
  			color: #2170FF;
  		}
  		input{
  			border: none;
  			background-color: #fff;
  			text-align: left;
  			width: 4.04rem;
  		}
  	}
  	&-btn{
  		position: fixed;
  		z-index: 100;
  		left: 0;
  		right: 0;
  		bottom: .4rem;
  		margin: 0 .3rem;
  		width: 6.9rem;
  	}
  	.dis{
  		background-color: #E5E5E5;
  	}
  }
</style>
