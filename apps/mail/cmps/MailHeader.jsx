

import { getMailImageDataUrls } from '../services/MailImg.service.js'


export function MailHeader({ onSearch, onMenuClick, isClicked }) {

  const imgs = getMailImageDataUrls()





  return (
    <div className="mails-app-header">


      <div className="mail-logo-burger">

        <div>
          <button className="menu-btn hidden" onClick={onMenuClick}><img className="menu-icon" src={imgs.menuImg} alt="" /></button>
        </div>

        <div>
          <img className="mail-app-logo" src={imgs.mailIconImg} alt="" />
        </div>
      </div>


      <div className="mail-input-container">
        <input className="mail-filter-search" type="text" placeholder="Search mail" onChange={onSearch} />
        <button className="search-btn"><img className="search-img" src={imgs.searchImg} alt="" /></button>
      </div>
    </div>
  )
}
