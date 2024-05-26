const { useNavigate } = ReactRouterDOM


import { getMailImageDataUrls } from '../services/MailImg.service.js'



export function MailCompose() {
  const navigate = useNavigate()
  const imgs = getMailImageDataUrls()


  const handleSubmit = (ev) => {
    ev.preventDefault()
    navigate('/mail')
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
          <input id="mail-to-input" type="text" placeholder="To" />
        </div>

        <div className="mail-subject-container">
          <input id="mail-subject-input" type="text" placeholder="Recipients" />
        </div>


        <textarea id="mail-text-input" cols="70" rows="25"></textarea>

        <div className="compose-actions">
          <button className="compose-send-btn">Send</button>
        </div>

      </form>
    </div >

  )
}