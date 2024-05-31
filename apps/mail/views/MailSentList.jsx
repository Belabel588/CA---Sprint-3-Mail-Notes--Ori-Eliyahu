const { useState, useEffect } = React


import { mailService } from '../services/mail.service.js'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailSentList({ onInboxClick, onSentClick, onSearch, onMarkAsRead, onMarkAsUnread, onSendToBin, onDeleteMail }) {
  const [mails, setMails] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    mailService.query()
      .then(mails => {
        // console.log(mails);
        setMails(mails)
      })
  }, [])
  // console.log(mails);



  function onSearch(ev) {
    setSearch(ev.target.value)
  }

  function onMarkAsRead(updatedMail) {
    // console.log(updatedMail)
    // console.log(mails)
    mailService.put(updatedMail)
      .then(() => {
        setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
      })
  }

  function onMarkAsUnread(updatedMail) {
    mailService.put(updatedMail)
      .then(() => {
        setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
      })
  }


  function onSendToBin(updatedMail) {
    mailService.put(updatedMail)
      .then(() => {
        setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
      })
  }

  return (
    <div className="mail-app">
      <MailHeader onSearch={onSearch} />

      <div className="mails-boxes">
        <SideBar className="side-bar" mails={mails} onInboxClick={onInboxClick} onSentClick={onSentClick} />


        <div className="mails-list-container">

          {/* <h1 className="mail-list">Mails list</h1> */}
          {
            mails.filter((mail) => mail.status === 'sent')
              .filter((mail) => {
                return search.toLowerCase() === '' ? mail : mail.subject.toLowerCase().includes(search.toLowerCase()) ||
                  mail.body.toLowerCase().includes(search.toLowerCase()) ||
                  mail.from.toLowerCase().includes(search.toLowerCase())
              }).map(mail => <div key={mail.id} className="mail-preview">
                <MailPreview mail={mail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} onSendToBin={onSendToBin} onDeleteMail={onDeleteMail} />
              </div>)
          }
        </div>
      </div>
    </div >
  )
}