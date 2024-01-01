<template>
	<view class="form">
		<uni-forms ref="form" :model="baseFormData" labelWidth="75px" :rules="rules">
			<uni-forms-item label="需求标题:" name="title">
				<uni-easyinput v-model="baseFormData.title" placeholder="请输入需求标题" />
			</uni-forms-item>
			<uni-forms-item label="需求类型:" name="type">
				<uni-data-select v-model="baseFormData.type" :localdata="sorts"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="取货地:" name="quAddress" v-if="baseFormData.type == 1">
				<uni-easyinput v-model="baseFormData.quAddress" placeholder="请输入取货地" />
			</uni-forms-item>
			<uni-forms-item label="收货地:" name="shouAddress" v-if="baseFormData.type == 1">
				<uni-easyinput v-model="baseFormData.shouAddress" placeholder="请输入收货地" />
			</uni-forms-item>
			<uni-forms-item label="结束时间:" name="endTime">
				<uni-datetime-picker type="datetime" v-model="baseFormData.endTime" />
			</uni-forms-item>
			<uni-forms-item label="描述:" name="description">
				<uni-easyinput type="textarea" v-model="baseFormData.description" placeholder="请输入描述" />
			</uni-forms-item>
			<uni-forms-item label="赏金:" name="price">
				<uni-easyinput v-model.number="baseFormData.price" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submit" class="button">发布</button>
	</view>
</template>

<script>
	import myRequest from '@/utils/api.js'
	export default {
		data() {
			return {
				// 基础表单数据
				baseFormData: {
					title: '',
					quAddress: '',
					shouAddress: '',
					description: '',
					endTime: '',
					type: 1,
					price: 0,
					userId: uni.getStorageSync('loginId'),
				},
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
				sorts: [],
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
		onLoad() {
			this.getType()
		},
		methods: {
			submit() {
				this.$refs.form.validate().then(res => {
					myRequest({
						url: '/xuqiu/save',
						method: 'POST',
						data: this.baseFormData
					}).then((res) => {
						if(res.code == 0){
							uni.navigateBack()
						}
					})
				})
			},
			getType() {
				myRequest({
					url: '/xuqiuType/list'
				}).then((res) => {
					let len = res.data.length
					for(let i=0; i<len; i++){
						this.sorts.push({value: res.data[i].id, text: res.data[i].name})
					}
					console.log(this.sorts)
				})
			}
		}
	}
</script>

<style lang="scss">
	.form {
		margin: 40px 15px;
		padding: 8px;
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
