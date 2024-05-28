const { useState } = React
const { useNavigate } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { getMailImageDataUrls } from '../services/MailImg.service.js'



export function MailCompose() {
  const navigate = useNavigate()
  const imgs = getMailImageDataUrls()


  const [sentMail, setSentMail] = useState({
    subject: '',
    body: '',
    sentAt: new Date(),
    to: '',
    status: 'sent',
    isRead: true
  })


  const handleChange = (ev) => {
    const { id, value } = ev.target
    setSentMail(prevSentMail => ({
      ...prevSentMail, [id]: value
    }))
  }


  const handleSubmit = (ev) => {
    ev.preventDefault()



    console.log('sent Mail:', sentMail)

    mailService.saveMail(sentMail)
      .then(() => {
        console.log('mail added!')
        navigate('/mail')
      })
      .catch((error) =>
        console.error('error adding mail', error))
  }

  function quitCompose() {
    navigate('/mail')
  }

  return (

    <div className="mail-compose-container">
      <form onSubmit={handleSubmit}>

        <div className="new-mail-title-container">
          <span className="new-mail-title">New Message </span>
          <p className="close-compose-btn" onClick={quitCompose}><img src={imgs.xImg} alt="" className="x-img" /></p>
        </div>

        <div className="mail-to-container">
          <input id="to" type="text" placeholder="To" value={sentMail.to} onChange={handleChange} />
        </div>

        <div className="mail-subject-container">
          <input id="subject" type="text" placeholder="subject" value={sentMail.subject} onChange={handleChange} />
        </div>


        <textarea id="body" cols="70" rows="25" value={sentMail.body} onChange={handleChange}></textarea>

        <div className="compose-actions">
          <button className="compose-send-btn">Send</button>
        </div>

      </form>
    </div >

  )
}