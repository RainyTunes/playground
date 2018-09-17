/**
 * Created by rainywan on 2017/8/12.
 * 【自用】封装了一些常见的可复用的逻辑
 */

/**********
 常用工具方法
 **********/

/**
 * 检查对象是否为[空值]，包括null、undefined、空字符串的情况
 * 传入：object
 * 传出：boolean
 */

const isEmpty = function (o) {
    if (!o) {
        return true
    } else if (typeof o === 'string' && o === '') {
        return true
    } else if (typeof o === 'object' && Object.keys(o).length === 0) {
        return true
    } else if (o.length && o.length === 0) {
        return true
    }
    return false
}

const notEmpty = function (o) {
    return !isEmpty(o)
}

/**
 * 给出上限与下限，产生随机正整数
 * 传入：from, to
 * 传出：左开右闭区间内的随机数
 */

const randomInt = function(from, to) {
    return Math.floor(Math.random() * (to - from) + from)
}

/**
 * 给出字符串长度，产生随机字符的字符串
 * 传入：length字符串长度
 * 传出：生随机字符的字符串
 */

const randomString = function(length) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let ret = "";
    for (let i = 0; i < length; i++) {
        let id = Math.ceil(Math.random() * 35);
        ret += chars[id];
    }
    return ret;
}

/**********
 常用拓展方法
 **********/

/**
 * 插入一个新元素到数组的指定index
 * 传入：index, item
 */

Array.prototype.insert = function(index, item) {  
  this.splice(index, 0, item);  
}; 

/**
 * 查询给定元素在数组中的位置
 * 传入：查询的元素item
 * 传出：item在数组中的index，若数组内没有相同元素则返回-1
 */

Array.prototype.contains = function(item) {
    for (var i = 0; i < this.length; i++) {
        var theItem = this[i]
        if (typeof theItem === typeof item && theItem === item) {
            return i
        }
    }
    return -1
}

Array.prototype.remove = function (item) {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] === item) {
            this.splice(i, 1);
            break
        }
    }
}

Array.prototype.removeAt = function (index) {
    this.splice(index, 1)
}

Array.prototype.removeAll = function (item) {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] === item) {
            this.splice(i, 1);
        }
    }
}

String.prototype.hasPrefix = function (prefix) {
    var index = this.indexOf(prefix);
    return index === 0
}

function generateRandomId(n) {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let date = currentTime.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }

    return year.toString() + month.toString() + date.toString() + '_' + generateMixed(n);
}


function generateMixed(n) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let res = "";
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

const pool = require('./db').dbpool;

const executeSql = (sqlCode, argArray, options) => {
    console.log('\n\n\n######################### executeSql')
    console.log('sqlCode = ' + sqlCode)
    console.log('argArray = ' + JSON.stringify(argArray))
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('######################### error in executeSql connection')
                console.error(err)
                reject(err)
                return
            }
            connection.query(sqlCode, argArray, function (err, rows, fields) {
                if (err) {
                    console.log('######################### error in executeSql query')
                    console.error(err)
                    connection.release()
                    reject(err)
                    return
                }
                console.log('######################### success in executeSql query')
                console.log(JSON.stringify(rows)+ '\n\n\n')
                connection.release()
                if (options && options.selectOneObject) {
                    resolve(rows[0] || {})
                } else {
                    resolve(rows || [])
                }
            })
        })
    });
}

const routerPost = (router, postName, handlerReq, ignoreCheckAuth) => {
    router.post(postName, async (req, res) => {
        try {
            console.log('\n\n\n######################### API: ' + postName)
            console.log(req.body)
            // if (!ignoreCheckAuth) {
            //     let client = require('../thirdparty/client')
            //     await client.checkReqIsValid(req)
            // }
            let data = await handlerReq(req)
            res.json(data)
            console.log('######################### API SUCCESS: ' + postName)
            console.log(data)
        } catch(err) {
            console.error(err)
            res.json({error: err.message})
            console.log('######################### API ERROR: ' + postName + '\n\n\n')
        }
    })
}


Date.prototype.hasPassed = function () {
    let timestamp = this.getTime()
    let nowTimestamp = new Date().getTime()
    return nowTimestamp > timestamp
}

Date.present = function () {
    return new Date()
}

// 时间戳
Date.prototype.getTimestamp = function () {
    return Date.parse(this + '')
}

// 一天的时间长度
Date.oneDay = 1000 * 60 * 60 * 24

// 按格式得到日期字符串
Date.prototype.toFormatString = function (format) {
    //获取年月日时分秒
    let year = this.getFullYear()
    let month = this.getMonth() + 1
    let date = this.getDate()
    let hour = this.getHours()
    let minutes = this.getMinutes()
    let second = this.getSeconds()

    if(month < 10) {
        month = "0" + month
    }
    if(date < 10) {
        date = "0" + date
    }
    if(hour < 10) {
        hour = "0" + hour
    }
    if(minutes < 10) {
        minutes = "0" + minutes
    }
    if(second < 10) {
        second = "0" + second
    }
    // console.log(format)
    if (format === 'yyyy-mm-dd') {
        return year + '-' + month + '-' +date
    } else {
        return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second
    }
}

Date.copy = function (date) {
    let timestamp = date.getTime()
    let d = new Date()
    d.setTime(timestamp)
    return d
}

// 取整，去掉时、分、秒等细节，如2017-11-20，返回字符串信息
Date.prototype.toRoundString = function () {
    let newDate = Date.copy(this)
    newDate.setHours(0, 0, 0, 0)
    return newDate.toFormatString('yyyy-mm-dd')
}

// 取整，去掉时、分、秒等细节，如2017-11-20，仍然返回Date对象
Date.prototype.toRound = function () {
    this.setHours(0, 0, 0, 0)
    return this
}
// 获取今天是星期几，区间[1, 7]
Date.prototype.whatIsTheDay = function () {
    let day = new Date().getDay()
    if(day === 0) {
        day = 7
    }
    return day
}

// 获取今天是几号
Date.prototype.whatIsTheDate = function () {
    return new Date().getDate()
}

// 经过n天的日期的date对象，n可为负，仍然返回Date对象
Date.prototype.pass = function (n) {
    let timestamp = this.getTime()
    return new Date(timestamp + n * Date.oneDay)
}

// 一整天之后
Date.prototype.tomorrow = function () {
    return this.pass(1)
}

// 一整天之前
Date.prototype.yesterday = function () {
    return this.pass(-1)
}

// 24h之后（以当前时间为基准）
Date.tomorrow = Date.present().tomorrow()

// 24h之前（以当前时间为基准）
Date.yesterday = Date.present().yesterday()


// 整数天化的今天，得到date对象
Date.r_today = Date.present().toRound()

// 整数天化的明天，得到date对象
Date.r_tomorrow = Date.tomorrow.toRound()

// 整数天化的昨天，得到date对象
Date.r_tomorrow = Date.yesterday.toRound()

// 整数天化的今天，得到date字符串
Date.r_todayString = Date.present().toRoundString()

// 整数天化的明天，得到date字符串
Date.r_tomorrowString = Date.tomorrow.toRoundString()

// 整数天化的昨天，得到date字符串
Date.r_yesterdayString = Date.yesterday.toRoundString()


module.exports = {
    isEmpty: isEmpty,
    notEmpty: notEmpty,
    randomInt: randomInt,
    randomString: randomString,

    generateMixed: generateMixed,
    generateRandomId: generateRandomId,

    executeSql,
    routerPost,
}