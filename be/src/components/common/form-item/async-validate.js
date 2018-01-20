/**
 * 该函数用于返回对应验证规则的promise对象
 * @param {*} rule 验证规则
 * @param {*} observe 被验证对象
 */
export function asyncValidate(rule, observe, dom) {
  if (rule.required) {
    return validateRequired(rule, observe, dom)
  }
  
  if (rule.type) {
    return validateType(rule, observe, dom)
  }
  
  if (rule.min && rule.max) {
    return validateMinMax(rule, observe, dom)
  }
  
  if (rule.min) {
    return validateMin(rule, observe, dom)
  }
  
  if (rule.max) {
    return validateMax(rule, observe, dom)
  }
}

function validateRequired(rule, observe, dom) {
  return new Promise((resolve, reject) => {
    if (observe.length > 0) {
      resolve(dom)
    } else {
      reject({
        msg: rule.message,
        dom,
      })
    }
  })
}

function validateType(rule, observe, dom) {
  return new Promise((resolve, reject) => {
    if (typeof observe === rule.type) {
      resolve(dom)
    } else {
      reject({
        msg: rule.message,
        dom,
      })
    }
  })
}

function validateMin(rule, observe, dom) {
  return new Promise((resolve, reject) => {
    if (observe.length >= rule.min) {
      resolve(dom)
    } else {
      reject({
        msg: rule.message,
        dom,
      })
    }
  })
}

function validateMax(rule, observe, dom) {
  return new Promise((resolve, reject) => {
    if (observe.length <= rule.max) {
      resolve(dom)
    } else {
      reject({
        msg: rule.message,
        dom,
      })
    }
  })
}

function validateMinMax(rule, observe, dom) {
  return new Promise((resolve, reject) => {
    if (
      observe.length >= rule.min
      && observe.length <= rule.max
    ) {
      resolve(dom)
    } else {
      reject({
        msg: rule.message,
        dom,
      })
    }
  })
}
