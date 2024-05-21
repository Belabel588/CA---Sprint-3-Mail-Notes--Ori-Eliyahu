
export function MailPreview({ mail }) {


  return (
    <table>
      <tbody>
        <tr className="mail-card">
          <td className="mail-sender">{mail.from}</td>
          <td className="mail-subject">{mail.subject}- <span className="mail-body">{mail.body.substring(0, 100)}</span></td>
          {/* <td className="sent-time">{date}</td> */}
        </tr>
      </tbody>
    </table>
  )
}