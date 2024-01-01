<template>
	<view class="list">
		<uni-list>
			<uni-list-item title="需求标题:" :rightText="dataList.title" />
			<uni-list-item title="需求类型:" :rightText="options[dataList.type-1]" />
			<uni-list-item title="取货地:" :rightText="dataList.quAddress" v-if="dataList.quAddress != ''" />
			<uni-list-item title="收货地:" :rightText="dataList.shouAddress" v-if="dataList.shouAddress != ''" />
			<uni-list-item title="结束时间:" :rightText="dataList.endTime" />
			<uni-list-item title="描述:" :rightText="dataList.description" />
			<uni-list-item title="手机号:" :rightText="phoneNumber" />
			<uni-list-item title="状态:" :rightText="status[dataList.status]" />
			<uni-list-item title="赏金:" :rightText="dataList.price + '元'" />
		</uni-list>
		<button class="button" @click="goHelp"
			v-if="dataList.solverId == null && dataList.userId != userId">去帮忙</button>
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
				status: ['未审核','审核通过', '审核未通过'],
				userId: uni.getStorageSync('loginId'),
				phoneNumber: ''
			}
		},
		onLoad(e) {
			this.dataList = JSON.parse(decodeURIComponent(e.dataList))
			console.log(this.dataList)
			this.getPhoneNum()
			this.options = util.getSorts()
		},
		methods: {
			goHelp() {
				myRequest({
					url: '/xuqiu/goHelp',
					data: {
						id: this.dataList.id,
						userId: this.userId,
					}
				}).then((res) => {
					if(res.code == 0){
						uni.reLaunch({
							url: '/pages/help/help?num=1'
						})
					}
				})
			},
			toDel() {
				myRequest({
					url: '/xuqiu/toDel',
					data: {
						id: this.dataList.id
					}
				})
				uni.navigateBack()
			},
			getPhoneNum(){
				myRequest({
					url: '/user/getPhoneNum',
					data: {
						userId: this.dataList.userId
					}
				}).then((res) => {
					this.phoneNumber = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		margin: 40px 15px;
		padding: 10px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 5px #888;
	}

	.button {
		margin-top: 10px;
		background: #2979ff;
		color: #fff;
	}
</style>
