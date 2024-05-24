import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails }) {
    return <div className="mails-list-container">
        <h1 className="mail-list">Mail list</h1>
        {mails.map(mail => <div key={mail.id} className="mail-preview">
            <MailPreview mail={mail} />
        </div>)}
    </div>
}