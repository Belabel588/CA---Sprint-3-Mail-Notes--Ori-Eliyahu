const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'


export function MailPage() {
  const { mailId } = useParams()

  const [mail, setMail] = useState(null)

  function loadMail() {
    mailService.getMailById(mailId).then(mail => {
      console.log(mail)
      setMail(mail)
    })
  }

  useEffect(() => {
    loadMail()
  }, [])

  if (!mail) return <div>Loading</div>

  return <div>
    <h1>Subject:{mail.subject}</h1>
    <h3 className="mail-category">From:{mail.from}</h3>
    <h3 className="mail-category">to:{mail.to}</h3>
    <p>{mail.body}</p>

  </div>
}