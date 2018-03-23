<template>
	<div class="joinFM">
		<!--审核进度-->
		<div class="joinFMtop">
			<p class="joinFMp1"><span class="higSpan ml"></span><span></span><span class="boder" :class="[joinBol5?'higSpan':'' ]"></span><span></span><span class="boder" :class="[(joinBol3 || joinBol4 )?'higSpan':'' ]"></span></p>
			<p class="joinFMp2"><span>上传身份证</span><span>人工审核</span><span>完成加盟</span></p>
		</div>
	
		<!--身份信息-->
		<div class="upDate" v-show="joinBol">
			<!--上传身份证-->
			<div class="joinFMdiv">
				<p class="joinFMdivWord"><span>1</span>身份证正面</p>
				<p class="inputFile">
					<input type="file" @change="change($event,0)" class="fileInput1" name="" id="" value="" />
					<img v-show="showFalse" :src="imgUrl" />
				</p>
			</div>
			<div class="joinFMdiv">
				<p class="joinFMdivWord"><span>2</span>身份证反面</p>
	
				<p class="inputFile">
					<input type="file" @change="change($event,1)" name="fileInput2" id="" value="" />
					<img v-show="showFalse2" :src="imgUrl2" />
				</p>
			</div>
			<!--阅读协议-->
			<div class="joinFMdiv h">
				<div class="pdcTitle">已阅读同意</div>
				<div class="checkAgreement">
					<p class="checkAgreementImg">
						<img @click="checked=!checked" :src="require(`@/assets/coupon/check_${checked?'succ':'none'}.png`)" />
					</p>
					<p class="agreement">《卓信理财师加盟协议》</p>
				</div>
			</div>
			<!--立刻购买-->
			<div class="productDetailBottom" @click="join" :class="[(checked && showFalse && showFalse2)?'':'disable']">
				申请加盟
			</div>
		</div>
		<!--申请提交-->
		<div class="submission" v-show="!joinBol && joinBol2">
			<p class="submissionTitle"> <img src="../../assets/main/home/Doubt@2x.png" /><span>已提交申请，请等待</span></p>
			<div class="subDivleft">
				<p>审核中</p>
				<p>当前状态</p>
			</div>
			<div class="subDivcenter">
				<p>{{jionMes.createdTime}}</p>
				<p>提交时间</p>
			</div>
			<div class="subDivright">
				<p>3个工作日内</p>
				<p>预计反馈时间</p>
			</div>
		</div>
	
		<!--加盟成功-->
	
		<div class="submission" v-show="!joinBol&&joinBol3">
			<p class="submissionTitle"> <img src="../../assets/main/home/DoubtH@2x.png" /><span>已成功加盟，恭喜您</span></p>
	
			<div class="subDivleft1">
				<p>审核通过</p>
				<p>当前状态</p>
			</div>
			<div class="subDivright1">
				<p>{{jionMes.updatedTime}}</p>
				<p>审核时间</p>
			</div>
		</div>
	
		<div class="submission" v-show="false">
			<p class="submissionTitle1"> <img src="../../assets/main/home/earth@2x.png" /><span>尝试以下功能，开启精彩理财师生涯</span></p>
	
			<div class="submissionDIV">
				<p>
					<img src="../../assets/main/home/gg@2x.png" />
					<span>广告卓信产品</span>
				</p>
				<p>
					<img src="../../assets/main/home/kh@2x.png" />
					<span>获取潜在客户</span>
				</p>
	
			</div>
	
		</div>
	
		<div class="submission" v-show="!joinBol&&joinBol4">
			<p class="submissionTitle"> <img style="margin-left:0.82rem ;" src="../../assets/main/home/close@2x.png" /><span>对不起，您的加盟申请被拒绝</span></p>
	
			<div class="subDivleft1">
				<p>审核通过</p>
				<p>当前状态</p>
			</div>
			<div class="subDivright1">
				<p>{{jionMes.updatedTime}}</p>
				<p>审核时间</p>
			</div>
		</div>
	
		<div class="submission" style="height: 5.36rem;" v-show="!joinBol&&joinBol4">
			<p class="submissionFalseP1">拒绝原因</p>
			<div class="falseDiv">
				<p class="submissionFalseP2" v-for="fm in falseMes">{{fm.remark}}</p>
			</div>
			<p class="submissionFalseP3" @click="joinAgain">重新提交申请</p>
			<p class="submissionFalseP4">您可以根据拒绝原因调整后重新发起申请</p>
		</div>
	
	</div>
</template>

<script>
	import {
		upload
	} from '@/until'
	import {
		searchManagerCheckStatus,
		saveUserManager,
		uploadFile
	} from '@/service'
	export default {
	
		name: 'joinFinlManager',
	
		data() {
			return {
				checked: true,
				imgUrl: '',
				imgUrl2: '',
				showFalse: false,
				showFalse2: false,
				checkBol: false,
				item: {},
				joinBol: true,
				joinBol2: false,
				joinBol3: false,
				joinBol4: false,
				joinBol5: false,
				itemJoin: {
					cardNumberFrontFileStream: '',
					cardNumberBackFileStream: '',
					flag: "",
				},
				jionMes: {},
				falseMes:[],//失败原因
			}
		},
		created() {
	
			searchManagerCheckStatus(this.item).then(res => {
				if (res.code == "1001") {} else if (res.code == "100") {
					this.joinBol = !this.joinBol;
					this.jionMes = res.result;
					if (res.result.status == "1") {
						this.joinBol2 = !this.joinBol2;
						this.joinBol5 = !this.joinBol5;
					} else if (res.result.status == "2") {
						this.joinBol3 = !this.joinBol3;
						this.joinBol5 = !this.joinBol5;
					} else {
						
						this.falseMes=res.result.failContent;
						this.joinBol4 = !this.joinBol4;
						this.joinBol5 = !this.joinBol5;
					}
				} else {
					this.$go('/login');
				}
	
			});
	
			//			.catch(()=>{
			//				this.$toask("dddd")
			//				
			//			});
	
		},
		methods: {
			//图片上传
			change(e, i) {
				upload(e).then((res) => {
					if (!i) {
						this.imgUrl = "";
						this.showFalse = true;
						this.imgUrl = res;
					} else {
						this.imgUrl2 = "";
						this.showFalse2 = true;
						this.imgUrl2 = res;
					}
				});
			},
	
			join() {
				if (!this.showFalse || !this.showFalse2) {
					this.$toask("请提交身份证照片");
				} else {
					if (!this.checked) {
						this.$toask("请勾选加盟协议");
					} else {
	
						this.itemJoin.cardNumberFrontFileStream = this.imgUrl.split(",")[1];
						this.itemJoin.cardNumberBackFileStream = this.imgUrl2.split(",")[1];
						this.itemJoin.flag = this.checked;
						saveUserManager(this.itemJoin).then(res => {
							if (res.code == "100" || res.code == "1019") {
								this.joinBol = !this.joinBol;
								this.joinBol2 = !this.joinBol2;
								this.joinBol5 = !this.joinBol5;
								this.jionMes=res.result;
							} else if (res.code == "1000") {
								this.$go('/login');
							} else {
								this.$toask(res.message);
							}
						})
	
					}
	
				}
			},
			joinAgain() {
				this.checked = true;
				this.imgUrl = '';
				this.imgUrl2 = '';
				this.showFalse = false;
				this.showFalse2 = false;
				this.checkBol = false;
				this.item = {};
				this.joinBol = true;
				this.joinBol2 = false;
				this.joinBol3 = false;
				this.joinBol4 = false;
				this.joinBol5 = false;
				this.itemJoin.cardNumberFrontFileStream = '';
				this.itemJoin.cardNumberBackFileStream = '';
				this.itemJoin.flag = '';
				this.jionMes = '';
			},
	
		}
	}
</script>

<style scoped>
	/*.submission1,
		.submission2,
		.submission3 {
			display: none;
		}*/
	
	.submissionFalseP1 {
		height: 0.28rem;
		line-height: 0.28rem;
		font-size: 0.28rem;
		color: #8D8D94;
		text-align: center;
		margin: 0.68rem 0 0.15rem;
	}
	.falseDiv{
		height: 2.16rem;
		font-size: 0.48rem;
		color: #F41F1F;
		text-align: center;
		margin-bottom: 0.2rem;
	}
	.submissionFalseP2 {
		height: 0.48rem;
		line-height: 0.48rem;
		font-size: 0.48rem;
		color: #F41F1F;
		text-align: center;
		margin-bottom: 0.08rem;
	}
	
	.submissionFalseP3 {
		margin: 0 1.48rem;
		width: 3.76rem;
		height: 0.72rem;
		line-height: 0.72rem;
		color: #FFFFFF;
		background-color: #3299D1;
		text-align: center;
		border-radius: 0.36rem;
		font-size: 0.36rem;
	}
	
	.submissionFalseP4 {
		height: 0.28rem;
		line-height: 0.28rem;
		font-size: 0.28rem;
		color: #8D8D94;
		text-align: center;
		margin-top: 0.32rem;
	}
	
	.submissionDIV {
		margin-top: 0.99rem;
		float: left;
		width: 6.7rem;
		height: 1.52rem;
		overflow: hidden;
	}
	
	.submissionDIV>p:nth-child(1) {
		float: left;
		padding-right: 1.0rem;
		width: 2.35rem;
		height: 1.52rem;
		overflow: hidden;
	}
	
	.submissionDIV>p:nth-child(2) {
		float: left;
		padding-left: 1.0rem;
		width: 2.35rem;
		height: 1.52rem;
		overflow: hidden;
	}
	
	.submissionDIV img {
		float: left;
		width: 0.96rem;
		height: 0.96rem;
		margin: 0 0.695rem 0.16rem;
	}
	
	.submissionDIV span {
		float: left;
		width: 2.35rem;
		height: 0.40rem;
		line-height: 0.4rem;
		text-align: center;
		font-size: 0.28rem;
		color: #181818;
	}
	
	.submissionTitle1 {
		margin-top: 0.6rem;
		width: 0.6.7rem;
		height: 0.44rem;
		font-size: 0.28rem;
		color: #181818;
		line-height: 0.44rem;
		overflow: hidden;
	}
	
	.submissionTitle1>img {
		float: left;
		width: 0.44rem;
		height: 0.44rem;
		background-size: 100% 100%;
		margin-right: 0.2rem;
	}
	
	.submissionTitle1>span {
		float: left;
	}
	
	.submission {
		float: left;
		margin-top: 0.4rem;
		padding: 0 0.4rem;
		width: 6.7rem;
		height: 4.6rem;
		background-color: #FFFFFF;
	}
	
	.submissionTitle {
		margin: 0.60rem 0 0.9rem;
		width: 6.7rem;
		height: 0.40rem;
		font-size: 0.36rem;
		line-height: 0.4rem;
		text-align: center;
		color: #181818;
		overflow: hidden;
	}
	
	.submissionTitle>img {
		float: left;
		width: 0.4rem;
		height: 0.4rem;
		margin-left: 1.44rem;
		background-size: 100% 100%;
		margin-right: 0.1rem;
	}
	
	.submissionTitle>span {
		float: left;
	}
	
	.subDivleft {
		float: left;
		padding-right: 0.65rem;
		width: 1.30rem;
		height: 1.3rem;
	}
	
	.subDivcenter {
		float: left;
		width: 2.8rem;
		height: 1.3rem;
		border-left: 2px solid #CDCED3;
		border-right: 2px solid #CDCED3;
		box-sizing: border-box;
	}
	
	.subDivright {
		float: left;
		padding-left: 0.35rem;
		width: 1.6rem;
		height: 1.3rem;
	}
	
	.subDivleft1 {
		float: left;
		width: 2.48rem;
		padding-right: 0.4rem;
	}
	
	.subDivright1 {
		float: left;
		padding-left: 0.4rem;
		width: 3.42rem;
		border-left: 2px solid #CDCED3;
		box-sizing: border-box;
	}
	
	.subDivleft>p:nth-child(1),
	.subDivleft1>p:nth-child(1),
	.subDivcenter>p:nth-child(1),
	.subDivright>p:nth-child(1),
	.subDivright1>p:nth-child(1) {
		margin: 0.28rem 0 0.18rem;
		height: 0.28rem;
		line-height: 0.28rem;
		font-size: 0.28rem;
		text-align: center;
		color: #181818;
	}
	
	.subDivleft>p:nth-child(2),
	.subDivleft1>p:nth-child(2),
	.subDivcenter>p:nth-child(2),
	.subDivright>p:nth-child(2),
	.subDivright1>p:nth-child(2) {
		font-size: 0.24rem;
		line-height: 0.24rem;
		text-align: center;
		color: #8D8D94;
	}
	
	
	/*<div class="subDivleft">
					<p>审核中</p>
					<p>当前状态</p>
				</div>
				<div class="subDivcenter">
					<p>2018.01.01 12:38</p>
					<p>提交时间</p>
				</div>
				<div class="subDivright">
					<p>3个工作日内</p>
					<p>预计反馈时间</p>
				</div>*/
	
	.joinFM {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
	}
	
	.joinFMtop {
		float: left;
		padding: 0 0.4rem;
		width: 6.7rem;
		height: 1.2rem;
		font-size: 0.32rem;
		color: #8D8D94;
	}
	
	.joinFMp1 {
		margin: 0.4rem 0 0.16rem;
		width: 6.7rem;
		height: 0.28rem;
		overflow: hidden;
	}
	
	.joinFMp1>span:nth-child(1),
	.joinFMp1>span:nth-child(3),
	.joinFMp1>span:nth-child(5) {
		float: left;
		width: 0.28rem;
		height: 0.28rem;
		border-radius: 0.28rem;
	}
	
	.joinFMp1>span:nth-child(2),
	.joinFMp1>span:nth-child(4) {
		float: left;
		margin: 0.12rem 0.16rem;
		width: 1.8rem;
		height: 0.04rem;
		border-radius: 0.04rem;
		background: linear-gradient(to right, #8E9EAB, #EEF2F3);
	}
	
	.boder {
		border: 1px solid #8D8D94;
		box-sizing: border-box;
	}
	
	.higSpan {
		background-color: #3299D1;
		border: none;
	}
	
	.ml {
		margin-left: 0.84rem;
	}
	
	.joinFMp2 {
		width: 6.7rem;
		height: 0.36rem;
		line-height: 0.36rem;
		overflow: hidden;
	}
	
	.joinFMp2>span:nth-child(1) {
		float: left;
		width: 1.60rem;
		text-align: center;
		margin-left: 0.16rem;
	}
	
	.joinFMp2>span:nth-child(2) {
		float: left;
		width: 1.40rem;
		margin: 0 0.98rem 0 0.84rem;
	}
	
	.joinFMp2>span:nth-child(3) {
		float: left;
		width: 1.40rem;
	}
	
	.joinFMdiv {
		margin-top: 0.4rem;
		float: left;
		padding: 0 0.4rem;
		width: 6.7rem;
		height: 4.66rem;
		background-color: #FFFFFF;
		font-size: 0.28rem;
		color: #8D8D94;
		overflow: hidden;
	}
	
	.h {
		height: 1.76rem;
	}
	
	.joinFMdivWord {
		float: left;
		margin-top: 0.4rem;
		width: 6.7rem;
		height: 0.32rem;
		line-height: 0.32rem;
		overflow: hidden;
	}
	
	.joinFMdivWord>span {
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin-right: 0.2rem;
		border: 1px solid #8D8D94;
		box-sizing: border-box;
		font-size: 0.24rem;
		border-radius: 0.32rem;
		text-align: center;
	}
	
	.inputFile {
		margin: 0.38rem 0 0 0.56rem;
		float: left;
		width: 5.6rem;
		height: 2.6rem;
		border: 1px dashed #8D8D94;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}
	
	.inputFile>input {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		float: left;
		width: 5.6rem;
		height: 2.6rem;
		opacity: 0;
	}
	
	.inputFile>img {
		position: absolute;
		left: 0;
		top: 0;
		float: left;
		width: 5.6rem;
		height: 2.6rem;
		background-size: 100% 100%;
	}
	
	.pdcTitle {
		margin-top: 0.4rem;
		height: 0.28rem;
		line-height: 0.28rem;
		text-align: left;
		font-size: 0.28rem;
	}
	
	.checkAgreement {
		margin-top: 0.36rem;
		height: 0.34rem;
		overflow: hidden;
	}
	
	.checkAgreementImg {
		float: left;
		width: 0.32rem;
		height: 0.32rem;
		margin: 0.01rem 0;
		position: relative;
	}
	
	.checkAgreementImg>img {
		position: absolute;
		left: 0;
		top: 0;
		width: 0.32rem;
		height: 0.32rem;
		background-size: 100% 100%;
	}
	
	.checkInput {
		position: absolute;
		width: 0.32rem;
		height: 0.32rem;
		left: 0;
		top: 0;
		/*opacity: 0;*/
	}
	
	.agreement {
		margin-left: 0.06rem;
		float: left;
		width: 6.30rem;
		font-size: 0.22rem;
		line-height: 0.34rem;
		text-align: left;
		color: #3299D1;
	}
	
	.productDetailBottom {
		margin: 0 auto;
		padding: 0;
		position: fixed;
		z-index: 10;
		left: 0;
		right: 0;
		bottom: 0;
		width: 7.5rem;
		height: 1.1rem;
		overflow: hidden;
		line-height: 1.1rem;
		font-size: 0.36rem;
		text-align: center;
		background-color: #3299D1;
		color: #FFFFFF;
	}
	
	.disable {
		background: #98cceb;
	}
</style>