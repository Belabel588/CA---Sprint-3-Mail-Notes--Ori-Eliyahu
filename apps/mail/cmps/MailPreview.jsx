const { useNavigate } = ReactRouterDOM




export function MailPreview({ mail }) {
  const navigate = useNavigate()

  function onOpenMail() {
    navigate('/mail/' + mail.id)
  }

  return (
    <table>
      <tbody className="mails-container">
        <tr className="mail-card" onClick={onOpenMail}>

          <td className="mail-sender">{mail.from}</td>


          <td className="mail-subject">{mail.subject}- <span className="mail-body">{mail.body.substring(0, 100)}</span></td>



          {/* <td className="sent-time">{date}</td> */}
        </tr>
      </tbody>
    </table >
  )
}