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
  ],
  demos: [
    {
      cover:'http://ovqfmaiul.bkt.clouddn.com/opera_02_trystram_dribbble.jpg',
      title: 'PG Gallery',
      desc: '我的个人图库，图片托管于七牛云。技术上主要采用webpack，html，scss。',
      url: 'http://mvpzx.top/gallery/dist/index.html',
      tags: ['js', 'webpack']
    },

    {
      cover:'http://op2clp53n.bkt.clouddn.com/cover_bg.png',
      title: '问卷在线设计',
      desc: '闲着无聊用angular1.x编写的问卷设计网页。技术上采用原生js、angular一起混写。',
      url: 'http://mvpzx.top/qnaire/',
      tags: ['angular.js', 'js']
    },

    {
      cover:'http://op2clp53n.bkt.clouddn.com/react-todo.PNG',
      title: 'React Todo',
      desc: '使用React + Redux 构建的todo应用demo，用于入门react和redux。',
      url: 'http://mvpzx.top/react-redux-todo/build/index.html',
      tags: ['react', 'redux']
    },
  ]
}

const getSlogan = () => ({ type: 'GET_SLOGAN' })
const getContact = () => ({ type: 'GET_CONTACT' })
const getDemo = () => ({ type: 'GET_DEMO' })

export const author = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CONTACT":
      return state.contactMe
    
    case "GET_DEMO":
      return state.demos
    
    case 'GET_SLOGAN':
      return state.slogan

    default:
      return state
  }
}
