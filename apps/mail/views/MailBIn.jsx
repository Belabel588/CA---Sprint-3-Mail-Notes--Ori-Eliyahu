const { useState, useEffect } = React


import { mailService } from '../services/mail.service.js'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailBin({ onInboxClick, onSentClick, onSearch, onMarkAsRead, onMarkAsUnread, onSendToBin }) {
  const [mails, setMails] = useState([])

  useEffect(() => {
    mailService.query()
      .then(mails => {
        // console.log(mails);
        setMails(mails)
      })
  }, [])

  function onDeleteMail(mailId) {
    mailService.remove(mailId)
      .then(() => {
        setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
      })
  }
  // console.log(mails);

  return (
    <div className="mail-app">
      <MailHeader onSearch={onSearch} />

      <div className="mails-boxes">
        <SideBar className="side-bar" mails={mails} onInboxClick={onInboxClick} onSentClick={onSentClick} />


        <div className="mails-list-container">

          {mails.filter((mail) => mail.status === 'bin').map(mail => <div key={mail.id} className="mail-preview">
            <MailPreview mail={mail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} onSendToBin={onSendToBin} onDeleteMail={onDeleteMail} />
          </div>)
          }
        </div>
      </div>
    </div >
  )
}