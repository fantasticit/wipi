/**
 * 该函数用于返回对应验证规则的promise对象
 * @param {*} rule 验证规则
 * @param {*} vm 被验证组件
 */
export function asyncValidate(rule, vm) {
  if (rule.required) {
    return () => validateRequired(rule, vm)
  }
  
  if (rule.type) {
    return () => validateType(rule, vm)
  }
  
  if (rule.min && rule.max) {
    return () => validateMinMax(rule, vm)
  }
  
  if (rule.min) {
    return () => validateMin(rule, vm)
  }
  
  if (rule.max) {
    return () => validateMax(rule, vm)
  }
}

function validateRequired(rule, vm) {
  return new Promise((resolve, reject) => {
    if (vm.currentValue.length > 0) {
      resolve(vm)
    } else {
      reject({
        msg: rule.message,
        vm,
      })
    }
  })
}

function validateType(rule, vm) {
  return new Promise((resolve, reject) => {
    if (typeof vm.currentValue === rule.type) {
      resolve(vm)
    } else {
      reject({
        msg: rule.message,
        vm,
      })
    }
  })
}

function validateMin(rule, vm) {
  return new Promise((resolve, reject) => {
    if (vm.currentValue.length >= rule.min) {
      resolve(vm)
    } else {
      reject({
        msg: rule.message,
        vm,
      })
    }
  })
}

function validateMax(rule, vm) {
  return new Promise((resolve, reject) => {
    if (vm.currentValue.length <= rule.max) {
      resolve(vm)
    } else {
      reject({
        msg: rule.message,
        vm,
      })
    }
  })
}

function validateMinMax(rule, vm) {
  return new Promise((resolve, reject) => {
    if (
      vm.currentValue.length >= rule.min
      && vm.currentValue.length <= rule.max
    ) {
      resolve(vm)
    } else {
      reject({
        msg: rule.message,
        vm,
      })
    }
  })
}
