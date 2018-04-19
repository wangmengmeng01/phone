<template>
	<div class="InfoRegisterList">
	</div>
</template>

<script>
	import {
		getProductList,
		showBusinessRecord
	} from '@/service'
	export default {

		name: 'InfoRegisterList',

		data() {
			return {}
		},
		computed: {},
		created() {
//			getProductList().then(res => {
//				console.log(res);
//				this.productList = this.productList.concat(res.productList);
//			});

		},
		methods: {},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.InfoRegisterList {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		overflow: hidden;
		}
</style>