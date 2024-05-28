const { useState, useEffect } = React
const { Link } = ReactRouterDOM


import { getMailImageDataUrls } from '../services/MailImg.service.js'


export function SideBar({ mails }) {
  const [unreadMails, setUnreadMails] = useState([])
  const imgs = getMailImageDataUrls()



  useEffect(() => {
    showUnread()
  }, [mails])

  function showUnread() {
    console.log('all mails', mails)
    const unread = mails.filter(mail => !mail.isRead)
    console.log(unread)
    setUnreadMails(unread)
  }

  return (
    <div className="side-bar-container">

      <div className="compose-mail-btn">
        <Link to='/mail/compose' className="compose-mail"><img className="pen-img" src={imgs.penImg} alt="" />Compose</Link>
      </div>



      <Link to='/mail' className="inbox-container">
        <div className="inbox-box">

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
      </Link>
    </div>
  )
}