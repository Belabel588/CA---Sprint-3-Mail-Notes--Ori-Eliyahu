const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { getMailImageDataUrls } from '../services/MailImg.service.js'
import { MailHeader } from '../cmps/MailHeader.jsx'



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

    // ! HTML

    return (
        <div className="mail-app">

            <MailHeader onSearch={onSearch} />

            <div className="mails-boxes">
                <SideBar className="side-bar" mails={mails} />
                <MailList className="mails-list" mails={mails} search={search} />
            </div>
            <Outlet />

        </div>
    )
}

