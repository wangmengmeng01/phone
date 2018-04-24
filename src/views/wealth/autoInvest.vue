<template>
  <div class="autoInvestWrap pageCenter">
  	
    <!--<div class="autoInvest">
      <div class="offOn">
        <div class="OOFont">自动投标</div>
        <div class="OOWrap">
          <div v-if="auroBol" class="OOButton">关</div>
          <div v-else class="OOButton1">开</div>
        </div>
      </div>
      <div class="autoIC">授权存管方开启自动复投</div>
      <div class="autoIB"><img src="../../assets/wealth/tips.png" alt=""> <span>在您投资计划标之前，请务必先开启此功能</span></div>
    </div>
    
    
    <div class="autoIIllustrate">
      <p>授权复投流程</p>
      <div class="AIITips"><img src="../../assets/wealth/Triangle.png">放心：自动委托</div>
      <div class="AIITips"><img src="../../assets/wealth/Triangle.png">安心：资金不站岗</div>
      <div class="AIITips"><img src="../../assets/wealth/Triangle.png">省心：设置灵活</div>
    </div>-->
    <div class="autoInvestWrap-top">
    		<p class="f30  p1 borderB">
    		<span>自动投标</span>
    		<span v-if="auroBol"  @click="openTenderPlan">去开启</span>
    		
    		<span v-else  class="disable" >已开启</span>
    		</p>
    		<p class="p2 f28">
    			<span class="color_font-99">授权存管方开启自动投标</span>
    			<span class="color_font-36">在您投资计划标之前，请务必先开启此功能</span>
    		</p>
    </div>
    
    <div class="autoInvestWrap-bottom">
    		<p class="autoInvestWrap-bottom-p1 f28 color_font-36 borderB">为什么要开启自动投标？</p>
    		<p class="autoInvestWrap-bottom-p2 f28 color_font-99">
    			<span>1.放心：自动委托</span>
    			<span>2.安心：资金不站岗 </span>
    			<span>3.省心：设置灵活</span>
    		</p>
    </div>
  </div>
</template>

<script>
  import {
    autoInvestQuary,
    querySigningStatus,
    signingContract,
    autoTenderPlan,
    getUserStatus,
    userActivate
  } from '@/service'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'autoInvest',
    data() {
      return {
        res: {},
        item: {
  
        },
        auroBol: true, //复投标识
        retUrl: '',
        retUrl2: '',
      }
    },
    created() {
      const retUrl = this.retUrl = location.origin + '/wealth/autoInvest?isJZQ=1';
      const retUrl2 = this.retUrl2 = location.origin + '/wealth/autoInvest?isFT=1';
      getUserStatus(this.itemStatus).then(res => {
        //@click=""
        console.log(res);
        const info = res.result;
        if (res.code == "100") {
  
          if (info.openAccountStatus == "1") {
            //未开户
            this.$go('/reg_bank');
          } else if (info.openAccountStatus == "4") {
            //激活
  
            userActivate({
              retUrl: location.origin + location.pathname
            }).then(res => {
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
            })
  
          } else {
  
            //复投
            if (info.autoBuyBidFlag == "1") {
  
              this.auroBol = false;
  
            }
  
          }
  
        } else if (res.code == "1210" || res.code == "1000") {
          this.$go('/login');
        } else {
          this.$toask(res.message);
        }
      });
      //君子签回来
            		if(this.$route.query.isJZQ){
        
            			querySigningStatus({busiType:'4'}).then(res => {
        
        	       			console.log(res);
        	       			if(res.status=="1"||res.status=="3"){
        	       				this.autoTenderPlan();
        	       			}else{
        	       			}
        	       		})
        
        			};
      //复投回来
        			if(this.$route.query.isFT){
        				autoInvestQuary().then(res => {
        		       		if(res.code == "100") {
        		       			this.auroBol = false;
        		       			 this.RESET('succ_page');
        						 this.SET_SUCC_PAGE({
        		             		"title": "已授权存管方开启自动投标",
        							'sub_title': "您现在可以进行计划标的投资了",
        							"btn_text": "立即投资",
        							"backurl": "/product",
        							"sub_btn_text": "暂不",
        							"sub_backurl": "/"
        		            			});
        		          		  this.$go('/static/succ','',true);
        
        		       		} else if(res.code == "1210" || res.code == "1000") {
        		       			this.$go('/login');
        		       		} else {
        		       			this.$toask(res.message);
        		       			  this.SET_SUCC_PAGE({
				              "title": "开启自动投标失败",
				              "sub_title": "您开启自动投标失败，稍后再试。",
				              "btn_text": "重新提交",
				              "backurl": "/wealth/autoInvest",
				              "sub_btn_text": "返回首页",
				              "sub_backurl": "/"
				            });
				            this.$go('/static/fail');
        		       		}
        
        		       	});
        
        			}
  
  
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_SUCC_PAGE'
      ]),
      //开启复投（先查询君子签状态）
      openTenderPlan() {
        querySigningStatus({
          busiType: '4'
        }).then(res => {
  
          console.log(res);
          if (res.status == "1" || res.status == "3") {
            this.autoTenderPlan();
          } else {
            this.signingContract();
          }
  
        })
  
  
      },
      //去开启复投
      autoTenderPlan() {
        autoTenderPlan({
          openFlag: '1',
          retUrl: this.retUrl2
        }).then(res => {
          console.log(location.origin + new URL(res.serviceUrl).pathname)
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
  
  
        })
  
      },
      //君子签跳转
  
      signingContract() {
        signingContract({
          busiType: '4',
          retUrl: this.retUrl
        }).then(res => {
          console.log(res);
          window.location.href = res.link;
  
        })
  
      },
  
  
  
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .autoInvestWrap{
  	.disable{
  		pointer-events: none;
  	}
	&-top{
		background: #FFFFFF;
		.p1{	
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #363636;
			font-size: .3rem;
			span:nth-child(2){
				color: #208AFF ;
			}
		}
		.p2{
			margin: 0 .3rem;
			width: 6.9rem;
			overflow: hidden;
			span:nth-child(1){
				float: left;
				display: block;
				margin: .36rem 0 .32rem;
				line-height: .28rem;
			}
			span:nth-child(2){
				float: left;
				display: block;
				margin-bottom: .30rem;
				line-height: .28rem;
			}
		}
	}
	&-bottom{
		margin-top: .16rem;
		background: #FFFFFF;
		overflow: hidden;
		&-p1{
			float: left;
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			line-height: 1.0rem;
		}
		&-p2{
			float: left;
			margin: .30rem 0.3rem .44rem;
			width: 6.9rem;
			span{
				display: block;
				line-height: .44rem;
			}
		}
	}
  }
 
</style>
