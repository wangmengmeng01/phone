<template>
	<div class="joinFM">

		<!--审核进度-->
		<div class="joinFMtop">
			<p class="joinFMp1"><span class="higSpan ml"></span><span class="joinFMp1Span" :class="[(joinBol3 || joinBol4 )?'higLineColor':'' ]"></span><span class="boder" :class="[joinBol5?'higSpan':'' ]"></span><span class="joinFMp1Span" :class="[(joinBol3 || joinBol4 )?'higLineColor':'' ]" ></span><span class="boder" :class="[(joinBol3 || joinBol4 )?'higSpan':'' ]"></span></p>
			<p class="joinFMp2"><span>上传身份证</span><span>人工审核</span><span>完成加盟</span></p>
		</div>

		<!--身份信息-->
		<div class="upDate" v-show="joinBol">
			<!--上传身份证-->
			<div class="joinFMdiv">
				<div class="inputFile">
					<input type="file" @change="change($event,0)" class="fileInput1" name="" id="" value="" />
					<img v-show="showFalse" :src="imgUrl" />
					<div v-show="!showFalse" class="inputFileiDiv">
						<img src="../../assets/main/home/sfzzm.png" />
						<p><img src="../../assets/main/home/xj@2x.png" />身份证正面</p>
					</div>
				</div>
			</div>
			<div class="joinFMdiv">
				<div class="inputFile">
					<input type="file" @change="change($event,1)" name="fileInput2" id="" value="" />
					<img v-show="showFalse2" :src="imgUrl2" />
					<div v-show="!showFalse2" class="inputFileiDiv">
						<img src="../../assets/main/home/sfzfm.png" />
						<p><img src="../../assets/main/home/xj@2x.png" />身份证反面</p>
					</div>
				</div>
			</div>
			<!--阅读协议-->
			<!--<p class="checkAgreementImg">
				<img @click="checked=!checked" :src="require(`@/assets/common/check_${checked?'succ':'none'}.png`)" /> 我已阅读并同意 《卓信理财师加盟协议》
			</p>-->
			<!--立刻购买-->
			<div class="productDetailBottom" @click="join" :class="[(showFalse && showFalse2)?'':'disable']">
				申请加盟
			</div>
		</div>
		<!--申请提交-->
		<div class="submission" v-show="!joinBol && joinBol2">
			<p class="submissionTitle"> <img src="../../assets/main/home/Doubt@2x.png" /><span>已提交申请，请等待</span></p>

			<p class="submissionMes f28">
				<span class="color_font-99">当前状态</span>
				<span class="color_font-36">审核中</span>
			</p>
			<p class="submissionMes f28">
				<span class="color_font-99">提交时间</span>
				<span v-if="showBol" class="color_font-36">{{joinTime.split(":")[0]}}:{{joinTime.split(":")[1]}}</span>
				<span v-else class="color_font-36">{{jionMes.createdTime}}</span>
			</p>
			<p class="submissionMes f28">
				<span class="color_font-99">预计反馈时间</span>
				<span class="color_font-36">3个工作日内</span>
			</p>
		</div>

		<!--加盟成功-->

		<div class="submission" v-show="!joinBol&&joinBol3">
			<p class="submissionTitle"> <img src="../../assets/main/home/DoubtH@2x.png" /><span>恭喜您，成功加盟理财师</span></p>

			<p class="submissionMes f28">
				<span class="color_font-99">当前状态</span>
				<span class="color_font-36">审核成功</span>
			</p>
			<p class="submissionMes f28">
				<span class="color_font-99">提交时间</span>
				<span class="color_font-36">{{jionMes.createdTime}}</span>
			</p>
			<p class="submissionMes f28">
				<span class="color_font-99">审核时间</span>
				<span class="color_font-36">{{jionMes.updatedTime}}</span>
			</p>
		</div>

		<!--<div class="submission" v-show="false">
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
	
		</div>-->

		<div class="submission" v-show="!joinBol&&joinBol4">
			<p class="submissionTitle"> <img src="../../assets/main/home/close@2x.png" /><span>对不起，您的申请未通过</span></p>

			<p class="submissionMes f28">
				<span class="color_font-99">当前状态</span>
				<span class="color_font-36">审核失败</span>
			</p>
			<p class="submissionMes f28">
				<span class="color_font-99">审核时间</span>
				<span class="color_font-36">{{jionMes.updatedTime}}</span>
			</p>
			<p class="submissionMes f28" v-for="(fm,index) in falseMes">
				<span class="color_font-99" :class="index?'spanOp':''">拒绝原因</span>
				<span class="color_font-36">{{fm.remark}}</span>
			</p>
			<div class="nextBtn">
				<p class="f28 color_font-99 center nextTips">您可以根据拒绝原因调整后重新发起申请</p>
				<p class="submissionFalseP3" @click="joinAgain">重新申请</p>
			</div>
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
				joinTime: '', //加入时间
				showBol: true, //显示加入时间
				falseMes: [], //失败原因
			}
		},
		created() {

			searchManagerCheckStatus(this.item).then(res => {
				if(res.code == "1001") {} else if(res.code == "100") {
					this.joinBol = !this.joinBol;
					this.jionMes = res.result;
					this.showBol = false;
					if(res.result.status == "1") {
						this.joinBol2 = !this.joinBol2;
						this.joinBol5 = !this.joinBol5;
					} else if(res.result.status == "2") {
						this.joinBol3 = !this.joinBol3;
						this.joinBol5 = !this.joinBol5;
					} else {

						this.falseMes = res.result.failContent;
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
					if(!i) {
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
				if(!this.showFalse || !this.showFalse2) {
					this.$toask("请提交身份证照片");
				} else {
					if(!this.checked) {
						this.$toask("请勾选加盟协议");
					} else {

						this.itemJoin.cardNumberFrontFileStream = this.imgUrl.split(",")[1];
						this.itemJoin.cardNumberBackFileStream = this.imgUrl2.split(",")[1];
						this.itemJoin.flag = this.checked;
						saveUserManager(this.itemJoin).then(res => {
							if(res.code == "100" || res.code == "1019") {
								this.joinBol = !this.joinBol;
								this.joinBol2 = !this.joinBol2;
								this.joinBol5 = !this.joinBol5;
								this.jionMes = res.result;
								this.joinTime = res.result.createDate;
								console.log(this.joinTime);
							} else if(res.code == "1000") {
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
				this.joinTime = "";
				this.showBol = true;
			},

		}
	}
</script>

<style scoped>
	.nextBtn {
		margin: 0 auto;
		padding: 0;
		position: fixed;
		width: 7.5rem;
		left: 0;
		right: 0;
		bottom: .4rem;
	}
	
	.nextTips {
		margin-bottom: .6rem;
	}
	
	.submissionFalseP3 {
		margin: 0 .3rem;
		width: 6.9rem;
		height: 1rem;
		line-height: 1rem;
		color: #FFFFFF;
		background-color: #208AFF;
		text-align: center;
		border-radius: 4px;
		font-size: 0.32rem;
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
		margin: 0 .3rem;
		width: 6.9rem;
		/*height: 4.6rem;*/
		background-color: #FFFFFF;
		border-top: 1px solid #E1E1E1;
	}
	
	.submissionTitle {
		margin: 0.80rem 0 0.08rem;
		width: 6.9rem;
		height: 0.48rem;
		font-size: 0.32rem;
		line-height: 0.48rem;
		color: #363636;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.submissionTitle>img {
		width: 0.4rem;
		height: 0.4rem;
		background-size: 100% 100%;
		margin-right: 0.16rem;
	}
	
	.submissionTitle>span {
		float: left;
	}
	
	.submissionMes {
		margin: .32rem .3rem 0;
		width: 6.9rem;
		overflow: hidden;
	}
	
	.submissionMes span:nth-child(1) {
		float: left;
		width: 2.3rem;
		text-align: left;
	}
	
	.submissionMes span:nth-child(2) {
		float: left;
		width: 4.0rem;
		text-align: left;
	}
	
	.spanOp {
		opacity: 0;
	}
	
	.joinFM {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
	}
	
	.joinFMtop {
		float: left;
		padding: 0 0.8rem;
		width: 5.9rem;
		/*height: 2.32rem;*/
		font-size: 0.28rem;
		color: #363636;
	}
	
	.joinFMp1 {
		margin: 0.46rem 0 0.32rem;
		width: 5.9rem;
		height: 0.34rem;
		overflow: hidden;
	}
	
	.joinFMp1>span:nth-child(1),
	.joinFMp1>span:nth-child(3),
	.joinFMp1>span:nth-child(5) {
		float: left;
		margin-top: 0.01rem;
		width: 0.32rem;
		height: 0.32rem;
		border-radius: 0.32rem;
	}
	
	.joinFMp1Span{
		float: left;
		margin: 0.16rem 0;
		width: 2.0rem;
		height: 2px;
		background-color: #D8D8D8;
	}
	.higLineColor{
		background-color:  #208AFF;
	}
	
	.boder {
		background-color: #D7D7D7;
	}
	
	.higSpan {
		background-color: #208AFF;
		border: none;
	}
	
	.ml {
		margin-left: 0.60rem;
	}
	
	.joinFMp2 {
		width: 5.9rem;
		height: 0.28rem;
		line-height: 0.28rem;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		margin-bottom: .92rem;
	}
	
	.joinFMdiv {
		float: left;
		margin: 0 0.98rem;
		width: 5.54rem;
		height: 2.98rem;
		font-size: 0.28rem;
		color: #8D8D94;
		overflow: hidden;
		margin-bottom: .44rem;
		background-color: #f3f7ff;
	}
	
	.inputFile {
		float: left;
		width: 5.54rem;
		height: 2.98rem;
		overflow: hidden;
		position: relative;
	}
	
	.inputFile>input {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		float: left;
		width: 5.54rem;
		height: 2.98rem;
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
	
	.inputFileiDiv {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		width: 5.54rem;
		height: 2.98rem;
		overflow: hidden;
	}
	
	.inputFileiDiv>img {
		float: left;
		margin: 0 1.19rem;
		width: 3.16rem;
		height: 2.32rem;
	}
	
	.inputFileiDiv p {
		float: left;
		width: 5.54rem;
		text-align: center;
		height: .26rem;
		font-size: .24rem;
		line-height: .26rem;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.inputFileiDiv p>img {
		width: .3rem;
		height: .26rem;
		margin-right: .24rem;
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
		width: 6.9rem;
		height: 0.44rem;
		margin: 0 .3rem;
		font-size: .28rem;
		color: #666666;
		line-height: .44rem;
		display: flex;
		align-items: left;
		justify-content: left;
	}
	
	.checkAgreementImg>img {
		width: 0.44rem;
		height: 0.44rem;
		background-size: 100% 100%;
		margin-right: .16rem;
	}
	
	.productDetailBottom {
		float: left;
		margin: 0 auto;
		padding: 0;
		width: 6.9rem;
		height: 1.0rem;
		overflow: hidden;
		line-height: 1.0rem;
		font-size: 0.32rem;
		text-align: center;
		background-color: #208AFF;
		color: #FFFFFF;
		margin: 1.2rem 0.3rem .4rem;
	}
	
	.disable {
		background: #E1E1E1;
		border-radius: 4px;
	}
</style>