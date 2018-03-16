<template>
  <div class="riskTest p4" :style="{'padding-bottom':act && act<list.length?'1.1rem':''}">
    <div class="item" v-for="(i, index) in list" v-show="index===act">
      <div class="q">
        <h2 class="color_main">{{i.q}}</h2>
        <p class="color_main">{{index+1<10?'0'+(index+1):index+1}}<span class="f28 color_font-s">/{{list.length}}</span></p>
      </div>
      <ul class="a">
        <li class="color_font f32 border-b" v-for="(j, sub_index) in i.a" @click="choose(sub_index)">{{['A','B','C','D','E'][sub_index]}}. {{j}}</li>
      </ul>
    </div>
    <button class="btn prev" v-show="act && act<list.length" @click="prev">{{res.length===list.length?'查看我的评测结果':'上一题'}}</button>
  </div>
</template>

<script>
  import { userReskEvaluation } from '@/service'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'riskTest',
    data() {
      return{
        act: 0,                                 // 显示的当前问题
        list:[{
          q: '您的年龄是？',
          a: ['18-28岁（3）','28-55岁（5）','56-65岁（2）','60岁以上（1）'],
        },{
          q: '你的家庭年收入（折合人民币）？',
          a: ['5万元以下（1）','5-20万元（2）','20-50万（6）','50-100万（8）','100万以上（10）'],
        },{
          q: '在您每年的家庭收入中，可用于金融投资（储蓄存款除外）的比例是？',
          a: ['小于10%（2）','10%至25%（4）','25%至50%（6）','大于50%（10）'],
        },{
          q: '以下哪项最能说明您的投资经验？',
          a: ['除存款、国债外，我几乎不投资其他金融产品（0）','大部分投资于存款、国债等，较少投资于股票、基金等风险产品（2）','资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等（6）','大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债（10）'],
        },{
          q: '您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？',
          a: ['没有经验（0）','有经验，但少于2年 （2）','2至5年（6）','5至8年（8）','8年以上（10）'],
        },{
          q: '本金30万元，不提供保本承诺的情况下，您会选择哪一种投资机会？',
          a: ['有100%的机会赢取1000元现金，并保证归还（0）','有50%的机会赢取2万元现金，并有较高可能性归还本金（4）','有25%的机会赢取15万元现金，并有一定的可能性损失本金（6）','有10%的机会赢取30万元现金，并有较高可能性损失本金（10）'],
        },{
          q: '投资于理财、股票、基金等金融投资品(不含存款和国债)时，您可接受的最长投资期限是多久？',
          a: ['1年以下（4）','1-3年（6）','3-5年（8）','5年以上（10）'],
        },{
          q: '您的投资目的是？',
          a: ['资产保值（2）','资产稳健增值（6）','资产迅速增值（10）'],
        },{
          q: '以下哪项描述最符合您的投资态度？',
          a: ['厌恶风险，不希望本金损失，希望获得稳定回报（0）','保守投资，不希望本金损失，愿意承担一定幅度的收益波动 （4）','寻求资金的较高收益和成长性，愿意为此承担有限本金损失（8）','希望赚取高回报，愿意为此承担较大本金损失（10）'],
        },{
          q: '您的投资出现何种程度的波动时，您会呈现明显的焦虑？',
          a: ['本金无损失，但收益未达预期（0）','出现轻微本金损失（1）','本金10%以内的损失（5）','本金20-50%的损失（10）','本金50%以上损失（15）'],
        }],
        res: [] // 最终的结果列表
      }
    },
    computed: {
      ...mapGetters([
        'client'
      ])
    },
    created() {
      this.RESET('succ_page');
    },
    methods: {
      ...mapMutations([
        'RESET',
        'SET_SUCC_PAGE'
      ]),
      /**
       * 选择选项
       * @param index
       */
      choose(index){
        // 判断边界，如果结果大于等于当前问题列表，不做操作
        if(this.res.length>=this.list.length) return;
        // 选择到下一题默认滚动到顶部
        window.scroll(0,0);
        // 给选择的选项编号，并且存到结果数组中
        this.res.push(['A','B','C','D','E'][index]);
        
         if(this.res.length===this.list.length){
          this.submit();
          return
        }
        
        
        // 判断边界，如果当前的问题列表一个问题，不做操作
        if(this.act===(this.list.length-1)) return;
        // 点击的时候切换当前页面，显示下一个问题
        this.act++;
      },
      /**
       * 上一题
       */
      prev(){
        // 如果是最后一题，点击表示提交
        if(this.res.length===this.list.length){
          this.submit();
          return
        }
        // 选择到上一题默认滚动到顶部
        window.scroll(0,0);
        // 删除最后一个数据
        this.res.pop();
        // 切换到上一题
        this.act--;
      },
      /**
       * 提交
       */
      submit(){
        // 重新编辑参数
        let params = {};
        this.res.forEach((t,i)=>{
          i++;
          params[`answer${i}`] = i+t
        });
        // 调用结果接口
        userReskEvaluation(params).then(r=>{
          const {sumScore, investType, investAmount, endurance} = r;
          const investType_res = ['激进型','进取型','稳健性','谨慎性','保守型'][parseInt(investType)-1];
          const investAmount_res = ['投资金额无上限','500W','300W','400W','0'][parseInt(investAmount)-1];
          const endurance_res = ['风险承受能力很高','风险承受能力较高','风险承受能力一般','风险承受能力较低','风险承受能力极低'][parseInt(endurance)-1];
          const sub_backurl = this.$route.path;
          // 传到成功页面的参数
          let page_params = {
            "title": sumScore+'分',
            "sub_title": '评测结果: '+investType_res,
            "btn_text": "我已了解，立即买入",
            "backurl": "/product",
            "sub_btn_text": "重新评测",
            "sub_backurl": sub_backurl
          };
          // 如果有client参数，表示是原生调用，去除不显示的参数
          if(this.$route.query.client){
            delete page_params.btn_text;
            delete page_params.backurl;
            delete page_params.sub_btn_text;
            delete page_params.sub_backurl;
          }
          this.SET_SUCC_PAGE(page_params);
          this.$go('/static/succ');
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  .riskTest
    height: auto
    min-height: 100vh
    background: #fff
    .item
      padding: .4rem 0
      .q
        display: flex
        align-items: center
        p
          align-self: flex-end
          font-size: .48rem
          width: 1rem
        h2
          font-size: .48rem
          flex: 1
          padding: .4rem 0
          line-height: .66rem
      .a
        margin-top: .4rem
        li
          &:active
            background: rgba(218, 218, 218, 0.5)
          display: flex
          align-items: center
          height: 2.14rem
          line-height: .4rem
    .btn.prev
      position: fixed
      bottom: 0
      right: 0
      left: 0
</style>
