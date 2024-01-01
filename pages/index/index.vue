<template>
	<view>
		<view>
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item"></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="tit">
			<h1>需求列表</h1>
		</view>
		<view>
			<uni-card :title="item.title" :sub-title="'可赚：' + item.price + '￥'" :extra="options[item.type-1]"
				@click="onClick(item)" :key="item.id" v-for="item in dataList">
				<text class="uni-body">{{item.description}}</text>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import myRequest from '@/utils/api.js'
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				dataList: null,
				options: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onLoad() {
			this.getList()
			this.options = util.getSorts()
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.getList()
			}, 1000)
			uni.stopPullDownRefresh()
		},
		methods: {
			onClick(item) {
				uni.navigateTo({
					url: '/pages/xuqiu/xuqiu_detail/xuqiu_detail?dataList=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				})
			},
			getList() {
				const res = myRequest({
					url: '/xuqiu/list'
				})
				res.then((data) => {
					this.dataList = data.data
				})

			},
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 400rpx;
	}
	.swiper-item {
		display: block;
		height: 400rpx;
		line-height: 400rpx;
		text-align: center;
	}
	swiper-item:nth-child(1) .swiper-item{
		background-image: url(https://www.bdu.edu.cn/images/quanjign.jpg);
		background-size: cover;
	}
	swiper-item:nth-child(2) .swiper-item{
		background-image: url(https://www.bdu.edu.cn/images/changlang.jpg);
		background-size: cover;
	}
	swiper-item:nth-child(3) .swiper-item{
		background-image: url(https://www.bdu.edu.cn/images/axinxueqi.jpg);
		background-size: cover;
	}
	.tit {
		padding:10px 15px 0px 15px;
		
	}
	.tit h1{
		font-size: 40rpx;
		color: #007AFF;
		border-bottom: 2px solid #cccccc;
	}
</style>
