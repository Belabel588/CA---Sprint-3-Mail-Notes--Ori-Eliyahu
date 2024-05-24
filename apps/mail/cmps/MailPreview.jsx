const { useNavigate } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'




export function MailPreview({ mail }) {
  const navigate = useNavigate()
  const [newMail, setNewMail] = useState(mail)
  // const [currIsRead, setCurrIsRead] = useState(false)

  console.log(newMail.isRead)

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

          <td className="mail-sender">{mail.from}</td>


          <td className="mail-subject">{mail.subject}- <span className="mail-body">{mail.body.substring(0, 100)}</span></td>



          {/* <td className="sent-time">{date}</td> */}
        </tr>
      </tbody>
    </table >
  )
}