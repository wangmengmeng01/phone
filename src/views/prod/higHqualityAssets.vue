<template>
	<div class="higHqualityAssets">

		<div class="hha-div">
			<p class="hha-div-title f32 color-font ffl">月月赢-12M500G号</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">9.61%</span>
				<span class="ffl">＜5万</span>
				<span class="ffl">募集金额</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl bb">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额</span>
				<span class="ffl">项目期限</span>
			</p>
		</div>

		<div class="hha-div">
			<p class="hha-div-title f32 color-font ffl">月月赢-12M500G号</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">9.61%</span>
				<span class="ffl">＜5万</span>
				<span class="ffl">募集金额</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl bb">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额</span>
				<span class="ffl">项目期限</span>
			</p>
		</div>

		<div class="hha-div">
			<p class="hha-div-title f32 color-font ffl">月月赢-12M500G号</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">9.61%</span>
				<span class="ffl">＜5万</span>
				<span class="ffl">募集金额</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl bb">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额</span>
				<span class="ffl">项目期限</span>
			</p>
		</div>
		<div class="hha-div">
			<p class="hha-div-title f32 color-font ffl">月月赢-12M500G号</p>
			<p class="f32 hha-div-p1 ffl">
				<span class="ffl">9.61%</span>
				<span class="ffl">＜5万</span>
				<span class="ffl">募集金额</span>
			</p>
			<p class="f24 color_font-s hha-div-p2 ffl ">
				<span class="ffl">历史年化</span>
				<span class="ffl">募集金额</span>
				<span class="ffl">项目期限</span>
			</p>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'higHqualityAssets',
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.ffl {
		float: left;
	}
	
	.bb {
		border-bottom: 2px solid #CDCED3;
		box-sizing: border-box;
	}
	
	.higHqualityAssets {
		margin: 0 auto;
		padding: 0;
		width: 7.5rem;
		margin-top: 0.4rem;
		background-color: #FFFFFF;
	}
	
	.hha-div {
		overflow: hidden;
		&-title {
			margin: 0.42rem 0 0 0.6rem;
			height: 0.32rem;
			line-height: 0.32rem;
			width: 6.9rem;
		}
		&-p1 {
			margin: 0.4rem 0.8rem 0.2rem;
			overflow: hidden;
			text-align: center;
			width: 5.9rem;
			span:nth-child(1) {
				width: 1.95rem;
				text-align: left;
			}
			span:nth-child(2) {
				width: 2.0rem;
				text-align: center;
			}
			span:nth-child(3) {
				width: 1.95rem;
				text-align: right;
			}
		}
		&-p2 {
			margin: 0 0.8rem 0;
			overflow: hidden;
			text-align: center;
			width: 5.9rem;
			padding-bottom: 0.6rem;
			span:nth-child(1) {
				width: 1.95rem;
				text-align: left;
			}
			span:nth-child(2) {
				width: 2.0rem;
				text-align: center;
			}
			span:nth-child(3) {
				width: 1.95rem;
				text-align: right;
			}
		}
	}
</style>