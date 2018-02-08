/** 
 * DOMContentLoaded不同的浏览器对其支持不同，所以在实现的时候我们需要做不同浏览器的兼容:
 * 1）支持DOMContentLoaded事件的，就使用DOMContentLoaded事件
 * 2）IE6、IE7不支持DOMContentLoaded，但它支持onreadystatechange事件，该事件的目的是提供与文档或元素的加载状态有关的信息
 * 3) 更低的ie还有个特有的方法doScroll， 通过间隔调用：document.documentElement.doScroll("left");
      可以检测DOM是否加载完成。 当页面未加载完成时，该方法会报错，直到doScroll不再报错时，就代表DOM加载完成了。该方法更接近DOMContentLoaded的实现。
 */
export function domContentLoaded(fn) {
  const handler = fn
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      document.removeEventListener('DOMContentLoaded', handler, false)
      fn()
    }, false)
  } else if (document.attachEvent) { // IE
    // 当页面是在iframe中加载时
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'completed') {
        document.detachEvent('onreadystatechange', handler)
        fn()
      }
    })

    // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
    if (document.documentElement.doScroll && typeof window.frameElement === 'undefined') {
      try {
        document.documentElement.doScroll('left')
      } catch (e) {
        return setTimeout(handler, 20)
      }

      fn()
    }
  }
}
