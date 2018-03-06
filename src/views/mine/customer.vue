<template>
  <div class="customer">
    <div class="item" v-for="i in list" @click="$go('customer_detail',{id:i.id})">
      <div class="t flex">
        <div class="l flex">
          <img src="/" alt="">
          <div class="ll">
            <h2 class="color_font f36">{{i.name}}</h2>
            <p class="color_font-s f24">{{i.sex}} {{i.age}}岁</p>
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
        <span>赠送优惠</span>
        <span>拨打电话</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'customer',
    data() {
      return {
        list: [{
          id: 1,
          name: '赵一',
          sex: '男',
          age: '45',
          list:[
            '2016.01.15成为我的客户',
            '2017.01.15完成最近一笔投资',
            '累积年化投资额2,000元'
          ]
        }]
      }
    },
    created() {
    },
    components: {
    },
    methods: {
    },
    watch: {
    }
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
        span
          padding: .08rem .1rem
          border-radius: .08rem
          border: 1px solid rgb(50,153,209)
</style>
