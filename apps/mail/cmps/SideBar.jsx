const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM


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
      <div className="inbox-box">
        <img className="inbox-img" src={imgs.inboxImg} alt="" /><h3 className="inbox-count">Inbox</h3> <span>{unreadMails.length}</span>
      </div>
    </div>

  )
}