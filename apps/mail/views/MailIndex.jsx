const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'



export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
        console.log(mails)
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
                console.log(mails)
            })

    }



    // ! HTML

    return <div className="mail-app">
        <SideBar className="side-bar" mails={mails} />
        <MailList className="mails-list" mails={mails} />

        {/* <nav>
            <Link to='/mail/compose'>compose</Link>
        </nav> */}
    </div>
}

