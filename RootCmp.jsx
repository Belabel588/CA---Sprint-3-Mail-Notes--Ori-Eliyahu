const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailPage } from "./apps/mail/views/MailPage.jsx"
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/compose" element={<MailCompose />} />
                </Route>

                <Route path="/note" element={<NoteIndex />} />
                <Route path="/mail/:mailId" element={<MailPage />} />
            </Routes>
        </section>
    </Router >
}
