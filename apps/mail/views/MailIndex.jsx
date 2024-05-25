const { useState, useEffect } = React
const { Outlet } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { getMailImageDataUrls } from '../services/MailImg.service.js'



export function MailIndex() {
    const [mails, setMails] = useState([])
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



    // ! HTML

    return <div className="mail-app">
        <div className="mails-app-header">
            <img className="mail-app-logo" src={imgs.mailIconImg} alt="" />


            <div className="mail-input-container">
                <input className="mail-filter-search" type="text" placeholder="Search mail" />
                <button className="search-btn"><img className="search-img" src={imgs.searchImg} alt="" /></button>
            </div>

        </div>


        <div className="mails-boxes">
            <SideBar className="side-bar" mails={mails} />
            <MailList className="mails-list" mails={mails} />
        </div>

        {/* <nav>
            <Link to='/mail/compose'>compose</Link>
        </nav> */}
        <Outlet />

    </div>
}

