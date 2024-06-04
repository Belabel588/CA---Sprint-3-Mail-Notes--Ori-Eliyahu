const { useState, useEffect } = React
const { Link, NavLink } = ReactRouterDOM



import { getMailImageDataUrls } from '../services/MailImg.service.js'


export function SideBar({ mails, onInboxClick, onSentClick, onBinClick, onMenuClick, isClicked }) {
  const [unreadMails, setUnreadMails] = useState([])
  const imgs = getMailImageDataUrls()



  useEffect(() => {
    showUnread()
  }, [mails])

  function showUnread() {
    const unread = mails.filter(mail => !mail.isRead)

    setUnreadMails(unread)
  }



  return (
    <div className={`side-bar-container ${isClicked ? 'menu-hidden' : 'menu-show'} `}>

      <div className="compose-mail-btn">
        <Link to='/mail/compose' className="compose-mail"><img className="pen-img" src={imgs.penImg} alt="" />Compose</Link>
      </div>



      <NavLink to='/mail' className="inbox-container">
        <div className="inbox-box" onClick={onInboxClick}>

          <div className="inbox-img-container">
            <img className="inbox-img" src={imgs.inboxImg} alt="" />
          </div>

          <div className="inbox-count-container">
            <h3 className="inbox-count">Inbox</h3>
          </div>

          <div className="inbox-unread-count-container">
            <span className="unread-count">{unreadMails.length}</span>
          </div>

        </div>
      </NavLink>

      <NavLink to='/mail/star' className="sent-container">
        <div className="star-box" onClick={onBinClick}>

          <div className="star-img-container">
            <img className="star-img" src={imgs.starImg} alt="" />
          </div>


          <div className="star-btn">
            <div className="star-count-container">
              <h3 className="star-count">Starred</h3>
            </div>
          </div>


        </div>
      </NavLink>

      <NavLink to='/mail/sent' className="sent-container">
        <div className="sent-box" onClick={onSentClick}>

          <div className="sent-img-container">
            <img className="sent-img" src={imgs.sendImg} alt="" />
          </div>


          <div className="sent-btn">
            <div className="sent-count-container">
              <h3 className="sent-count">Sent</h3>
            </div>
          </div>


        </div>
      </NavLink>


      <NavLink to='/mail/bin' className="sent-container">
        <div className="bin-box" onClick={onBinClick}>

          <div className="bin-img-container">
            <img className="bin-img" src={imgs.deleteImg} alt="" />
          </div>


          <div className="bin-btn">
            <div className="bin-count-container">
              <h3 className="bin-count">Bin</h3>
            </div>
          </div>


        </div>
      </NavLink>



    </div>
  )
}