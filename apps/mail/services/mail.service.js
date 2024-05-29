import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const mailService = {
  query,
  get,
  remove,
  addMail,
  post,
  put
}


console.log('mail service is running')


const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
}



// ! CRUDL FUNCTIONS 

function query() {
  return storageService.query(MAIL_KEY)

}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function post(mail) {
  return storageService.post(MAIL_KEY, mail)
}

function put(mail) {
  return storageService.put(MAIL_KEY, mail)
}

// function save(mail) {
//   if (mail.id) {
//     console.log(mail.id);
//     console.log(mail);
//     return storageService.post(MAIL_KEY, mail)
//   } else {
//   }
//   return storageService.put(MAIL_KEY, mail)
// }


function addMail(mail) {
  return storageService.post(MAIL_KEY, mail)
}




_createMails()



// !  MAIL DEMO DATA

function _createMails() {
  let mails = storageService.query(MAIL_KEY)
    .then(mails => {

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
          },
          {
            id: 'e102',
            subject: 'tired!',
            body: 'need a break!',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'pika@chu.com',
            to: 'user@appsus.com',
            status: 'inbox',
            isStarred: false,
            labels: []
          },
          {
            id: 'e103',
            subject: 'wanna be a develpoer',
            body: 'on my way - developing',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'tolo@popo.com',
            to: 'user@appsus.com',
            status: 'inbox',
            isStarred: false,
            labels: []
          }
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
      }
      return mails
    })
}
