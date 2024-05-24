
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
      <h1>Inbox: <span>{unreadMails.length}</span></h1>
    </div>
  )
}