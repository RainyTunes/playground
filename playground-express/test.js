var request = require('request');
let url = "http://www.baidu.com"
console.log('456')
request.post({url: url, form: {code: ""}}, function(error, response, body) {
	console.log('123')

    if (!error && response.statusCode == 200) {
       console.log(body) // 请求成功的处理逻辑  
    } else {
       console.log(error)
    }
})
while(true){}