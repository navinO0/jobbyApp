import {Link} from 'react-router-dom'
import './index.css'
import {IoLocationSharp} from 'react-icons/io5'
import {MdLocalPostOffice} from 'react-icons/md'
import {AiTwotoneStar} from 'react-icons/ai'

const JobCard = props => {
  const {eachOne} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachOne

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-item-container">
        <div className="company-img-name-star-container">
          <div className="company-logo">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo-img"
            />
          </div>
          <div className="star-rating-title-container">
            <p className="company-name">{title}</p>
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
          <hr className="hr-line-job-card" />
          <div className="description-container">
            <p className="job-card-description-heading">Description</p>
            <p className="job-card-description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
