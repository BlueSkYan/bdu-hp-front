<template>
	<view>
		<view>
			<view class="ct_tab">
				<view class="ct_item" @click="clickCtTab(0)" :class="{'ct_active': tabCur == 0}">我发布的</view>
				<view class="ct_item" @click="clickCtTab(1)" :class="{'ct_active': tabCur == 1}">我帮助的</view>
			</view>
			<view v-if="tabCur == 0" style="margin-top: 70px;">
				<uni-card :title="item.title" :sub-title="'可赚：' + item.price + '￥'" :extra="options[item.type-1]"
					@click="onClick(item)" v-for="item in dataList">
					<text class="uni-body">{{item.description}}</text>
				</uni-card>
			</view>
			<view v-if="tabCur == 1" style="margin-top: 70px;">
				<uni-card :title="item.title" :sub-title="'可赚：' + item.price + '￥'" :extra="options[item.type-1]"
					@click="onClick(item)" v-for="item in dataList">
					<text class="uni-body">{{item.description}}</text>
				</uni-card>
			</view>
		</view>
		<view>
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" @fabClick="fabClick" />
		</view>
	</view>
</template>

<script>
	import myRequest from '@/utils/api.js'
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,
				tabCur: 0,
				dataList: null,
				options: []
			}
		},
		onLoad(e) {
			this.clickCtTab(e.num || 0)
			this.options = util.getSorts()
		},
		methods: {
			trigger(e) {
				console.log(e)
				if (e.index == 0) {
					uni.navigateTo({
						url: '/pages/paotui/paotui'
					})
				} else if (e.index == 1) {
					uni.navigateTo({
						url: '/pages/bangmang/bangmang'
					})
				} else if (e.index == 2) {
					uni.navigateTo({
						url: '/pages/qita/qita'
					})
				}
			},
			fabClick() {
				uni.navigateTo({
					url: '/pages/xuqiu/xuqiu'
				})
			},
			clickCtTab(ctCur) {
				this.tabCur = ctCur
				if (ctCur == 0) {
					myRequest({
						url: '/xuqiu/getMySaved',
						data: {
							userId: uni.getStorageSync('loginId')
						}
					}).then((data) => {
						this.dataList = data.data
					})
				} else if (ctCur == 1){
					myRequest({
						url: '/xuqiu/getMySolved',
						data: {
							userId: uni.getStorageSync('loginId')
						}
					}).then((data) => {
						this.dataList = data.data
					})
				}
			},
			onClick(item) {
				uni.navigateTo({
					url: '/pages/xuqiu/my_xuqiu_detail/my_xuqiu_detail?dataList=' + encodeURIComponent(JSON.stringify(item)) + '&tabCur=' + this.tabCur
				})
			}
		},
	}
</script>

<style>
	.ct_tab {
		height: 50px;
		display: flex;
		width: 750rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		/* margin-bottom: 50px; */
	}

	.ct_item {
		/* border: solid; */
		border-bottom: 2px gray solid;
		height: 100%;
		width: 50%;
		/* background: yellow; */
		justify-content: space-around;
		text-align: center;
		line-height: 50px;
		/* border-radius: 10px; */
		background: #fff;
	}

	.ct_item:nth-child(1) {
		border-right: 2px gray solid;
	}

	.ct_active {
		color: #fff;
		background: #007AFF;
		/* border-bottom: 2px #007AFF solid */
	}
</style>
