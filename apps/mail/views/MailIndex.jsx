const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from './MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { getMailImageDataUrls } from '../services/MailImg.service.js'
import { MailSentList } from '../views/MailSentList.jsx'



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [search, setSearch] = useState('')
    // console.log(search)
    const imgs = getMailImageDataUrls()


    useEffect(() => {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
    }, [])

    function onSearch(ev) {
        setSearch(ev.target.value)
    }

    function onDeleteMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
    }


    function onMarkAsRead(updatedMail) {
        // console.log(updatedMail)
        // console.log(mails)
        setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
    }

    function onMarkAsUnread(updatedMail) {
        setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
    }

    console.log(mails);
    const sentMails = mails.filter(mail => mail.status === 'sent')
    console.log(sentMails);


    // ! HTML

    return (

        <div className="mail-app">
            <MailHeader onSearch={onSearch} />

            <div className="mails-boxes">

                <SideBar className="side-bar" mails={mails} />
                <MailList className="mails-list" mails={mails} search={search} onDeleteMail={onDeleteMail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} />
                <MailSentList className="mails-list" mails={sentMails} search={search} onDeleteMail={onDeleteMail} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} />
                {/* <MailSentList mails={mails} /> */}


            </div>
            <Outlet />

        </div >
    )
}

