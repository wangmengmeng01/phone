<template>
	<div class="coupon_main">
		<ul class="nav flex f32">
			<li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
		</ul>
		<div class="coupon" :class="[!res.length?'none':'']">
			<Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" />
			<div v-if="!res.length" class="center f28 color_font-99"><img style="margin: 4.8rem 2.74rem .6rem;padding: 0; width:1.42rem; height: .98rem; background-size: 100% 100%;" src="../../assets/main/mine/zwjl.png" alt="">
				<p>暂无{{nav[act].name}}券</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Coupon from '@/components/coupon/coupon'
	import {
		searchUserCouponInfo
	} from '@/service'
	export default {
		name: 'coupon_main',
		data() {
			return {
				act: 0,
				nav: [{
					name: '未使用',
					type: '1',
					status: '3'
				}, {
					name: '已使用',
					type: '1',
					status: '4'
				}, {
					name: '已过期',
					type: '1',
					status: '6'
				}],
				res: [],
				pageIndex: 1,
				total:0,
			}
		},
		components: {
			Coupon,
		},
		created() {
			this.init(this.nav[0]);
		},
		mounted() {
			document.body.onscroll = () => {
				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
					this.pageIndex++;
					if(this.pageIndex > this.total) {
						return;
					}

					if(this.$route.query.rollType) {
						this.init(this.nav[this.act]);
					}

				}
			}
		},
		methods: {
			init(item) {
				searchUserCouponInfo({
					type: item.type,
					status: item.status,
					pageIndex: this.pageIndex,
				}).then(res => {
					this.res = this.res.concat(res.couponList) ;
					
					this.nav[0].size = res.notUsedCount;
					this.nav[1].size = res.usedCount;
					this.nav[2].size = res.expireNotUsedCount;
					
					if(item.status == 3) {
						this.total = Math.ceil(res.notUsedCount / 10);
					} else if(item.status == 4) {
						this.total = Math.ceil(res.usedCount / 10);
					} else {
						this.total = Math.ceil(res.expireNotUsedCount / 10);
					};
					
					
					
					
				}).catch(() => {
					this.res = []
				})
			},
			choose(i, index) {
				this.res = [];
				if(this.act === index) return;
				window.scroll(0, 0);
				this.act = index;
				this.pageIndex = 1; // 切换菜单重置pageIndex
				this.init(i);
				console.log(this.act);
			},
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.coupon_main {
		.nav {
			padding: 0 .46rem;
			width: 6.58rem;
			height: .8rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-bottom: 1px solid #E5E5E5;
			li {
				width: 1.6rem;
				line-height: .8rem;
			}
			.act {
				border-bottom: 2px solid #208AFF;
				box-sizing: border-box;
			}
		}
		.coupon {
			margin: 0.36rem .3rem 0;
		}
	}
	
	.coupon_list {
		margin-bottom: .36rem;
	}
</style>