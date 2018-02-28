import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  changeClassify,
  fecthClassifies,
} from '../../redux/reducers/classify'
import Link from 'next/link'
import './styles/nav.scss'

class Nav extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { classifies = [] } = this.props
    if (classifies.length <= 0) {
      console.log(1)
      this.props.fecthClassifies()
    }
  }

  render() {
    const { classifies = {}, selectedClassify, changeClassify } = this.props

    if (classifies.length <= 0) {
      this.props.fecthClassifies()
    }
    
    return(
      <nav className="el-nav">
        <ul className="el-nav__menu">
          {classifies.map((classify, i) => (
            <li key={i}
              onClick={() => changeClassify(classify)}
              className={
                selectedClassify.value === classify.value
                ? 'el-nav__menu-item is-active'
                : 'el-nav__menu-item'
              }>
              <Link 
                as={`/p/${classify.value}`} 
                href={`/post?id=${classify.value}`}
                >
                <a>{ classify.title }</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ classify }) => ({  
  classifies: classify.classifies,
  selectedClassify: classify.selectedClassify 
})

const mapDispatchToProps = dispatch => {
  return {
    fecthClassifies: bindActionCreators(fecthClassifies, dispatch),
    changeClassify: bindActionCreators(changeClassify, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
