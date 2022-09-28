import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    validateusername: true,
    validatepassword: true,
    errorMessage: '',
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password, validatepassword, validateusername} = this.state
    const {history} = this.props

    if (password === '' && username === '') {
      this.setState({validateusername: false, validatepassword: false})
    } else if (username === '') {
      this.setState({validateusername: false, validatepassword: true})
    } else if (password === '') {
      this.setState({validatepassword: false, validateusername: true})
    } else {
      this.setState({validatepassword: true, validateusername: true})
      const userDetails = {username, password}
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        this.setState({errorMessage: `*${data.error_msg}`})
      }
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => {
    const {username, validateusername} = this.state
    const validUser = validateusername ? 'valid-user-name' : 'invalid-user-name'
    return (
      <div className="login-credentials-container">
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <br />
        <input
          className="credential-inputs"
          onBlur={this.onBlurUerName}
          placeholder="Username"
          id="userName"
          type="text"
          onChange={this.onChangeUserName}
          value={username}
        />
        <br />
        <p className={validUser}>*required</p>
      </div>
    )
  }

  onBlurUerName = () => {
    const {username} = this.state
    if (username === '') {
      this.setState({validateusername: false})
    }
  }

  onBlurPassword = () => {
    const {password} = this.state
    if (password === '') {
      this.setState({validatepassword: false})
    }
  }

  renderPassward = () => {
    const {password, validatepassword} = this.state
    const validpass = validatepassword ? 'valid-user-pass' : 'invalid-user-pass'
    return (
      <div className="login-credentials-container">
        <label className="label" htmlFor="password">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onBlur={this.onBlurPassword}
          id="password"
          className="credential-inputs"
          onChange={this.onChangePassword}
        />
        <br />
        <p className={validpass}>*required</p>
      </div>
    )
  }

  render() {
    const {errorMessage} = this.state
    const Token = Cookies.get('jwt_token')
    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-main-container">
          <form className="login-form-card" onSubmit={this.onSubmitForm}>
            <div className="login-website-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="login-website-logo"
              />
            </div>
            {this.renderUserName()}
            {this.renderPassward()}
            <button type="submit" className="submit-button">
              Login
            </button>
            <p className="error-message">{errorMessage}</p>
          </form>
        </div>
      </>
    )
  }
}

export default LoginForm
