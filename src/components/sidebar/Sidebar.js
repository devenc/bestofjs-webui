import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import TagMenu from './TagMenu'
import LoggedinUser from './LoggedinUser'
import AnonymousUser from './AnonymousUser'
import Counter from './Counter'

import image from '../../svg/logo-5colors.svg'

const sidebarBgColor = '#421729'

const Nav = styled.nav`
  background-color: ${sidebarBgColor};
`

const SubMenu = styled.div`
  padding: 0.8em 1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`

const SubMenuHeader = styled.div`
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 0.5em;
  font-size: 1em;
`

const Item = styled(NavLink)`
  display: block;
  position: relative;
  padding: 1em;
  color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  &.active,
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    text-decoration: none;
  }
`
const ExternalLink = Item.withComponent('a')

const LoginBlock = styled.div`
  background-color: #9c0042;
  height: 112px;
  display: flex;
  align-items: flex-end;
  color: #fff;
  padding: 0;
  background: #ffe38c url(${image}) right no-repeat;
  &.anonymous {
    align-items: center;
    color: #570025;
  }
  > div {
    flex: 1;
  }
`

const Sidebar = ({
  allTags,
  popularTags,
  auth,
  authActions,
  projectCount,
  hofCount,
  requestCount,
  selectedTag
}) => {
  const myProjectsCount = auth && auth.myProjects && auth.myProjects.length
  return (
    <Nav id="menu" className="slideout-menu">
      <LoginBlock
        className={`sidebar-login-block ${
          auth.username ? 'loggedin' : 'anonymous'
        }`}
      >
        {auth.username ? (
          <LoggedinUser
            username={auth.username}
            onLogout={authActions.logout}
            pending={auth.pending}
          />
        ) : (
          <AnonymousUser onLogin={authActions.login} pending={auth.pending} />
        )}
      </LoginBlock>
      <div className="ui vertical menu">
        <Item to="/" className="item" exact activeClassName="active">
          HOME
        </Item>
        <Item to="/projects" className="item" activeClassName="active">
          ALL PROJECTS
          <Counter count={projectCount} />
        </Item>
        <Item to="/hall-of-fame" className="item" activeClassName="active">
          HALL OF FAME
          <Counter count={hofCount} />
        </Item>
        {auth.username && (
          <Item to="/myprojects" className="item" activeClassName="active">
            MY PROJECTS
            <Counter count={myProjectsCount} />
          </Item>
        )}
        {auth.username && (
          <Item to="/requests" className="item" activeClassName="active">
            MY REQUESTS
            <Counter count={requestCount} />
          </Item>
        )}
        <SubMenu className="item">
          <SubMenuHeader>POPULAR TAGS</SubMenuHeader>
          <TagMenu tags={popularTags} selectedTag={selectedTag} />
        </SubMenu>
        <SubMenu className="item">
          <SubMenuHeader>ALL TAGS</SubMenuHeader>
          <TagMenu tags={allTags} selectedTag={selectedTag} />
        </SubMenu>
        <Item to="/about" className="item" activeClassName="active">
          ABOUT
        </Item>
        <ExternalLink url="https://risingstars.js.org/" className="item">
          RISING STARS
        </ExternalLink>
      </div>
    </Nav>
  )
}

export default Sidebar

// const x = () => <div>side</div>
// export default x
