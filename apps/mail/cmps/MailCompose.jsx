
export function MailCompose() {
  return (
    <div className="mail-compose-container">

      <h3 className="new-mail-title">New Message </h3>

      <div className="mail-to-container">
        <label htmlFor="mail-to-input" type="email">To</label>
        <input id="mail-to-input" type="text" />
      </div>

      <div className="mail-subject-container">
        <label htmlFor="mail-subject-input">Subject</label>
        <input id="mail-subject-input" type="text" />
      </div>
      <textarea id="mail-text-input" cols="80" rows="20"></textarea>
    </div >

  )
}