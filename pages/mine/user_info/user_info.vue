<template>
	<view class="form">
		<uni-forms>
			<uni-forms-item label="学号:">
				<uni-easyinput v-model="userInfo.username" disabled />
				<p>学号不可更改</p>
			</uni-forms-item>
			<uni-forms-item label="手机号:">
				<uni-easyinput/>
			</uni-forms-item>
			<uni-forms-item label="头像:" name="image">
				<uni-file-picker :value="images" :limit="1" title="选择一张图片" :auto-upload="false" @select="select">
				</uni-file-picker>
			</uni-forms-item>
		</uni-forms>
		
		<button @click="upload" class="button">修改</button>
	</view>
</template>

<script>
	import myRequest from '@/utils/api.js'
	export default {
		data() {
			return {
				file: {},
				userInfo: {},
				images: [{
					url: ''
				}],
			}
		},
		onLoad(e) {
			this.userInfo = JSON.parse(decodeURIComponent(e.userInfo))
			this.images[0].url = this.userInfo.userImage
		},
		methods: {
			select(e) {
				console.log(e)
				this.file = e
			},
			upload() {
				uni.uploadFile({
					url: 'http://localhost:10000/userInfo/upload',
					filePath: this.file.tempFilePaths[0],
					name: 'file',
					formData: {
						userId: uni.getStorageSync('loginId')
					}
				})
				uni.navigateBack()

			}
		}
	}
</script>

<style>
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
