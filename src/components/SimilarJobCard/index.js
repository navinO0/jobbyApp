import {IoLocationSharp} from 'react-icons/io5'
import {MdLocalPostOffice} from 'react-icons/md'
import {AiTwotoneStar} from 'react-icons/ai'

import './index.css'

const SimilarJobCard = props => {
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
    <li className="list-item-container-similar-Job-card">
      <div className="similar-company-img-name-star-container">
        <div className="similar-company-logo">
          <img
            src={companyLogoUrl}
            alt="similar-company logo"
            className="similar-company-logo-img"
          />
        </div>
        <div className="similar-star-rating-title-container">
          <p className="similar-company-name">{title}</p>
          <div className="similar-star-rating-container">
            <AiTwotoneStar className="similar-star-icon" />
            <p className="similar-rating-in-num">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="similar-description-container">
          <p className="similar-job-card-description-heading">Description</p>
          <p className="similar-job-card-description">{jobDescription}</p>
        </div>
        <div className="similar-location-job-type-salary-container">
          <div className="similar-location-icon-location-container">
            <IoLocationSharp className="similar-location-type-icons" />
            <p className="similar-job-location">{location}</p>
          </div>
          <div className="similar-job-type-container">
            <MdLocalPostOffice className="similar-location-type-icons" />
            <p className="similar-job-type-text">{employmentType}</p>
          </div>
          <div className="similar-salary-package">
            <p className="similar-salary-package">{packagePerAnnum}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
