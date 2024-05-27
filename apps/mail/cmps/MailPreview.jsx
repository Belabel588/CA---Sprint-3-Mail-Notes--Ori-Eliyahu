const { useNavigate } = ReactRouterDOM
const { useState } = React

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'




export function MailPreview({ mail }) {
  const navigate = useNavigate()
  const [newMail, setNewMail] = useState(mail)

  // console.log(mail.sentAt)
  const formattedDate = utilService.formatMailDate(mail.sentAt)
  //  `${utilService.getDayNumber(mail.sentAt, 'en-US')} ${utilService.getMonthName(new Date(mail.sentAt))}`

  console.log(formattedDate)


  // console.log(newMail.isRead)

  function onOpenMail() {
    navigate('/mail/' + mail.id)
    setNewMail(prevMail => {
      const updatedMail = { ...prevMail, isRead: true }
      mailService.saveMail(updatedMail)
    })
  }







  return (
    <table>
      <tbody className="mails-container">
        <tr className={`mail-card ${newMail.isRead ? 'read' : ''}`} onClick={onOpenMail}>


          <div className="mail-sender-container">
            <td className="mail-sender">{mail.from}</td>
          </div>

          <div className="mail-subject-body-container">
            <td className="mail-subject">{mail.subject}- <span className="mail-body">{mail.body.substring(0, 100)}</span></td>
          </div>


          <div className="time-container">
            <td className="sent-time">{formattedDate}</td>
          </div>
        </tr>
      </tbody>
    </table >
  )
}