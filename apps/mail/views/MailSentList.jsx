import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailSentList({ mails, search, onDeleteMail, onMarkAsRead, onMarkAsUnread }) {
  console.log(mails)
  if (!mails) return <div>Loading...</div>
  return (
    <div className="mails-list-container">
      <h1>Sent Mails</h1>
      {mails.filter((mail) => mail.status === 'sent')
        .filter((mail) => {
          return search.toLowerCase() === '' ? mail : mail.subject.toLowerCase().includes(search) ||
            mail.body.toLowerCase().includes(search) ||
            mail.from.toLowerCase().includes(search)
        }).map(mail =>
          <div key={mail.id} className="mail-preview">
            <MailPreview mail={mail} onDeleteMail={onDeleteMail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} />
          </div>
        )
      }
    </div>
  );
}