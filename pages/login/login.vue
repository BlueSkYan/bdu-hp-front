<template>
	<view>
		<view class="signinform">
			<view class="container">
				<view class="w3l-form-info">
					<view class="w3_info">
						<h2>登录</h2>
						<uni-forms ref="form" :model="FormData" :rules="rules">
							<uni-forms-item label="学号:" name="username">
								<uni-easyinput v-model="FormData.username" placeholder="请输入学号" />
							</uni-forms-item>
							<uni-forms-item label="密码:" name="password">
								<uni-easyinput type="password" v-model="FormData.password" placeholder="请输入密码" />
							</uni-forms-item>
							<button class="btn btn-primary" @click="submit">登录</button>
						</uni-forms>
						<p class="account">还没有账号? <navigator url="../register/register" class="reg">点击注册</navigator>
						</p>
					</view>
				</view>
			</view>
		</view>
		<view>
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="popup.msgType" :message="popup.messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import util from '@/utils/util.js'
	export default {
		data() {
			return {
				FormData: {
					username: '',
					password: ''
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '请输入学号'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码'
						}]
					}
				},
				popup: {
					type: 'center',
					msgType: 'error',
					messageText: '',
				}
			}
		},
		methods: {
			submit() {
				this.$refs.form.validate().then(res => {
					uni.request({
						url: 'http://localhost:10000/user/login',
						data: this.FormData,
						method: 'POST',
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 0) {
								util.saveToken(res.data.data)
								uni.navigateBack({
									delta: 1
								})
							} else {
								this.popup.messageText = res.data.data
								this.$refs.message.open()
							}
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	// html {
	// 	scroll-behavior: smooth;
	// }

	body,
	html {
		margin: 0;
		padding: 0;
		color: #585858;
	}

	* {
		box-sizing: border-box;
		font-family: 'Kumbh Sans', sans-serif;
	}

	/*  wrapper */
	.wrapper {
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}

	/*  /wrapper */

	.reg {
		display: inline;
		color: #9146ff;
		text-decoration: underline;
	}

	.d-grid {
		display: grid;
	}

	button,
	input,
	select {
		-webkit-appearance: none;
		outline: none;
	}

	button,
	.btn,
	select {
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	ul,
	ol {
		margin: 0;
		padding: 0;
	}

	body {
		background: #f1f1f1;
		margin: 0;
		padding: 0;
	}

	/*-- //Reset-Code --*/

	/*-- form styling --*/
	.signinform {
		// padding: 40px 40px;
		// justify-content: space-bet;
		// display: flex;
		// align-items: center;
	}

	.btn-primary {
		color: #fff;
		background-color: #9146ff;
		margin-top: 30px;
		outline: none;
		width: 100%;
		padding: 15px 15px;
		cursor: pointer;
		font-size: 18px;
		font-weight: 600;
		border-radius: 6px;
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		-ms-border-radius: 6px;
		-o-border-radius: 6px;
		border: none;
		text-transform: capitalize;
	}


	.w3_info h2 {
		display: inline-block;
		font-size: 25px;
		line-height: 35px;
		margin-bottom: 20px;
		font-weight: 600;
		color: #3b3663;
	}


	.w3_info {
		box-sizing: border-box;
		padding: 3em 3.5em;
		background: #fff;
		box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.1);
	}


	.w3l-form-info {
		margin: 40px 0;
	}

	p.account,
	p.account a {
		text-align: center;
		padding-top: 20px;
		padding-bottom: 0px;
		font-size: 16px;
		color: #888;
	}

	.container {
		max-width: 890px;
		margin: 0 auto;
	}
</style>
