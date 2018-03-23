<template>
  <div class="customer_detail">
    <div class="head center">
      <img class="icon place-img" src="/" alt="">
      <h2 class="name f28 color_font">{{item.userName}}</h2>
      <p class="text f24 color_font-s">{{item.beInviteDate}} 成为我的客户</p>
    </div>
    <div class="bg p4">
      <h2 class="title f32 color_font">客户投资背景</h2>
      <ul>
        <li>
          <h2 class="f28 color_font">{{['男','女','未确定'][item.sex-1] || '--'}} {{item.age+'岁' || '--'}}</h2>
          <p class="f24 color_font-s">性别&年龄</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">被展业次数</p>
        </li>
        <li>
          <h2 class="f28 color_font">{{item.investCount+'次' || '--'}}</h2>
          <p class="f24 color_font-s">投资次数</p>
        </li>
        <li>
          <h2 class="f28 color_font">{{['激进型','进取型','稳健型','谨慎型','保守型'][item.endurance-1] || '--'}}</h2>
          <p class="f24 color_font-s">收益偏好</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">风险偏好</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">期限偏好</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">累计收益</p>
        </li>
        <li>
          <h2 class="f28 color_font">{{item.investAmount || '--'}}</h2>
          <p class="f24 color_font-s">最高单笔投资额</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">累积年化投资总额</p>
        </li>
        <li>
          <h2 class="f28 color_font">-</h2>
          <p class="f24 color_font-s">身价估算</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">在平台的资产总额</p>
        </li>
        <li>
          <h2 class="f28 color_font">--</h2>
          <p class="f24 color_font-s">年收入</p>
        </li>
      </ul>
    </div>
    <!--<div class="introduction">-->
  
    <!--</div>-->
    <!--<div class="record">-->
  
    <!--</div>-->
  </div>
</template>

<script>
  import {
    getExistingCustomers
  } from '@/service'
  export default {
    name: 'customer_detail',
    data() {
      return {
        item: {},
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        const userCode = this.$route.query.userCode;
        getExistingCustomers({
          userCode
        }).then(r => this.item = r);
      }
    }
  }
</script>

<style lang="sass" scoped>
  .customer_detail
    padding: .42rem
    height: 100%
    .head
      background: #fff
      padding: .4rem 0 .58rem
      .icon
        height: 1.48rem
        width: 1.48rem
        border-radius: 50%
      .name
        padding: .18rem 0
    .title
      line-height: 1rem
    .bg
      margin-top: .4rem
      background: #fff
    ul
      padding: .38rem 0
      display: flex
      flex-wrap: wrap
      li
        text-align: center
        flex: 33.33%
        box-sizing: border-box
        padding-bottom: .38rem
        border-top: 1px solid #CDCED3
        border-left: 1px solid #CDCED3
        &:nth-child(1), &:nth-child(2), &:nth-child(3)
          border-top: none
        &:nth-child(1), &:nth-child(4), &:nth-child(7), &:nth-child(10)
          border-left: none
        h2
          line-height: .8rem
</style>
