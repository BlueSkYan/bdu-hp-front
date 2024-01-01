<template>
	<view class="list">
		<uni-list>
			<uni-list-item title="需求标题:" :rightText="dataList.title" />
			<uni-list-item title="需求类型:" :rightText="options[dataList.type-1]" />
			<uni-list-item title="取货地:" :rightText="dataList.quAddress" v-if="dataList.quAddress != ''" />
			<uni-list-item title="收货地:" :rightText="dataList.shouAddress" v-if="dataList.shouAddress != ''" />
			<uni-list-item title="结束时间:" :rightText="dataList.endTime" />
			<uni-list-item title="描述:" :rightText="dataList.description" />
			<uni-list-item title="手机号:" :rightText="phoneNumber" v-if="tabCur == 1" />
			<uni-list-item title="状态:" :rightText="status[dataList.status]" />
			<uni-list-item title="解决人:" :rightText="dataList.solverId || '无'" v-if="tabCur == 0" />
			<uni-list-item title="赏金:" :rightText="dataList.price + '元'" />
		</uni-list>
		<view style="padding-left: 12px;" v-if="dataList.solverId != null">
			<text>评价：</text>
			<uni-rate :readonly="true" :value="dataList.rate" />
		</view>
		<view v-if="dataList.userId == userId">
			<button class="buttonl" @click="inputDialogToggle" size="mini">编辑</button>
			<button type="warn" class="button" @click="toDel" size="mini">删除</button>
			<button type="primary" class="button" @click="opneRate" size="mini"
				v-if="dataList.solverId != null">评价</button>
		</view>
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog title="修改" @close="close" @confirm="confirm" :before-close="true">
				<uni-forms ref="form" :model="dataList" labelWidth="75px" :rules="rules">
					<uni-forms-item label="需求标题:" name="title">
						<uni-easyinput v-model="dataList.title" placeholder="请输入需求标题" />
					</uni-forms-item>
					<uni-forms-item label="需求类型:" name="type">
						<uni-data-select v-model="dataList.type" :localdata="range"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="取货地:" name="quAddress" v-if="dataList.type == 0">
						<uni-easyinput v-model="dataList.quAddress" placeholder="请输入取货地" />
					</uni-forms-item>
					<uni-forms-item label="收货地:" name="shouAddress" v-if="dataList.type == 0">
						<uni-easyinput v-model="dataList.shouAddress" placeholder="请输入收货地" />
					</uni-forms-item>
					<uni-forms-item label="结束时间:" name="endTime">
						<uni-datetime-picker type="datetime" v-model="dataList.endTime" value="dataList.endTime"
							:border="false" />
					</uni-forms-item>
					<uni-forms-item label="描述:" name="description">
						<uni-easyinput type="textarea" v-model="dataList.description" placeholder="请输入描述" />
					</uni-forms-item>
					<uni-forms-item label="赏金:" name="price">
						<uni-easyinput v-model.number="dataList.price" />
					</uni-forms-item>
				</uni-forms>
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="rateDialog" type="dialog">
			<uni-popup-dialog title="评价" @confirm="confirm">
				<uni-rate v-model="dataList.rate" @change="onChange" />
			</uni-popup-dialog>
		</uni-popup>
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
				status: ['未审核', '审核通过', '审核未通过'],
				userId: uni.getStorageSync('loginId'),
				phoneNumber: '',
				tabCur: null,
				rateValue: 0,
				range: [{
						value: 0,
						text: "跑腿"
					},
					{
						value: 1,
						text: "帮忙"
					},
					{
						value: 2,
						text: "其他"
					},
				],
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '请输入需求标题',
						}, ]
					},
					type: {
						rules: [{
							required: true,
							errorMessage: '请选择类型',
						}, ]
					},
					quAddress: {
						rules: [{
							required: true,
							errorMessage: '请输入取货地址',
						}, ]
					},
					shouAddress: {
						rules: [{
							required: true,
							errorMessage: '请输入收货地址',
						}, ]
					},
					endTime: {
						rules: [{
							required: true,
							errorMessage: '请选择时间',
						}, ]
					},
				}
			}
		},
		onLoad(e) {
			this.dataList = JSON.parse(decodeURIComponent(e.dataList))
			this.tabCur = e.tabCur
			console.log(this.dataList)
			this.getPhoneNum()
			this.options = util.getSorts()
		},
		methods: {
			toDel() {
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: (res) => {
						if (res.confirm) {
							myRequest({
								url: '/xuqiu/toDel',
								data: {
									id: this.dataList.id
								}
							})
							uni.navigateBack()
						} else if (res.cancel) {

						}
					}
				})

			},
			getPhoneNum() {
				myRequest({
					url: '/user/getPhoneNum',
					data: {
						userId: this.dataList.userId
					}
				}).then((res) => {
					this.phoneNumber = res.data
				})
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			confirm() {
				this.$refs.form.validate().then(res => {
					myRequest({
						url: '/xuqiu/update',
						method: 'POST',
						data: this.dataList
					}).then((res) => {
						if (res.code == 0) {
							this.$refs.inputDialog.close()
						}
					})
				})
			},
			close() {
				this.$refs.inputDialog.close()
			},
			opneRate() {
				this.$refs.rateDialog.open()
			},
			onChange(e) {
				this.dataList.rate = e.value
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

	.buttonl {
		margin-top: 10px;
		background: #2979ff;
		color: #fff;
		margin-right: 10px;
	}

	.button {
		margin-right: 10px;
	}
</style>
