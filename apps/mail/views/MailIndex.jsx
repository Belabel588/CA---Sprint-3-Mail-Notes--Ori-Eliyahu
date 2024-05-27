const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { getMailImageDataUrls } from '../services/MailImg.service.js'



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [search, setSearch] = useState('')
    console.log(search)
    const imgs = getMailImageDataUrls()

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

    function onSearch(e) {
        setSearch(e.target.value)
    }

    function onDeleteMail(mailId) {
        mailService.removeMail(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            })
    }

    // ! HTML

    return (
        <div className="mail-app">

            <MailHeader onSearch={onSearch} />

            <div className="mails-boxes">
                <SideBar className="side-bar" mails={mails} />
                <MailList className="mails-list" mails={mails} search={search} onDeleteMail={onDeleteMail} />
            </div>
            <Outlet />

        </div>
    )
}

