<template>
  <div class="customer_detail">
    <div class="head">
      <img src="" alt="" class="icon">
      <h2>{{item.name}}</h2>
      <p>{{item.text}}</p>
    </div>
    <div class="bg">
      <h2 class="title f32 color_font">客户投资背景</h2>
      <ul>
        <li v-for="i in list">
          <h2 class="f28 color_font">{{i.tip1}}</h2>
          <p class="f24 color_font-s">{{i.tip2}}</p>
        </li>
      </ul>
    </div>
    <div class="introduction">

    </div>
    <div class="record">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'customer_detail',
    data() {
      return {
        item: {
          name: '赵一',
          sex: '男',
          age: '45'
        },
        list:[{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
        },{
          tip1: '男 45岁',
          tip2: '性别&年龄'
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
  .customer_detail
    padding: .42rem
    height: 100%
    background: #f1f1f9

</style>
