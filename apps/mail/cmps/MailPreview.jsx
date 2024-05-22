const { Link } = ReactRouterDOM



export function MailPreview({ mail }) {


  return (
    <table>
      <tbody className="mails-container">
        <tr className="mail-card">

          <td className="mail-sender"> <Link to={`/mail/${mail.id}`}>{mail.from}</Link></td>

          <td className="mail-subject"><Link to={`/mail/${mail.id}`}>{mail.subject}- <span className="mail-body">{mail.body.substring(0, 100)}</span></Link></td>


          {/* <td className="sent-time">{date}</td> */}
        </tr>
      </tbody>
    </table>
  )
}