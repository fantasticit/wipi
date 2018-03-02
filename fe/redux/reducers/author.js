const initialState = {
  slogan: '前端爱好者，目前是小白',
  contactMe: [
    {
      title: 'github',
      icon: 'github',
      name: 'github/mvpzx',
      path: 'https://github.com/mvpzx'
    },

    {
      title: 'Email',
      icon: 'envelope-o',
      name: 'bken2016@163.com',
      path: 'mailto:bken2016@163.com',
    }
  ]
}

const getSlogan = () => ({ type: 'GET_SLOGAN' })
const getContact = () => ({ type: 'GET_CONTACT' })

export const author = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTACT":
      return state.contactMe
    
    case 'GET_SLOGAN':
      return state.slogan

    default:
      return state
  }
}
