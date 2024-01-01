<template>
	<view class="container">
		<view class="swiper-box">
			<swiper :autoplay="true" :interval="3000" :duration="500" indicator-dots>
				<swiper-item>
					<image src="https://inews.gtimg.com/newsapp_bt/0/13443695823/1000"></image>
				</swiper-item>
				<swiper-item>
					<image src="https://inews.gtimg.com/newsapp_bt/0/13443695823/1000"></image>
				</swiper-item>
				<swiper-item>
					<image src="https://inews.gtimg.com/newsapp_bt/0/13443695823/1000"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="icon-box">
			<uni-icons type="search" size="36"></uni-icons>
			<uni-icons type="camerafill" size="36"></uni-icons>
			<uni-icons type="more" size="36"></uni-icons>
		</view>
		<view class="grid-box">
			<uni-grid :column-num="4">
				<uni-grid-item>
					<uni-icons type="comment" size="32"></uni-icons>
					<text>消息</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icons type="favorfill" size="32"></uni-icons>
					<text>收藏</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icons type="locationfill" size="32"></uni-icons>
					<text>定位</text>
				</uni-grid-item>
				<uni-grid-item>
					<uni-icons type="like" size="32"></uni-icons>
					<text>赞</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="list-box">
			<uni-list>
				<uni-list-item>
					<uni-icons type="noticefill" size="24"></uni-icons>
					<text>通知</text>
					<uni-badge class="list-badge" :content="5"></uni-badge>
				</uni-list-item>
				<uni-list-item>
					<uni-icons type="services" size="24"></uni-icons>
					<text>客服</text>
					<uni-badge class="list-badge" :content="10"></uni-badge>
				</uni-list-item>
				<uni-list-item>
					<uni-icons type="friendfamous" size="24"></uni-icons>
					<text>名人堂</text>
					<uni-badge class="list-badge" :content="3"></uni-badge>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.swiper-box {
		width: 100%;
	}

	.icon-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		margin-top: 20px;
	}

	.grid-box {
		width: 100%;
		margin-top: 20px;
	}

	.list-box {
		width: 100%;
		margin-top: 20px;
	}

	.list-badge {
		margin-left: 10px;
	}
</style>
