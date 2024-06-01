const { useState, useEffect } = React


import { mailService } from '../services/mail.service.js'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailBin({ onInboxClick, onSentClick, onSearch, onMarkAsRead, onMarkAsUnread }) {
  const [mails, setMails] = useState([])
  const [search, setSearch] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    mailService.query()
      .then(mails => {
        // console.log(mails);
        setMails(mails)
      })
  }, [])


  function onSearch(ev) {
    setSearch(ev.target.value)
  }


  function onMenuClick() {
    setIsClicked(!isClicked)
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



  function onDeleteMail(mailId) {
    mailService.remove(mailId)
      .then(() => {
        setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
      })
  }
  // console.log(mails);

  return (
    <div className="mail-app">
      <MailHeader onSearch={onSearch} isClicked={isClicked} onMenuClick={onMenuClick} />

      <div className="mails-boxes">
        <SideBar className="side-bar" mails={mails} onInboxClick={onInboxClick} onSentClick={onSentClick} onMenuClick={onMenuClick} isClicked={isClicked} />


        <div className="mails-list-container">

          {mails.filter((mail) => mail.status === 'bin')
            .filter((mail) => {
              return search.toLowerCase() === '' ? mail : mail.subject.toLowerCase().includes(search.toLowerCase()) ||
                mail.body.toLowerCase().includes(search.toLowerCase()) ||
                mail.from.toLowerCase().includes(search.toLowerCase())
            }).map(mail => <div key={mail.id} className="mail-preview">
              <MailPreview mail={mail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} onDeleteMail={onDeleteMail} />
            </div>)
          }
        </div>
      </div>
    </div >
  )
}