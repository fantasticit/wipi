import { withRouter } from 'next/router'

const ActiveLink = ({ children, router, href }) => {
  const style = {
    color: router.pathname === href ? 'red' : 'black'
  }

  const handleClick = e => {
    e.preventDefalut()
    router.push(href)
  }

  return (
    <a href={href} onClick={e => handleClick(e)} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)
