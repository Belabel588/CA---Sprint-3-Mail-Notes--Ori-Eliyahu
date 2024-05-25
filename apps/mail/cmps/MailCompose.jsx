const { useNavigate } = ReactRouterDOM


export function MailCompose() {

  const navigate = useNavigate()


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
          <h3 className="new-mail-title">New Message </h3>
          <p className="close-compose-btn" onClick={quitCompose}>X</p>
        </div>

        <div className="mail-to-container">
          <label htmlFor="mail-to-input" type="email">To</label>
          <input id="mail-to-input" type="text" />
        </div>

        <div className="mail-subject-container">
          <label htmlFor="mail-subject-input">Subject</label>
          <input id="mail-subject-input" type="text" />
        </div>
        <textarea id="mail-text-input" cols="80" rows="20"></textarea>
        <button>Send</button>
      </form>
    </div >

  )
}