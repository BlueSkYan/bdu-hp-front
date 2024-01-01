const BASE_URL = 'http://localhost:10000'

export default function myRequest(options){
	const tokenName = uni.getStorageSync('tokenName'); // 从本地缓存读取tokenName值
	const tokenValue = uni.getStorageSync('tokenValue'); // 从本地缓存读取tokenValue值
	let header = {
		"content-type": "application/json"
	};
	if (tokenName != undefined && tokenName != '') {
		header[tokenName] = tokenValue;
	}
	const promise = new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: header,
			data: options.data || {},
			success: (res) => {
				if (res.data.code == 303) {
					uni.showToast({
						title: '请先登录',
						icon: 'error'
					})
					setTimeout(function(){
						uni.navigateTo({
							url: '/pages/login/login'
						})
					},1000)
				}
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
	return promise
}
