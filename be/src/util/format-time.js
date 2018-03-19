export function formatTime(date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const seconds = date.getSeconds()
  const milliSeconds = date.getMilliseconds()

  const n = num => num > 9 ? num : '0' + num

  return n(year) 
          + '-' + n(month) 
          + '-' + n(day) 
          + ' ' + n(hour) 
          + ':' + n(minute) 
          + ':' + n(seconds) 
          // + '.' + n(milliSeconds)
}