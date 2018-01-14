/**
 * 该函数用于返回对应验证规则的promise对象
 * @param {*} rule 验证规则
 * @param {*} observe 被验证对象
 */
export function asyncValidate(rule, observe) {
  if (rule.required) {
    return validateRequired(rule, observe)
  } else if (rule.type) {
    return validateType(rule, observe)
  } else if (rule.min && rule.max) {
    return validateMinMax(rule, observe)
  } else if (rule.min) {
    return validateMin(rule, observe)
  } else if (rule.max) {
    return validateMax(rule, observe)
  }
}

function validateRequired(rule, observe) {
  return new Promise((resolve, reject) => {
    if (observe.length > 0) {
      resolve('required pass')
    } else {
      reject(rule.message)
    }
  })
}

function validateType(rule, observe) {
  return new Promise((resolve, reject) => {
    if (typeof observe === rule.type) {
      resolve(`type ${rule.type} pass`)
    } else {
      reject(rule.message)
    }
  })
}

function validateMin(rule, observe) {
  return new Promise((resolve, reject) => {
    if (observe.length >= rule.min) {
      resolve(`min length ${rule.min} pass`)
    } else {
      reject(rule.message)
    }
  })
}

function validateMax(rule, observe) {
  return new Promise((resolve, reject) => {
    if (observe.length <= rule.max) {
      resolve(`max length ${rule.max} pass`)
    } else {
      reject(rule.message)
    }
  })
}

function validateMinMax(rule, observe) {
  return new Promise((resolve, reject) => {
    if (
      observe.length >= rule.min
      && observe.length <= rule.max
    ) {
      resolve(`length between ${rule.min} and ${rule.max} pass`)
    } else {
      reject(rule.message)
    }
  })
}
