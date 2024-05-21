const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'



export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })

    }



    // ! HTML

    return <div>
        <h1>Welcome to our Mail App</h1>
        <MailList />
    </div>
}

