const { useState, useEffect } = React


import { mailService } from '../services/mail.service.js'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailSentList({ onInboxClick, onSentClick, onSearch, onDeleteMail, onMarkAsRead, onMarkAsUnread }) {
  const [mails, setMails] = useState([])

  useEffect(() => {
    mailService.query()
      .then(mails => {
        console.log(mails);
        setMails(mails)
      })
  }, [])
  console.log(mails);

  return (
    <div className="mail-app">
      <MailHeader onSearch={onSearch} />

      <div className="mails-boxes">
        <SideBar className="side-bar" mails={mails} onInboxClick={onInboxClick} onSentClick={onSentClick} />


        <div className="mails-list-container">

          {/* <h1 className="mail-list">Mails list</h1> */}
          {
            mails.filter((mail) => mail.status === 'sent').map(mail => <div key={mail.id} className="mail-preview">
              <MailPreview mail={mail} onDeleteMail={onDeleteMail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} />
            </div>)
          }
        </div>
      </div>
    </div >
  )
}