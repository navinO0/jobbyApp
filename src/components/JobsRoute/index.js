import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiSearch} from 'react-icons/bi'
import Cookie from 'js-cookie'
import JobCard from '../JobCard/index'
import Header from '../Header/index'

import ProfileCard from '../ProfileCard'
import './index.css'

const getApiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    jobsData: [],
    apistatus: getApiStatus.initial,
    searchinput: '',
    searchedData: [],
    minsalary: '3000000',
    jobType: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onChangeSearch = event => {
    this.setState({searchinput: event.target.value})
  }

  getJobDetails = async () => {
    const {minsalary, searchinput, jobType} = this.state
    this.setState({apistatus: getApiStatus.inProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobType.join(
      ',',
    )}&minimum_package=${minsalary}&search=${searchinput}`
    console.log(url)
    const jwtToken = Cookie.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: updatedJobsData,
        apistatus: getApiStatus.success,
        searchedData: updatedJobsData,
      })
    } else {
      this.setState({apistatus: getApiStatus.failure})
    }
  }

  onClickMinSalary = salary => {
    this.setState({minsalary: salary}, this.getJobDetails)
  }

  onUpdateJobType = jobTypeclicked => {
    const {jobType} = this.state

    let updatedList = []
    if (jobType.includes(jobTypeclicked)) {
      const filteredJobType = jobType.filter(
        eachOne => eachOne !== jobTypeclicked,
      )
      this.setState({jobType: filteredJobType}, this.getJobDetails)
      updatedList = filteredJobType
    } else {
      this.setState({jobType: [...jobType, jobTypeclicked]}, this.getJobDetails)
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  onClickSearchinput = event => {
    event.preventDefault()
    this.getJobDetails()
  }

  renderJobsList = () => {
    const {searchedData} = this.state
    return (
      <ul className="jobs-cards-container">
        {searchedData.map(eachOne => (
          <JobCard key={eachOne.id} eachOne={eachOne} />
        ))}
      </ul>
    )
  }

  renderReactLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-viw-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We Cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.onClickRetry}
        className="failure-retry-btn"
      >
        Retry
      </button>
    </div>
  )

  renderUi = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case 'IN_PROGRESS':
        return this.renderReactLoader()
      case 'SUCCESS':
        return this.noJobsRenderView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  noJobsRenderView = () => {
    const {searchedData} = this.state
    if (searchedData.length === 0) {
      return this.noJobsView()
    }
    return this.renderJobsList()
  }

  noJobsView = () => (
    <div className="failure-viw-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-img"
      />
      <h1 className="failure-view-title">No Jobs Found</h1>
      <p className="failure-view-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  render() {
    const {searchinput, minsalary, jobType} = this.state
    console.log(jobType.join(','))
    return (
      <div className="jobs-super-container">
        <Header />
        <div className="jobs-main-container">
          <form
            onSubmit={this.onClickSearchinput}
            className="sm-search-container"
          >
            <input
              onChange={this.onChangeSearch}
              value={searchinput}
              type="search"
              placeholder="Search"
              className="search-input"
            />
            <div className="search-icon-container">
              <button
                type="submit"
                testid="searchButton"
                className="search-button"
              >
                <BiSearch className="search-icon" />
              </button>
            </div>
          </form>
          <ProfileCard
            onClickMinSalary={this.onClickMinSalary}
            onUpdateJobType={this.onUpdateJobType}
          />
          <div className="list-super-container">
            <form
              onSubmit={this.onClickSearchinput}
              className="search-container"
            >
              <input
                onChange={this.onChangeSearch}
                value={searchinput}
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <div className="search-icon-container">
                <button type="submit" className="search-button">
                  <BiSearch className="search-icon" />
                </button>
              </div>
            </form>
            {this.renderUi()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
