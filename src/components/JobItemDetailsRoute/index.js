import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookie from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'
import {MdLocalPostOffice} from 'react-icons/md'
import {AiTwotoneStar} from 'react-icons/ai'

import Header from '../Header/index'

import SimilarJobCard from '../SimilarJobCard/index'

import './index.css'

const getApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsItemDetailsRoute extends Component {
  state = {
    jobDetails: {},
    apistatus: getApiStatus.initial,
    similarJobs: [],
    lifeAtCompany: {},
    conjuSkills: [],
  }

  componentDidMount() {
    this.getEachJobDetails()
  }

  getEachJobDetails = async () => {
    console.log(this.props)
    this.setState({apistatus: getApiStatus.inProgress})
    const Token = Cookie.get('jwtToken')
    const history = this.props
    const {match} = history
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      Method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }
      const updatedSimilarJobs = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const updatedConjuSkills = data.similar_jobs.map(eachOne => ({
        companyLogoUrl: eachOne.company_logo_url,
        employmentType: eachOne.employment_type,
        id: eachOne.id,
        jobDescription: eachOne.job_description,
        location: eachOne.location,
        rating: eachOne.rating,
        title: eachOne.title,
      }))
      const lifeAtCompanyUpdated = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      this.setState({
        jobDetails: updatedDetails,
        similarJobs: updatedSimilarJobs,
        lifeAtCompany: lifeAtCompanyUpdated,
        conjuSkills: updatedConjuSkills,
        apistatus: getApiStatus.success,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  onClickRetry = () => {
    this.getEachJobDetails()
  }

  renderReactLoader = () => (
    <div className="job-details-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-failure-viw-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-view-img"
      />
      <h1 className="job-details-failure-view-title">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-view-description">
        We Cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="job-details-failure-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs, lifeAtCompany, conjuSkills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    return (
      <>
        <div className="job-item-details-main-container">
          <div className="list-item-container">
            <div className="company-img-name-star-container">
              <div className="company-logo">
                <img
                  src={companyLogoUrl}
                  alt="company logo"
                  className="company-logo-img"
                />
              </div>
              <div className="star-rating-title-container">
                <p className="company-name">title</p>
                <div className="star-rating-container">
                  <AiTwotoneStar className="star-icon" />
                  <p className="rating-in-num">{rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="location-job-type-salary-container">
                <div className="location-icon-location-container">
                  <IoLocationSharp className="location-type-icons" />
                  <p className="job-location">{location}</p>
                </div>
                <div className="job-type-container">
                  <MdLocalPostOffice className="location-type-icons" />
                  <p className="job-type-text">{employmentType}</p>
                </div>
                <div className="salary-package">
                  <p className="salary-package">{packagePerAnnum}</p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="description-container">
                <p className="job-card-description-heading">Description</p>
                <p className="job-card-description">{jobDescription}</p>
              </div>
              <div className="skills-container">
                <h1 className="skills-heading">Skills</h1>
                <ul className="skills-list-container">
                  {similarJobs.map(each => (
                    <li key={each.name} className="skills-imgs-list-item">
                      <img
                        src={each.imageUrl}
                        alt={each.name}
                        className="skill-img"
                      />
                      <p className="skill-name-text">{each.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="life-at-company-container">
                <h1 className="life-at-company-heading">Life at Company</h1>
                <div className="description-img-container">
                  <p className="life-at-description">
                    {lifeAtCompany.description}
                  </p>
                  <img
                    src={lifeAtCompany.imageUrl}
                    alt="life at company"
                    className="life-at-img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="similar-jobs-container">
            <ul className="similar-jobs-list-container">
              {conjuSkills.map(eachOne => (
                <SimilarJobCard key={eachOne.id} eachOne={eachOne} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderJobDetailsUi = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'IN_PROGRESS':
        return this.renderReactLoader()
      case 'SUCCESS':
        return this.renderJobDetails()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetailsUi()}
      </div>
    )
  }
}

export default JobsItemDetailsRoute
