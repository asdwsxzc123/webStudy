import { useEffect } from 'react'

import axios from 'axios'

import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'
import getCofnig from 'next/config'

const { publicRuntimeConfig } = getCofnig()

import { add } from '../store/store'

const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete',
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

// Router.events.on('routeChangeStart', (...args) => console.log(args))
// Router.events.on('routeChangeComplete', (...args) => console.log(args))
// Router.events.on('routeChangeError', (...args) => console.log(args))
// Router.events.on('beforeHistoryChange', (...args) => console.log(args))
// Router.events.on('hashChangeStart', (...args) => console.log(args))
// Router.events.on('hashChangeComplete', (...args) => console.log(args))

const Index = ({ counter, username, rename, add }) => {
  function gotoTestB() {
    Router.push(
      {
        pathname: '/test/b',
        query: {
          id: 2,
        },
      },
      '/test/b/2',
    )
  }

  useEffect(() => {
    axios.get('/api/user/info').then(resp => console.log(resp))
  }, [])

  return (
    <>
      <span>Count: {counter}</span>
      <a>UserName: {username}</a>
      <input value={username} onChange={e => rename(e.target.value)} />
      <button onClick={() => add(counter)}>do add</button>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登录</a>
    </>
  )
}

Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3))
  return {}
}

export default connect(
  function mapStateToProps(state) {
    return {
      counter: state.counter.count,
      username: state.user.username,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      add: num => dispatch({ type: 'ADD', num }),
      rename: name => dispatch({ type: 'UPDATE_USERNAME', name }),
    }
  },
)(Index)
