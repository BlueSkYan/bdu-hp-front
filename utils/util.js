function saveToken(data){
	uni.setStorageSync('tokenName', data.tokenName)
	uni.setStorageSync('tokenValue', data.tokenValue)
	uni.setStorageSync('loginId', data.loginId)
} 

import myRequest from '@/utils/api.js'

function getSorts(){
	let arr = []
	myRequest({
		url: '/xuqiuType/list'
	}).then((data) =>{
		for(let i=0; i<data.data.length; i++){
			arr.push(data.data[i].name)
		}
	})
	return arr
}
export default {saveToken, getSorts}