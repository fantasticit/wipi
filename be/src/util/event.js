export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      element.addEventListener(event, handler, false)
    }
  } else {
    return function (element, event, handler) {
      element.attachEvent('on' + event, handler)
    }
  }
})()

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      element.removeEventListener(event, handler, false)
    }
  } else {
    return function (element, event, handler) {
      element.detachEvent('on' + event, handler)
    }
  }
})()

export const once = function (element, event, handler) {
  let listener = function () {
    if (handler) {
      handler.apply(this, arguments)
    }
    off(element, event, handler)
  }
  on(element, event, listener)
}
