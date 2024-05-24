
const { useState, useEffect } = React


export function SideBar({ mails }) {
  const [unreadMails, setUnreadMails] = useState([])



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
      <div className="inbox-box">
        <h3 className="inbox-count">Inbox</h3> <span>{unreadMails.length}</span>
      </div>
    </div>
  )
}