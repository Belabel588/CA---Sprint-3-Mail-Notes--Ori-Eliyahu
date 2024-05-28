import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailList({ mails, search, onDeleteMail, onMarkAsRead, onMarkAsUnread }) {
    return <div className="mails-list-container">
        <h1 className="mail-list">Mails list</h1>
        {mails.filter((mail) => mail.status === 'inbox')
            .filter((mail) => {
                return search.toLowerCase() === '' ? mail : mail.subject.toLowerCase().includes(search) ||
                    mail.body.toLowerCase().includes(search) ||
                    mail.from.toLowerCase().includes(search)
            }).map(mail => <div key={mail.id} className="mail-preview">
                <MailPreview mail={mail} onDeleteMail={onDeleteMail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} />
            </div>)}
    </div>
}