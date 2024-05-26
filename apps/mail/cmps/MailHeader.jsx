

import { getMailImageDataUrls } from '../services/MailImg.service.js'


export function MailHeader({ onSearch }) {

  const imgs = getMailImageDataUrls()


  return (
    <div className="mails-app-header">
      <img className="mail-app-logo" src={imgs.mailIconImg} alt="" />


      <div className="mail-input-container">
        <input className="mail-filter-search" type="text" placeholder="Search mail" onChange={onSearch} />
        <button className="search-btn"><img className="search-img" src={imgs.searchImg} alt="" /></button>
      </div>
    </div>
  )
}
