import Header from '../Header/index'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-failure-viw-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="failure-view-img"
      />
      <h1 className="failure-view-title">Page Not Found</h1>
      <p className="failure-view-description">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
