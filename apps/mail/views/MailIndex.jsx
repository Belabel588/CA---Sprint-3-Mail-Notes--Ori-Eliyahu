const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from './MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { getMailImageDataUrls } from '../services/MailImg.service.js'
import { MailSentList } from '../views/MailSentList.jsx'
import { MailBin } from '../views/MailBIn.jsx'



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [search, setSearch] = useState('')
    const [view, setView] = useState('inbox')
    const [isClicked, setIsClicked] = useState(false)
    // console.log(search)
    const imgs = getMailImageDataUrls()


    useEffect(() => {
        mailService.query()
            .then(mails => {
                // console.log(mails);
                setMails(mails)
            })
    }, [mails])



    function onSearch(ev) {
        setSearch(ev.target.value)
    }


    function onMarkAsRead(updatedMail) {
        // console.log(updatedMail)
        // console.log(mails)
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }

    function onMarkAsUnread(updatedMail) {
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }

    // function onDeleteMail(mailId) {
    //     mailService.remove(mailId)
    //         .then(() => {
    //             setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
    //         })
    // }

    function onSendToBin(updatedMail) {
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }

    function onSendToStar(updatedMail) {
        mailService.put(updatedMail)
            .then(() => {
                setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
            })
    }


    function onMenuClick() {
        setIsClicked(!isClicked)
    }

    function handleInboxClick() {
        setView('inbox')
    }


    function handleSentClick() {
        setView('sent')
    }
    function handleBinClick() {
        setView('bin')
    }
    function handleStarClick() {
        setView('star')
    }





    // ! HTML

    return (

        <div className="mail-app">
            <MailHeader onSearch={onSearch} isClicked={isClicked} onMenuClick={onMenuClick} />

            <div className="mails-boxes">
                <SideBar className="side-bar" mails={mails} onInboxClick={handleInboxClick} onSentClick={handleSentClick} onBinClick={handleBinClick} onStarClick={handleStarClick} isClicked={isClicked} onMenuClick={onMenuClick} />



                {/* {console.log(mails)} */}
                {view === 'inbox' && <MailList className="mails-list" mails={mails} search={search} onMarkAsRead={onMarkAsRead} onMarkAsUnread={onMarkAsUnread} onSendToBin={onSendToBin} onSendToStar={onSendToStar} />}
                {view === 'sent' && < MailSentList className="mails-list" onInboxClick={handleInboxClick} onSentClick={handleSentClick} onSearch={onSearch} onSendToBin={onSendToBin} />}
                {view === 'bin' && < MailBin className="mails-list" />}
                {view === 'star' && < MailStar className="mails-list" />}




            </div>
            <Outlet />

        </div >
    )
}

