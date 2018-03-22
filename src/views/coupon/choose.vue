<template>
  <div class="coupon_choose">
    <ul class="nav flex f32">
      <li v-for="(i,index) in nav" @click="choose(i,index)" :class="[index===act?'act color_main':'color_font-s']">{{i.name}}({{i.size}})</li>
    </ul>
    <div class="coupon p4" :class="[!res.length?'none':'']">
      <Coupon v-for="(i,index) in res" :data="i" :key="index" class="coupon_list" :checked="!act"  @checkedCb="checkedCb(i,index)" ref="coupon"/>
      <div v-if="!res.length" class="nothing f32 color_font">暂无{{nav[act].name}}券</div>
    </div>
    <button class="btn" @click="submit">选取</button>
  </div>
</template>

<script>
  import Coupon from '@/components/coupon/coupon'
  import { mapGetters, mapMutations } from 'vuex'
  import { searchCouponList, getCouponBenefit } from '@/service'
  import axios from 'axios'
  import config from '@/config';
  import Api from '@/service/api';
  import {transformRequest} from '@/until'

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
        pageIndex:1, //分页
      }
    },
    components: {
      Coupon,
    },
    computed: {
      ...mapGetters([
        'user',
        'client',
        'coupon'
      ])
    },
    created() {
    	this.SET_COUPON({
          data: []
        });
      this.init();
    },
    mounted() {
      document.body.onscroll = () => {
        if(document.documentElement.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
          if(this.res.length <= 10)return;
          if(this.pageIndex < Math.ceil(this.nav[this.act].size / 10)) return;
          this.pageIndex++;
          this.init();
        }
      }
    },
    methods: {
      ...mapMutations([
        'SET_COUPON',
      ]),
      init(){
      	const {productNo, investAmount} = this.coupon.params;
      	let pageIndex=this.pageIndex;
      	let useType = this.nav[this.act].type;
        searchCouponList({
        	productNo,
        	investAmount,
        	useType,
        	pageIndex
        }).then(res=>{
          this.res = this.res.concat(r.couponList);
          this.nav[0].size=res.availableNum;
          this.nav[1].size=res.disabledNum;
        }).catch(err=>{
          this.res = []
        })
      },
      /**
       * 菜单栏
       */
      choose(i,index){
        if(this.act===index)return;
        window.scroll(0, 0);
        this.act = index;
        this.pageIndex = 1; // 切换菜单重置pageIndex
        this.init(i);
      },
      /**
       * 选取勾选框的回调
       */
      checkedCb(current, index){
        // 没有数据直接push
        if(!this.couponlist.length){
          this.couponlist.push(current)
          return
        }
        // 判断需不需要删除
        if(this.isDel(current)) return;
        // 直接获取最后一个元素做对比
        let end = this.couponlist[this.couponlist.length-1];
        // 类型相同做同类对比
        if(current.type === end.type){
          this.logic(current, end, index, 'isSameOverlap','此券不允许同类叠加');
          return
        }
        // 做异类对比
        this.logic(current, end, index, 'isDifferentOverlap','此券不允许异类叠加');
      },
      /**
       * 判断是否删除元素,
       */
      isDel(current){
        let i = this.couponlist.findIndex(t=>t.receiveNo===current.receiveNo);
        // 元素存在则删除，不存在再继续判断需要不需要添加
        if(i>-1){
          this.couponlist.splice(i,1);
          return true
        }
        return false
      },
      /**
       * 主要逻辑
       * @param current         // 当前值
       * @param end             // 最后一个值
       * @param index           // 当前index
       * @param attr   判断属性
       * @param msg    提示信息
       */
      logic(current, end, index, attr,msg){
        // 首先把当前值和最后一个值组成新的数组
        let arr =  [...[current],...[end]];
        // 然后获取这个数组里面有没有当前判断类型的数据
        let hasAttr = arr.filter(t=>t[attr]=='2');
        // 如果没有的话说明，可以直接插入了
        if(!hasAttr.length) {
          this.couponlist.push(current);
          return
        };
        // 没有的话取消勾选框，同时提示
        this.$refs.coupon[index].check = false;
        this.$toask(msg);
      },
      submit(){
        const bidNo = this.$route.query.bidNo;
        const linkType = this.$route.query.linkType;
        // 没有选择的直接返回
        if(!this.couponlist.length){
          this.$toask('您没有选择优惠券!');
          this.$go(this.coupon.backurl,{bidNo,linkType}, true);
          return
        }
        // 优惠券数据存入状态管理中
        this.SET_COUPON({
          data: this.couponlist
        });
        // 选取优惠接口编辑
        const couponList = this.couponlist.map(t=>{
            let {couponNo, type, profitRate, isSameOverlap, isDifferentOverlap, receiveNo} = t;
           return {couponNo, couponRate:profitRate, isSameOverlap, isDifferentOverlap, receiveNo, couponType:type};
        });
        // 不知道为什么用封装的不行，传参有问题，只能拿出来单独传了，参数还需要url编码下
        axios.get(`${config.url}${Api.getCouponBenefit}?client=${this.client}&userToken=${this.user.userToken}&couponList=${encodeURIComponent(JSON.stringify(couponList))}`)
          .then( r=> {
              r = r.data;
            if (r.code === '100') {
              let res = r.result;
              // 参数编辑
              const params = {
                bidNo,
                linkType,
                ...res
              };
              // 有结果传到backurl中
              this.$go(this.coupon.backurl,params)
            } else {
              if(r.code === '1000'){
                this.$go('/login','',true)
              }
              this.$toask(r.message)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
      padding-bottom: 1.3rem
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
