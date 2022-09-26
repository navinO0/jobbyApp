import {withRouter, Link} from 'react-router-dom'

import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookie.remove('jwtToken')
    history.replace('/login')
  }
  return (
    <div className="header-main-container">
      <div className="header-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </div>
      <div className="home-job-route-nav-text-container">
        <Link to="/" className="link-item">
          <p className="header-nav-item-text">Home</p>
        </Link>
        <Link to="/jobs" className="link-item">
          <p className="header-nav-item-text">Jobs</p>
        </Link>
      </div>
      <button
        type="button"
        onClick={onClickLogout}
        className="header-logout-btn"
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
