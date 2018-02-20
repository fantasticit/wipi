import { Component } from 'react'
import Header from '../components/header'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Header />
        <main>
        { this.props.children }
        </main>
      </div>
    )
  }
}

export default App
