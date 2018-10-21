import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Writers from './Writers'
import { NotFound } from './Errors'
import Layout from './Layout/index'

export default class App extends Component {
  state = {
    writers: []
  }

  async componentDidMount() {
    const writers = await (await fetch('http://localhost:3004/writers?_embed=texts')).json()
    // .then (res=> res.json)
    // .then (writers => this.setState({writers})));
    // )
    this.setState({ writers })
    console.log(writers)
  }

  render() {
    const { writers } = this.state
    return <BrowserRouter>
      <Layout writers = {writers} >
        <Switch>
          <Route exact path="/" render={() => <div> Home </div>} />
          <Route path="/writers" render={
            props => <Writers {...props} writers={writers} />} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  }
}