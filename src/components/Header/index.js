import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="header">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <button className="logout-button" type="button" onClick={onClickLogoutButton}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
