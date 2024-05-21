import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'


console.log('mail service is running')



export const mailService = {
  query,
  removeMail,
  getMailById,
  saveMail,
  getFilterBy
}

const MAIL_KEY = 'mailDB'

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
}



// ! CRUDL FUNCTIONS 

function query(filterBy = null) {
  let mails = _createMails()
  if (filterBy) mails = _getFilteredMails(mails, filterBy)
  return Promise.resolve(mails)
}

function getMailById(mailId) {
  const mails = storageService.loadFromStorage(MAIL_KEY)
  const mail = mails.find((mail) => mail.id === mailId)
  return Promise.resolve(mail)
}

function removeMail(mailId) {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  mails = mails.filter((mail) => mail.id !== mailId)
  storageService.saveToStorage(MAIL_KEY, mails)
  return Promise.resolve()
}

function saveMail(mail) {
  let savedMail
  if (mail.id) savedMail = updateMail(mail)
  else savedMail = addMail(mail)
  return Promise.resolve(savedMail)
}

function updateMail(mail) {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  mails = mails.map(m => m.id === mail.id ? mail : m)
  storageService.saveToStorage(MAIL_KEY, mails)
  return mail
}

function addMail(mail) {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  mails = [...mails, mail]
  storageService.saveToStorage(MAIL_KEY, mails)
  return mail
}

//! FILTERING FUNCTIONS

function getFilterBy() {
  return {
    status: '',
    txt: '',
    isRead: '',
    isStarred: '',
    labels: [],
  }
}


// !  MAIL DEMO DATA

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        status: 'inbox',
        isStarred: false,
        labels: []
      }
    ]
    storageService.saveToStorage(MAIL_KEY, mails)
    console.log('mails created', mails)
  }

  return mails
}