import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, search }) {
    return <div className="mails-list-container">
        <h1 className="mail-list">Mails list</h1>
        {mails.filter((mail) => {
            return search.toLowerCase() === '' ? mail : mail.subject.toLowerCase().includes(search) ||
                mail.body.toLowerCase().includes(search) ||
                mail.from.toLowerCase().includes(search)
        }).map(mail => <div key={mail.id} className="mail-preview">
            <MailPreview mail={mail} />
        </div>)}
    </div>
}