/**
 * 邮箱
 * @param {*} s
 */
function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 密码验证
 * @param {*} s
 */
function passwordVal(s) {
  console.log(/^[\d_a-zA-Z]{6,18}$/.test(s))
  return /^[\d_a-zA-Z]{6,18}$/.test(s)
}

/**
 *两位小数验证
 * @param {*} s
 */
function numFloat(s) {
  console.log(/^(-)?(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/.test(s))
  return /^(-)?(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/.test(s)
}

/**
 *最多两位小数验证 （小数位不超过2位）
 * @param {*} s
 */
function numFloatTwo(s) {
  console.log(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(s))
  return /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(s)
}

/**
 * 不能汉字
 * @param {*} s
 */
function noWord(s) {
  console.log(/[\u4E00-\u9FA5]/g.test(s))
  return /[\u4E00-\u9FA5]/g.test(s)
}

/**
 * 数字或小数
 * @param {*} s
 */
function numOrnumFloat(s) {
  console.log(/^\d+(\.\d+)?$/.test(s))
  return /^\d+(\.\d+)?$/.test(s)
}

module.exports = {
  Validate: {
    isEmail: isEmail,
    isMobile: isMobile,
    isPhone: isPhone,
    isURL: isURL,
    passwordVal: passwordVal,
    numFloat: numFloat,
    numFloatTwo: numFloatTwo,
    noWord: noWord,
    numOrnumFloat: numOrnumFloat,


  }
}
