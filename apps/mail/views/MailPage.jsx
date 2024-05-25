const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'



export function MailPage() {
  const { mailId } = useParams()
  const navigate = useNavigate()

  const [mail, setMail] = useState(null)

  function loadMail() {
    mailService.getMailById(mailId).then(mail => {
      console.log(mail)
      setMail(mail)
    })
  }

  function onBackToInbox() {
    navigate('/mail')
  }

  useEffect(() => {
    loadMail()
  }, [])

  if (!mail) return <div>Loading</div>

  return <div className="mail-container">
    <div className="mail-actions">
      <button onClick={onBackToInbox}>Back</button>
    </div>



    <h1 className="mail-subject">{mail.subject}</h1>
    <h3 className="mail-category">From:{mail.from}</h3>
    <small className="mail-category">to:{mail.to}</small>
    <p>{mail.body}</p>

  </div>
}