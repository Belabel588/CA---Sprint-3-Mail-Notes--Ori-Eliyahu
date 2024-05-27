const { useNavigate } = ReactRouterDOM
const { useState } = React

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { getMailImageDataUrls } from '../services/MailImg.service.js'




export function MailPreview({ mail, onDeleteMail }) {
  const navigate = useNavigate()
  const [newMail, setNewMail] = useState(mail)
  const formattedDate = utilService.formatMailDate(mail.sentAt)
  const imgs = getMailImageDataUrls()







  function onOpenMail() {
    navigate('/mail/' + mail.id)
    setNewMail(prevMail => {
      const updatedMail = { ...prevMail, isRead: true }
      mailService.saveMail(updatedMail)
    })
  }

  function markAsRead() {
    setNewMail(prevMail => {
      const updatedMail = { ...prevMail, isRead: true }
      mailService.saveMail(updatedMail)
    })
  }

  function handleMailDeletion() {
    onDeleteMail(mail.id)
  }



  return (
    <table>
      <tbody className="mails-container">


        <tr className={`mail-card ${newMail.isRead ? 'read' : ''}`}>

          <div className="mails-info" onClick={onOpenMail}>

            <div className="mail-sender-container">
              <td className="mail-sender">{mail.from}</td>
            </div>

            <div className="mail-subject-body-container">
              <td className="mail-subject">{mail.subject}- <span className="mail-body">{mail.body.substring(0, 100)}</span></td>
            </div>
          </div>


          <div className="mails-time-actions">
            <div className="time-container">
              <td className="sent-time">{formattedDate}</td>
            </div>

            <div className="actions-container">
              <td className="actions"><button className="delete-btn" onClick={handleMailDeletion}><img className="delete-icon" src={imgs.deleteImg} alt="" /></button><button className="unread-btn">{newMail.isRead ? <img className="read-icon" src={imgs.readMailImg} alt="" /> : <img className="unread-icon" src={imgs.unreadMailImg} alt="" />}</button></td>
            </div>

          </div>

        </tr>
      </tbody>
    </table >
  )
}
