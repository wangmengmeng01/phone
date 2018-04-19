<template>
	<div class="InfoRegister">
		<div class="InfoRegister-div f28">
			<span>展业目标</span>
			<span style="float: right;">张三</span>
		</div>
		<p class="InfoRegister-p"></p>
		<div class="InfoRegister-div f28 borderB">
			<span>推荐日期</span>
			<img src="../../assets/common/arrow-right.png" />
			<p class="InfoRegister-div-p">
				<input type="date" name="" id="" value="" v-model="recommendDate" placeholder="请选择" />
				<span v-show="recommendDate!=null || recommendDate!=''">{{recommendDate}}</span>
				<span v-show="recommendDate==''">请选择</span>
			</p>

		</div>
		<div class="InfoRegister-div f28">
			<span>推荐地点</span>
			<input class="InfoRegister-div-input" type="text" maxlength="17" v-model="address" placeholder="请输入" />
		</div>
		<p class="InfoRegister-p"></p>
		<div class="InfoRegister-div f28 borderB">
			<span>主推产品</span>
			<img src="../../assets/common/arrow-right.png" />
			<p class="InfoRegister-div-p">
				<select class="selsect" v-model="selectProduct">
					<option v-for="(option,index) in productList" v-bind:value="index">
						{{ option.productName }}
					</option>
				</select>

				<span v-show="selectProduct">{{productList[selectProduct].productName}}</span>
				<span v-show="selectProduct"> </span>
			</p>

		</div>
		<div class="InfoRegister-div f28">
			<span>推荐金额</span>
			<input class="InfoRegister-div-input" type="tel" name="" v-model.number="amount" id="" value="" placeholder="输入金额" />
		</div>
		<p class="InfoRegister-p"></p>
		<div class="InfoRegister-div f28">
			<span>推荐结果</span>
			<img src="../../assets/common/arrow-right.png" />
			<p class="InfoRegister-div-p">
				<select class="selsect" v-model='resultType'>
					<option v-for="(option,index) in options" v-bind:value="index">
						{{ option.text }}
					</option>
				</select>
				<span v-show="resultType!='0'" style="float: right;">{{ options[resultType].text}}</span>
				<span v-show="resultType=='0'" style="float: right;">请选择</span>
			</p>
		</div>
		<p class="InfoRegister-p"></p>

		<div class="InfoRegister-div f28">
			<span>备注(选填)</span>
		</div>
		<textarea class="InfoRegister-text" placeholder="请输入您认为在展业过程中的关键信息" v-model="remark"></textarea>

		<button class="btn InfoRegister-btn" :class="(recommendDate && address && resultType && selectProduct && amount)?'':'dis'" @click="submit">登记</button>
	</div>
</template>

<script>
	import {
		getProductList,
		showBusinessRecord
	} from '@/service'
	export default {

		name: 'InfoRegister',

		data() {
			return {
				recommendDate: '',
				address: '',
				resultType: 0, // 比如想要默认选中为 Three 那么就把他设置为C
				options: [{
						text: '请选择',
						value: '0'
					},
					{
						text: '无意向',
						value: '1'
					},
					{
						text: '有意向',
						value: '2'
					}, //每个选项里面就不用在多一个selected 了
					{
						text: '成交',
						value: '3'
					},
				],
				selectProduct: 0, // 比如想要默认选中为 Three 那么就把他设置为C
				productList: [{
					productName: "",
					productNo: ""
				}],
				amount: 0 || '',
				remark: "",
			}
		},
		computed: {},
		created() {
			getProductList().then(res => {
				console.log(res);
				this.productList = this.productList.concat(res.productList);
			});

		},
		methods: {

			submit() {
				const userCode = this.$route.query.userCode;
				showBusinessRecord({
					targetUserCode: userCode,
					recommendDate: this.recommendDate,
					address: this.address,
					productNo: this.productList[this.selectProduct].productNo,
					amount: this.amount,
					resultType: this.resultType,
					remark: this.remark,
				}).then(res => {
					console.log(res);
					
					if(res==null||res==''){
						this.$go('/mine');
					}
					
					
				});
			}

		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.InfoRegister {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		&-p {
			width: 7.5rem;
			height: .2rem;
			background-color: #F6F5F5;
		}
		&-div {
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			line-height: 1.0rem;
			overflow: hidden;
			span:nth-child(1) {
				float: left;
				color: #666666;
			}
			img {
				float: right;
				width: 0.14rem;
				height: .24rem;
				margin: .38rem 0 .38rem .16rem;
			}
			&-p {
				float: right;
				height: 1.0rem;
				line-height: 1.0rem;
				font-size: .28rem;
				width: 3.0rem;
				text-align: right;
				position: relative;
				color: #999999;
				input {
					position: absolute;
					width: 1.5rem;
					top: 0;
					right: 0;
					opacity: 0;
					width: 100%;
					height: 100%;
					text-align: right;
				}
				.selsect {
					position: absolute;
					width: 1.5rem;
					top: 0;
					right: 0;
					opacity: 0;
					width: 100%;
					height: 100%;
					text-align: right;
					option {
						width: 100%;
						height: 100%;
						line-height: 100%;
					}
				}
			}
			&-input {
				margin: .30rem 0;
				float: right;
				text-align: right;
				font-size: .28rem;
				width: 5.0rem;
				line-height: .28rem;
				border: none;
				background-color: #FFFFFF;
				color: #999999;
			}
		}
		&-text {
			margin: 0 .3rem;
			width: 6.9rem;
			height: 2.0rem;
			background-color: #FFF;
			text-align: left;
			line-height: .28rem;
		}
		&-btn {
			position: fixed;
			margin: 0 auto;
			padding: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 7.5rem;
			height: .98rem;
			line-height: .98rem;
			text-align: center;
			color: #FFFFFF;
			border-radius: 0;
		}
		.dis {}
	}
</style>