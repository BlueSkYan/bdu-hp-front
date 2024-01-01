<template>
	<view class="wp">
		<view class="header">
			<view class="txt-xh">
				<view class="h3">
					¥{{reward}}
				</view>
				<text>可提现金额(元)</text>
				<text class="s2">?</text>
			</view>
		</view>
		<view class="boe">
			<view class="m-about">
				<view class="h3">
					提现金额
				</view>
				<view class="num">
					<view class="desc">￥</view> <text>每日最高提现</text>
					<input class="inp" placeholder="请输出金额" type="number">

				</view>
				<view class="boe">
					<text>提现至</text>
					<text class="s1">微信零钱</text>
				</view>
				<view class="g-queding-kx">
					<view class="txt">
						<view class="s1">提现</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="txt-xh1">
				<view class="tit">
					<view class="h3">
						说明：
					</view>
					<view class="info">
						1.<text>可提现金额</text>=收益的“整数”金额
					</view>
					<view class="info">
						2.<text>每日受益</text>：每日累计可提现受益200元，提现的受益
						到微信零钱
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reward: null
			}
		},
		onLoad(e) {
			this.reward = e.reward
		}
	}
</script>

<style>
	.header {
		background-color: #5199ff;
		position: relative;
		height: 400rpx;
	}

	.txt-xh {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
	}

	.txt-xh .h3 {
		font-weight: bold;
		color: #fff;
		margin-bottom: 5rpx;
		font-size: 52rpx;
		text-align: center;
	}

	.txt-xh text {
		color: #fff;
		font-size: 24rpx;
	}

	.txt-xh .s2 {
		border: 1px solid #fff;
		border-radius: 50%;
		display: inline-block;
		margin-left: 15rpx;
		font-size: 14rpx;
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
	}

	.m-about {
		margin: 0 40rpx;
		padding: 20rpx 40rpx;
		margin-top: -80rpx;
		background-color: #fff;
		border-radius: 10rpx;
		position: relative;
		z-index: 99;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
		margin-bottom: 140rpx;
	}

	.m-about .h3 {
		font-size: 28rpx;
		margin-bottom: 25rpx;
	}

	.m-about .num {
		margin-bottom: 35rpx;
		border-bottom: 1px solid #f2f2f2;
	}

	.m-about .num .desc {
		float: left;
		font-size: 24rpx;
		margin-bottom: 15rpx;
	}

	.m-about .num text {
		float: right;
		color: #5199ff;
		font-size: 24rpx;
		margin-bottom: 15rpx;
	}

	.m-about .boe {
		overflow: hidden;
		margin-bottom: 100rpx;
		color: #666666;
		font-size: 24rpx;
	}

	.m-about .boe text {
		float: left;
	}

	.m-about .boe .s1 {
		float: right;
	}

	uni-input {
		height: 1.4em;
		font-size: 24rpx;
		line-height: 1.4em;
		margin-bottom: 15rpx;
	}

	.g-queding-kx {
		text-align: center;
		background-color: #5199ff;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		border-radius: 10rpx;
		color: #fff;
		width: 100%;
	}

	.txt-xh1 {
		padding: 0 60rpx;
	}

	.txt-xh1 .h3 {
		display: block;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}

	.txt-xh1 .info {
		display: inline-block;
		font-size: 24rpx;
		letter-spacing: 1rpx;
		margin-bottom: 15rpx;
	}

	.txt-xh1 .info text {
		color: #000;
	}

	.txt-xh1 .info {
		color: #666666;

	}

	.txt-xh1 .desc {
		font-size: 28rpx;
		color: #5199ff;
		margin-bottom: 20rpx;
		margin-top: 5rpx;

	}

	.txt-xh1 .desc text {
		margin-right: 85rpx;

	}
</style>
