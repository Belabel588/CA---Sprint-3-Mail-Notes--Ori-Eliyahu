import { MailPreview } from '../cmps/MailPreview.jsx'


export function MailList({ mails, search, onMarkAsRead, onMarkAsUnread, onSendToBin, onSendToStar, onDeleteMail }) {

    if (!mails) return <div>Loading...</div>

    return <div className="mails-list-container">
        {mails.filter((mail) => mail.status === 'inbox')
            .filter((mail) => {
                return search.toLowerCase() === '' ? mail : mail.subject.toLowerCase().includes(search.toLowerCase()) ||
                    mail.body.toLowerCase().includes(search.toLowerCase()) ||
                    mail.from.toLowerCase().includes(search.toLowerCase())
            }).map(mail => <div key={mail.id} className="mail-preview">
                <MailPreview mail={mail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} onSendToBin={onSendToBin} onSendToStar={onSendToStar} onDeleteMail={onDeleteMail} />
            </div>)}
    </div>
}