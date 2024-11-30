import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', errroMsg: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errroMsg => {
    this.setState({showErrorMsg: true, errroMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin: pin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {userId, pin, showErrorMsg, errroMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="app-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="form-container" onSubmit={this.onSubmitLoginForm}>
            <h1 className="heading-text">Welcome Back!</h1>
            <div className="input-container">
              <label className="label" htmlFor="userid">
                User ID
              </label>
              <input
                id="userid"
                className="input"
                value={userId}
                onChange={this.onChangeUserId}
                placeholder="Enter User ID"
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                id="pin"
                className="input"
                value={pin}
                onChange={this.onChangePassword}
                placeholder="Enter PIN"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errroMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
