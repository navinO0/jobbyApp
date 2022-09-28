import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdMarkunreadMailbox} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="super-super-container">
      <div className="sm-header-main-container">
        <div className="header-image-container">
          <Link to="/" className="link-item">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
        </div>
        <ul className="home-job-route-nav-text-container">
          <Link to="/" className="link-item">
            <li>
              <AiFillHome className="header-icons" />
            </li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li>
              <MdMarkunreadMailbox className="header-icons" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              onClick={onClickLogout}
              className="sm-header-logout-btn"
            >
              <FiLogOut className="header-icons" />
            </button>
          </li>
        </ul>
      </div>

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
    </div>
  )
}

export default withRouter(Header)
