import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import './index.css'

const getApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class ProfileCard extends Component {
  state = {profileDetails: {}, jobType: [], apistatus: getApiStatus.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  onClickRetryBtn = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apistatus: getApiStatus.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const Token = Cookie.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      Method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  onClickMinSalary = event => {
    const {onClickMinSalary} = this.props
    onClickMinSalary(event.target.value)
  }

  onClickJobType = event => {
    const {onUpdateJobType} = this.props
    onUpdateJobType(event.target.value)
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-main-container">
        <div className="profile-img-container">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
        </div>
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <button
      type="button"
      onClick={this.onClickRetryBtn}
      className="profile-return-btn"
    >
      Retry
    </button>
  )

  renderReactLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderUies = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'IN_PROGRESS':
        return this.renderReactLoader()
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderProfile()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-filters-container">
        <div className="render-profile-card-container">{this.renderUies()}</div>

        <hr className="hr-line" />
        <h1 className="container-headings">Type of Employment</h1>
        <div className="filters-container">
          <ul className="employment-type-ul-list-container">
            {employmentTypesList.map(eachOne => (
              <li key={eachOne.employmentTypeId} className="inputs-container">
                <input
                  type="checkbox"
                  id={eachOne.employmentTypeId}
                  onChange={this.onClickJobType}
                  value={eachOne.employmentTypeId}
                  name="employementType"
                />
                <label
                  htmlFor={eachOne.employmentTypeId}
                  className="label-job-card"
                >
                  {eachOne.label}
                </label>
                <br />
              </li>
            ))}
          </ul>
          <hr className="hr-line" />
          <h1 className="container-headings">Salary Range</h1>
          <ul className="salary-ul-list-container">
            {salaryRangesList.map(eachOne => (
              <div key={eachOne.salaryRangeId} className="inputs-container">
                <input
                  type="radio"
                  id={eachOne.salaryRangeId}
                  value={eachOne.salaryRangeId}
                  onClick={this.onClickMinSalary}
                  name="salaryRange"
                />
                <label
                  htmlFor={eachOne.salaryRangeId}
                  className="label-job-card"
                >
                  {eachOne.label}
                </label>
                <br />
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default ProfileCard
