<template>
  <div class="customer_potential">
    <div class="head p4 flex" @click="$toask('请下载理财师app导入')">
      <img src="../../assets/common/contacts.png" alt="" class="contacts">
      <span class="f32 color_font">从通讯录导入</span>
      <img src="../../assets/common/arrow-right.png" alt="" class="arrow">
    </div>
    <div class="item" v-for="i in list" v-if="list.length">
      <div class="top flex">
        <img src="" alt="" class="icon place-img">
        <div class="text">
          <h2 class="f36 color_font">{{i.customerName}}</h2>
          <p class="f20 color_font-s">{{i.customerPhone}} {{i.createTime | date}}成为潜在客户</p>
        </div>
      </div>
      <div class="bot">
        <a class="color_main f32" :href="`tel:${i.customerPhone}`">拨打电话</a>
      </div>
    </div>
    <div v-if="!list.length" class="nothing f32 color_font"><img src="../../assets/common/nothing_record.png" alt=""><p>暂无潜在客户</p></div>
  </div>
</template>

<script>
  import {
    searchPotentialCustomers,
    getShowBusinessHistory
  } from '@/service'
  export default {
    name: 'customer_potential',
    data() {
      return {
        total: 0,
        pageIndex: 1,
        userCode: '',
        list: [],
      }
    },
    created() {
      this.init()
    },
    mounted() {
      document.body.onscroll = () => {
        if (document.documentElement.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight) {
          this.pageIndex++;
          if (this.pageIndex > Math.ceil(this.total / 10)) return;
          this.init();
        }
      }
    },
    methods: {
      init() {
        searchPotentialCustomers({
          pageIndex: this.pageIndex
        }).then(r => {
          this.list = this.list.concat(r.customerList);
          this.total = r.total;
        })
      }

    }
  }
</script>

<style lang="sass" scoped>
  .customer_potential
    .head
      padding-top: .32rem
      padding-bottom: .32rem
      background: #fff
      .contacts
        height: .72rem
      .arrow
        height: .34rem
    .item
      border-radius: .08rem
      margin: .4rem
      background: #fff
      padding: .4rem .3rem .3rem .2rem
      .top
        height: .96rem
        .icon
          margin-right: .4rem
          width: .96rem
          height: .96rem
        .text
          line-height: 1.5
          flex: 1
      .bot
        margin-top: .4rem
        display: flex
        justify-content: flex-end
        align-items: center
        a
          display: inline-block
          text-align: center
          width: 1.92rem
          height: .56rem
          line-height: .56rem
          border-radius: .28rem
          background: #E5E5F4
          text-decoration: none
</style>
