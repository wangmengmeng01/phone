<template>
  <div class="coupon_choose">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="coupon p4" :class="[!res.length?'none':'']">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" checked="true"  @checkedCb="checkedCb"/>
      <div v-if="!res.length" class="nothing f32 color_font">暂无可送优惠券</div>
    </div>
    <button class="btn" @click="submit">选取</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { mapGetters, mapMutations } from 'vuex'
  import { searchCouponList } from '@/service'
  export default {
    name: 'coupon_choose',
    data() {
      return {
        act: 0,
        nav: [{
          name: '可用优惠',
          type: '1',
          size: 0
        },{
          name: '不可用优惠',
          type: '2',
          size: 0
        }],
        res: {},
        couponlist: [],
        pageIndex:1,//分页
      }
    },
    components: {
      Coupon,
    },
    computed: {
      ...mapGetters([
        'coupon'
      ])
    },
    created() {
    	this.SET_COUPON({
          data: []
        });
      this.init(this.nav[0]);
    },
    methods: {
    	  ...mapMutations([
        'SET_COUPON',
      ]),

      init(item){
      	const {productNo, investAmount} = this.coupon.params;
      	let pageIndex=this.pageIndex;
        searchCouponList({
        	productNo,
        	investAmount,
        	useType:item.type,
        	pageIndex
        }).then(res=>{
          this.res = res.couponList
          this.nav[0].size=res.availableNum;
          this.nav[1].size=res.disabledNum;

        }).catch(err=>{
          this.res = []
        })
      },
      choose(i,index){
        if(this.act===index)return;
        this.act = index;
        this.init(i);
      },
      checkedCb(data){
        if(data.isSameOverlap == '2'){
          this.$toask('此券不允许同类叠加');
          return
        }
        if(data.isDifferentOverlap == '2'){
          let i=0,len = this.couponlist.length;
          for(;i<len;i++){
            if(this.couponlist[i].couponType != data.couponType){
              this.$toask('此券不允许异类叠加');
              break
            }
          }
        }else{
//          this.couponlist.length
//            ? this.couponlist.concat(this.couponlist.filter(t=>{
//            return t.couponNo !== data.couponNo
//          }))
//            : this.couponlist.push(data)
        }
      },
      submit(){
        const bidNo = this.$route.query.bidNo;
        this.SET_COUPON({
          data: this.couponlist
        });
        this.$go(this.coupon.backurl,{bidNo,linkType:this.$route.query.linkType})
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .coupon_choose
    height: 100%
    padding-bottom: 1.08rem
    .nav
      padding: .2rem
      margin: .4rem .6rem
      li
        padding-bottom: .2rem
        &.act
          border-bottom: 2px solid rgb(50,153,209)
        text-align: center
        flex: 1
    .coupon
      &.none
        padding: 0
        margin: 0
      .nothing
        background: #f1f1f9
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
      margin: auto .2rem
      border-radius: .2rem
      padding-top: .6rem
      padding-bottom: .3rem
      background: #fff
      .coupon_list
        margin-bottom: .4rem
    .btn
      position: fixed
      bottom: 0
      left: 0
      right: 0
      font-size: .36rem
      margin-top: 1rem
      border-radius: 0
</style>
