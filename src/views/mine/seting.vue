<template>
	<div class="seting pageCenter">
		<!--<ul class="item">
      <li v-for="i in pwdList" class="m4 flex border-notend-b" @click="$go(i.url)">
        <span class="f32 color_font">{{i.name}}</span>
        <img src="../../assets/common/arrow-right.png" alt="">
      </li>
    </ul>
    <ul class="item">
      <li v-for="i in infoList"  @click="$go(i.url)" class="m4 flex border-notend-b">
        <span class="f32 color_font">{{i.name}}</span>
        <img src="../../assets/common/arrow-right.png" alt="">
      </li>
    </ul>
    <ul class="item">
      <li class="p4">
        <a href="tel:400-088-0888" class="flex border-notend-b">
          <span class="f32 color_font">客服电话 400-088-0888</span>
          <div class="flex">
            <span class="color_main f32 tel">拨打</span>
            <img src="../../assets/common/arrow-right.png" alt="">
          </div>
        </a>
      </li>
    </ul>
    <p class="tip f24 color_font-s">服务时间 9:00-18:00</p>-->
		<div class="seting-div sonDiv borderB" @click="autoInvest">
			<span>自动投标</span>
			<img src="../../assets/common/arrow-right.png" />
		</div>
		<div class="seting-div sonDiv" @click="$go('/mine/account')">
			<span>账户安全</span>
			<img src="../../assets/common/arrow-right.png" />
		</div>
		<div class="seting-div sonDiv maTop borderB" @click="$go('/home/aboutUs?id=1&backTitle=安全保障&forNative=1')">
			<span>安全保障</span>
			<img src="../../assets/common/arrow-right.png" />
		</div>
		<div class="seting-div sonDiv borderB" @click="$go('/home/aboutUs?id=2&backTitle=信息披露')">
			<span>信息披露</span>
			<img src="../../assets/common/arrow-right.png" />
		</div>
		<div class="seting-div sonDiv" @click="$go('/home/aboutUs?id=0&backTitle=关于我们')">
			<span>关于我们</span>
			<img src="../../assets/common/arrow-right.png" />
		</div>
		<div class="seting-div sonDiv maTop">
			<span>版本号</span>
			<span class="color_font-99">V1.0.3</span>
		</div>
		<div class="seting-tips sonDiv">
			<p class="p1 f32 center">客服电话
				<a href="tel:400-088-0888">400-088-0888</a>
			</p>
			<p class="p2 f32 center">工作时间 9:00~18:00</p>
			<p class="p3 f24 center">银行存管账户，为您的资金保驾护航</p>
		</div>
		<button class="btn" @click="$go('/login')">退出登录</button>
	</div>
</template>

<script>
	import {
		getUserStatus,
		userActivate
	} from '@/service'
	
	 import axios from 'axios'
	export default {
		name: 'seting',
		data() {
			return {
				pwdList: [],
				infoList: [],
				statusInfo: '',
				getUserS: {
					"openStatus": true
				},
			}
		},
		created() {
			getUserStatus().then(res => {
				const info = res.result;
				this.statusInfo = res.result;
				switch(parseInt(info.openAccountStatus)) {
					case 1:
						this.getUserS.openStatus = false;
						break;

				}

			});
		},
		components: {},
		methods: {
			autoInvest() {
				if(this.getUserS.openStatus == true) {
//					this.TouserActivate('/wealth/autoInvest');
					
					

				let info = this.statusInfo;
				if(info.openAccountStatus == "1") {
					//未开户
					this.$go('/reg_bank');
				} else if(info.openAccountStatus == "4") {
					//激活

					userActivate({
						retUrl: location.origin + location.pathname
					}).then(res => {
						axios({
							method: 'post',
							url: location.origin + new URL(res.serviceUrl).pathname,
							data: res.inMap,
							transformRequest: [function(data) {
								let ret = '';
								for(let it in data) {
									ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
								}
								return ret.slice(0, ret.length - 1)
							}],
						}).then(r => {
							if(r.status === 200) {
								if(r.data) {
									document.body.innerHTML = r.data;
									setTimeout(() => {
										document.form.submit()
									}, 0)
								}
							}
						})
					})

				} else {
					this.$go('/wealth/autoInvest');
				}

			
				} else {
					this.$go('/reg_bank')
				}
			},
//			TouserActivate(val) {},
		},
		watch: {}
	}
</script>

<style lang="scss" scoped>
	.seting {
		&-div {
			float: left;
			width: 6.9rem;
			height: 1.0rem;
			background-color: #FFFFFF;
			color: #363636;
			font-size: .28rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			img {
				width: .14rem;
				height: .24rem;
				background-size: 100% 100%;
			}
		}
		&-tips {
			float: left;
			text-align: center;
			color: #666666;
			width: 6.9rem;
			.p1 {
				margin: .64rem 0 .26rem;
				a {
					text-decoration: none;
					color: #1E76FD;
				}
			}
			.p2 {
				/*margin: .64rem 0 .26rem;*/
			}
			.p3 {
				margin: 2.0rem 0 1.4rem;
			}
		}
		.maTop {
			margin-top: .2rem;
		}
	}
	
	.btn {
		z-index: 100;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		background: #fff;
		border-radius: 0;
		color: #181818;
		font-size: .36rem;
		color: #FF5513;
	}
</style>