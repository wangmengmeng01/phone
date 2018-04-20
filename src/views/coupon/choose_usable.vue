<template>
	<div class="coupon_choose_usable">
		<ul class="nav f32 color_font-99">
			<li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.count}})</li>
		</ul>

		<div class="coupon">
			<Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" checked="true" @checkedCb="checkedCb(i, index)" ref="coupon" type="mine" />
			<div v-if="!res.length" class="nothing f28 color_font-99"><img style="margin: 4.8rem 2.74rem .6rem;padding: 0; width:1.42rem; height: .98rem; background-size: 100% 100%;" src="../../assets/main/mine/zwjl.png" alt="">
				<p>暂无可送优惠</p>
			</div>
		</div>
		<button class="finish" @click="submit">完成</button>
	</div>

</template>

<script>
	import Coupon from '@/components/coupon/coupon'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		showGiveCouponList
	} from '@/service'
	export default {
		name: 'coupon_choose_usable',
		data() {
			return {
				act: 0,
				nav: [{
						name: '加息券',
						type: '1',
						count: 0
					},
					{
						name: '返现券',
						type: '3',
						count: 0
					}, {
						name: '折扣券',
						type: '2',
						count: 0
					}
				],
				res: [],
				couponlist: [],
				pageIndex: 1, //分页
				total: 0, //总页数
				num: 0,
			}
		},
		computed: {
			...mapGetters([
				'coupon'
			])
		},
		components: {
			Coupon,
		},
		created() {
			this.SET_COUPON({
				data: []
			});
			this.init(this.nav[0]);
		},
		mounted() {
			document.body.onscroll = () => {
				if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) {
					this.pageIndex++;
					if(this.pageIndex > this.totalPage) {
						return;
					}

					if(this.$route.query.rollType) {
						this.init(this.nav[this.num]);
					}

				}
			}
		},
		methods: {
			...mapMutations([
				'SET_COUPON',
			]),
			init(item) {
				this.SET_COUPON({
					data: []
				});
				showGiveCouponList({
					couponType: item.type,
					pageIndex: this.pageIndex,
				}).then(res => {

					this.nav[0].count = res.raiseCount;
					this.nav[1].count = res.cashbackCount;
					this.nav[2].count = res.deductibleCount;
					
					this.res = this.res.concat(res.couponList);
					
					console.log(this.res);
					
					if(item.type == 1) {
						this.total = Math.ceil(res.raiseCount / 10);
					} else if(item.type == 3) {
						this.total = Math.ceil(res.cashbackCount / 10);
					} else {
						this.total = Math.ceil(res.deductibleCount / 10);
					};

				}).catch(err => {
					this.res = []
				})
			},
			choose(i, index) {
				this.res = [];
				this.pageIndex = 1;
				this.total = 0;
				if(this.act === index) return;
				this.act = index;
				this.init(i);
				console.log(index);
				this.num = index;
			},
			checkedCb(data, index) {
				// 没有数据直接push
				if(!this.couponlist.length) {
					this.couponlist.push(data);
					return
				}
				// 判断需不需要删除
				if(!this.isDel(data, index)) {
					this.couponlist.push(data);
				}
			},
			isDel(current, index) {
				let i = this.couponlist.findIndex(t => t.receiveNo === current.receiveNo);
				// 元素存在则删除，不存在再继续判断需要不需要添加
				if(i > -1) {
					this.couponlist.splice(i, 1);
					this.$refs.coupon[index].check = false;
					return true
				}
				return false
			},
			submit() {
				this.SET_COUPON({
					data: this.couponlist
				});
				this.$go(this.coupon.backurl, '', true)
			}
		},
		watch: {}
	}
</script>

<style lang="sass" scoped>
  .coupon_choose_usable
    height: 100%
    padding-top: .2rem
    .nav
      position: fixed
      z-index: 100
      left: 0
      top: .88rem
      bottom: 0
      padding: 0 .46rem
      width: 6.58rem
      height: .8rem
      line-height: .8rem
      background: #fff
      display: flex
      justify-content: space-between
      li
        height: .8rem
        line-height: .8rem
        width: 1.6rem
        &.act
          color: #208AFF 
          border-bottom: 2px solid #208AFF 
          box-sizing: border-box
        text-align: center
    .coupon
      .none
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
      margin: 0 .3rem
      padding: 1.0rem  0  1.1rem
      flex: 1
      .coupon_list
        margin-bottom: .2rem
    .finish
      position: fixed
      top: 0
      right: 0.3rem
      font-size: .34rem
      color: #208AFF
      z-index: 100
      height: .88rem
      line-height: .88rem

</style>