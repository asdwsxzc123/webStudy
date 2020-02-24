import { useState, useCallback } from 'react'
import getCofnig from 'next/config'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import axios from 'axios'

import Link from 'next/link'
import {
  Button,
  Layout,
  Icon,
  Input,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from 'antd'

import Container from './Container'

import { logout } from '../store/store'

const { Header, Content, Footer } = Layout

const { publicRuntimeConfig } = getCofnig()

const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
}

const footerStyle = {
  textAlign: 'center',
}

function MyLayout({ children, user, logout, router }) {
  const urlQuery = router.query && router.query.query

  const [search, setSearch] = useState(urlQuery || '')

  const handleSearchChange = useCallback(
    event => {
      setSearch(event.target.value)
    },
    [setSearch],
  )

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`)
  }, [search])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const handleGotoOAuth = useCallback(e => {
    e.preventDefault()
    axios
      .get(`/prepare-auth?url=${router.asPath}`)
      .then(resp => {
        if (resp.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL
        } else {
          console.log('prepare auth failed', resp)
        }
      })
      .catch(err => {
        console.log('prepare auth failed', err)
      })
  }, [])

  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={handleLogout}>
          登 出
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Link href="/">
                <Icon type="github" style={githubIconStyle} />
              </Link>
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {user && user.id ? (
                <Dropdown overlay={userDropDown}>
                  <a href="/">
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Dropdown>
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by Jokcy @
        <a href="mailto:jokcy@hotmail.com">jokcy@hotmail.com</a>
      </Footer>
      <style jsx>{`
        .content {
          color: red;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  )
}

export default connect(
  function mapState(state) {
    return {
      user: state.user,
    }
  },
  function mapReducer(dispatch) {
    return {
      logout: () => dispatch(logout()),
    }
  },
)(withRouter(MyLayout))
