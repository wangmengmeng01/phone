<template>
  <div class="customer">
    <div class="item" v-for="i in list" v-if="list.length">
      <div class="t flex" @click="$go('customer_detail',{userCode: i.userCode})">
        <div class="l flex">
          <img src="/" alt="">
          <div class="ll">
            <h2 class="color_font f36">{{i.realName}}</h2>
            <p class="color_font-s f24">{{i.sex | sex}} {{i.age}}岁</p>
          </div>
        </div>
        <div class="c">
          <ul>
            <li v-for="j in i.list" class="color_font-s f20">{{j}}</li>
          </ul>
        </div>
        <span class="color_main f24">查询</span>
      </div>
      <div class="b color_main f28 flex">
        <span @click="send_coupon(i)">赠送优惠</span>
        <a  class="color_main" :href="`tel:${i.phone}`">拨打电话</a>
      </div>
    </div>
    <p v-if="!list.length" class="f36 color_font-s center">暂无数据</p>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { searchExistingCustomers } from '@/service'
  export default {
    name: 'customer',
    data() {
      return {
        pageIndex: 1,
        list: []
      }
    },
    created() {
      this.init()
    },
    methods: {
      ...mapMutations([
        'SET_COUPON',
      ]),
      init(){
        searchExistingCustomers({pageIndex: this.pageIndex}).then(r=>{
          this.list = r && r.list
        })
      },
      send_coupon(item){
        const {userCode, realName} = item;
        this.SET_COUPON({
          params:{
            userCode,
            realName
          }
        });
        this.$go('send_discount')
      }
    },
  }
</script>

<style lang="sass" scoped>
  .customer
    padding: .42rem
    height: 100%
    background: #f1f1f9
    .item
      border-radius: .08rem
      padding: .4rem .2rem
      background: #fff
      h2
        margin-bottom: .15rem
      img
        margin-right: .22rem
        width: .96rem
        height: .96rem
        border-radius: 50%
        border: 1px solid red
      .c
        flex: 1
        padding-left: .3rem
        li
          line-height: .36rem
      .b
        margin-top: .46rem
        span, a
          text-decoration: none
          padding: .08rem .1rem
          border-radius: .28rem
          border: 1px solid rgb(50,153,209)
        a
          border: none
          background: #E5E5F4
</style>
