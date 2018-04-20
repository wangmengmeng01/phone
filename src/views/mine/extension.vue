<template>
	<div class="extension">
		<p class="f28 borderB" @click="$go('InfoRegisterList')">展业登记 记录 <img src="../../assets/common/arrow-right.png" /></p>
		<p class="f28 borderB" @click="$go('user_promise')">邀约投资 记录 <img src="../../assets/common/arrow-right.png" /></p>
		<p class="f28 borderB" @click="$go('give_record')">赠送礼物 记录 <img src="../../assets/common/arrow-right.png" /></p>
	</div>
</template>

<script>
	export default {
		name: 'extension',
		data() {
			return {}
		},
		created() {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.extension {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		color: #666666;
		p {
			margin: 0 .3rem;
			width: 6.9rem;
			height: 1.0rem;
			line-height: 1.0rem;
			overflow: hidden;
			img {
				margin: .38rem 0;
				float: right;
				width: .14rem;
				height: .24rem;
				background-size: 100% 100%;
			}
		}
	}
</style>