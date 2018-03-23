<template>
  <div class="autoInvestWrap">
    <div class="autoInvest">
      <div class="offOn">
        <div class="OOFont">自动投标</div>
        <div class="OOWrap" @click="openTenderPlan" :class="[!auroBol?'disable':'']">
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
    </div>
  </div>
</template>

<script>
  import { autoInvestQuary,querySigningStatus,signingContract,autoTenderPlan,getUserStatus } from '@/service'
  import { mapGetters, mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'autoInvest',
    data() {
      return{
        res: {},
        item: {

        },
        auroBol:true,//复投标识
        retUrl:'',
        retUrl2:'',
      }
      },
      created() {
			const retUrl = this.retUrl = location+'?isJZQ=1';
			const retUrl2 = this.retUrl2 = location+'?isFT=1';
      		getUserStatus(this.itemStatus).then(res => {
      			//@click=""
      			console.log(res);
      			const info = res.result;
      			if(res.code == "100") {

      				if(info.openAccountStatus == "1") {
      					//未开户
      					this.$go('/reg_bank');
      				} else if(info.openAccountStatus == "4") {
      					//激活

      				} else {

      					//复投
      					if(info.autoBuyBidFlag == "1") {

							this.auroBol=false;

      					}

      				}

      			} else if(res.code == "1210" || res.code == "1000") {
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
	       openTenderPlan(){
	       		querySigningStatus({busiType:'4'}).then(res => {

	       			console.log(res);
	       			if(res.status=="1"||res.status=="3"){
	       				this.autoTenderPlan();
	       			}else{
	       				this.signingContract();
	       			}

	       		})


	       },
	       //去开启复投
	       autoTenderPlan(){
	       	autoTenderPlan({openFlag:'1',retUrl:this.retUrl2}).then(res => {
			         console.log(location.origin+ new URL(res.serviceUrl).pathname)
			              axios({
			                method: 'post',
			                url: location.origin+ new URL(res.serviceUrl).pathname,
			                data: res.inMap,
			                transformRequest: [function (data) {
			                  let ret = '';
			                  for (let it in data) {
			                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			                  }
			                  return ret.slice(0,ret.length-1)
			                }],
			              }).then(r=>{
			                if(r.status === 200){
			                  if(r.data){
			                    document.body.innerHTML = r.data;
			                    setTimeout(()=>{document.form.submit()},0)
			                  }
			                }
			              })


	       		})

	       },
	       //君子签跳转

	       signingContract(){
	       	signingContract({busiType:'4',retUrl:this.retUrl}).then(res => {
	       			console.log(res);
	       			window.location.href=res.link;

	       		})

	       },



	       },
	       watch: {}
	       }</script>

<style lang="stylus" scoped>
  .autoInvest
    height:2.94rem;
    background:rgba(255,255,255,1);
    margin-top 0.4rem
    padding-top 0.5rem
  .offOn
    display flex
    justify-content space-between
    padding 0 0.36rem
    .OOFont
      color #181818
      font-size 0.36rem
  .disable
  	pointer-events: none;
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
     .OOButton1
      width:0.6rem;
      height:0.52rem;
      background:#3299D1;
      border-radius: 0.32rem;
      line-height 0.52rem
      color #ffffff
      font-size 0.28rem
      text-align center
      position absolute
      right 0
    .on
      background #3299D1
  .autoIC
    color #8D8D94
    font-size 0.28rem
    padding 0.6rem 0 0 0.6rem
  .autoIB
    color #181818
    font-size 0.24rem
    padding 0.16rem 0 0 0.6rem
    line-height 0.48rem
    img
      width 0.44rem
      height 0.44rem
      position relative
      top 0.12rem
    span
      display inline-block
      margin-left 0.2rem
  .autoIIllustrate
    height:3.54rem;
    background:rgba(255,255,255,1);
    margin-top 0.4rem
    p
      color #181818
      font-size 0.36rem
      padding 0.5rem 0 0.4rem 0.36rem
    .AIITips
      color #8D8D94
      font-size 0.24rem
      padding 0.18rem 0 0 0.6rem
      img
        width 0.2rem
        height 0.2rem
        padding-right 0.11rem
</style>
