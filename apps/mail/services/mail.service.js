import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'


console.log('mail service is running')



export const mailService = {
  query,
  removeMail,
  getMailById,
  saveMail,
}

const MAIL_KEY = 'mailDB'

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus'
}



// ! CRUDL FUNCTIONS 

function query(filterBy = null) {
  let mails = _createMails()
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







// !  MAIL DEMO DATA

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY)

  if (!mails || !mails.length) {
    mails = [
      {
        "id": "e101",
        "subject": "Hello there!",
        "body": "Just wanted to say hi and see how you're doing.",
        "isRead": false,
        "sentAt": 1644763200,
        "removedAt": null,
        "from": "friend1@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e102",
        "subject": "Meeting reminder",
        "body": "Don't forget about our meeting tomorrow at 10 AM.",
        "isRead": false,
        "sentAt": 1644680400,
        "removedAt": null,
        "from": "assistant@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e103",
        "subject": "Good news!",
        "body": "I got the job! Let's celebrate tonight.",
        "isRead": false,
        "sentAt": 1644594000,
        "removedAt": null,
        "from": "friend2@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e104",
        "subject": "Project update",
        "body": "Here's the latest update on our project. Let me know if you have any questions.",
        "isRead": false,
        "sentAt": 1644507600,
        "removedAt": null,
        "from": "colleague@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e105",
        "subject": "Invitation to webinar",
        "body": "Join us for an exclusive webinar on digital marketing strategies.",
        "isRead": false,
        "sentAt": 1644421200,
        "removedAt": null,
        "from": "marketing@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e106",
        "subject": "Happy Birthday!",
        "body": "Wishing you a fantastic birthday filled with joy and laughter.",
        "isRead": false,
        "sentAt": 1644334800,
        "removedAt": null,
        "from": "family@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e107",
        "subject": "Quick question",
        "body": "I need your opinion on something. Can we chat later?",
        "isRead": false,
        "sentAt": 1644248400,
        "removedAt": null,
        "from": "friend3@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e108",
        "subject": "Travel plans",
        "body": "Let's plan our next adventure together!",
        "isRead": false,
        "sentAt": 1644162000,
        "removedAt": null,
        "from": "travel@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e109",
        "subject": "Feedback request",
        "body": "We'd love to hear your feedback on our latest product.",
        "isRead": false,
        "sentAt": 1644075600,
        "removedAt": null,
        "from": "product@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e110",
        "subject": "Congratulations!",
        "body": "Congratulations on your recent achievement. You deserve it!",
        "isRead": false,
        "sentAt": 1643989200,
        "removedAt": null,
        "from": "colleague2@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e111",
        "subject": "Upcoming event",
        "body": "Don't forget about the upcoming event this weekend. It's going to be fun!",
        "isRead": false,
        "sentAt": 1643902800,
        "removedAt": null,
        "from": "event@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e112",
        "subject": "New job opportunity",
        "body": "I came across a job opening that might interest you. Let me know if you want more details.",
        "isRead": false,
        "sentAt": 1643816400,
        "removedAt": null,
        "from": "recruiter@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e113",
        "subject": "Recipe share",
        "body": "I found a delicious recipe that I thought you might like. Check it out!",
        "isRead": false,
        "sentAt": 1643730000,
        "removedAt": null,
        "from": "friend4@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e114",
        "subject": "Reminder: RSVP",
        "body": "Just a friendly reminder to RSVP for the event next week.",
        "isRead": false,
        "sentAt": 1643643600,
        "removedAt": null,
        "from": "organizer@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e115",
        "subject": "Article recommendation",
        "body": "I came across an interesting article that I think you'd enjoy reading. Check it out when you have time.",
        "isRead": false,
        "sentAt": 1643557200,
        "removedAt": null,
        "from": "reader@example.com",
        "to": "user@example.com",
      },
      {
        "id": "e116",
        "subject": "Vacation planning",
        "body": "Let's start planning our next vacation destination. Any preferences?",
        "isRead": false,
        "sentAt": 1643470800,
        "removedAt": null,
        "from": "friend5@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e117",
        "subject": "New recipe",
        "body": "Here's a new recipe I found. It looks delicious!",
        "isRead": false,
        "sentAt": 1643384400,
        "removedAt": null,
        "from": "chef@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e118",
        "subject": "Congratulations on your promotion",
        "body": "Congratulations on your recent promotion! Well deserved.",
        "isRead": false,
        "sentAt": 1643298000,
        "removedAt": null,
        "from": "colleague3@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e119",
        "subject": "Weekly newsletter",
        "body": "Here's our weekly newsletter with updates on industry trends.",
        "isRead": false,
        "sentAt": 1643211600,
        "removedAt": null,
        "from": "newsletter@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e120",
        "subject": "Book recommendation",
        "body": "I just finished reading an amazing book. You should check it out!",
        "isRead": false,
        "sentAt": 1643125200,
        "removedAt": null,
        "from": "bookworm@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e121",
        "subject": "Project collaboration",
        "body": "I have an idea for a new project. Let's collaborate on it.",
        "isRead": false,
        "sentAt": 1643038800,
        "removedAt": null,
        "from": "partner@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e122",
        "subject": "Dinner invitation",
        "body": "I'm hosting a dinner party next weekend. You're invited!",
        "isRead": false,
        "sentAt": 1642952400,
        "removedAt": null,
        "from": "host@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e123",
        "subject": "New product launch",
        "body": "We're launching a new product next month. Stay tuned for updates!",
        "isRead": false,
        "sentAt": 1642866000,
        "removedAt": null,
        "from": "marketing2@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e124",
        "subject": "Weekend getaway",
        "body": "Let's plan a weekend getaway to unwind and relax.",
        "isRead": false,
        "sentAt": 1642779600,
        "removedAt": null,
        "from": "relaxation@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e125",
        "subject": "Important update",
        "body": "There's an important update regarding our project. Please review it.",
        "isRead": false,
        "sentAt": 1642693200,
        "removedAt": null,
        "from": "manager@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e126",
        "subject": "Networking event",
        "body": "There's a networking event next week. Are you interested in attending?",
        "isRead": false,
        "sentAt": 1642606800,
        "removedAt": null,
        "from": "networking@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e127",
        "subject": "Happy holidays!",
        "body": "Wishing you and your family a joyful holiday season.",
        "isRead": false,
        "sentAt": 1642520400,
        "removedAt": null,
        "from": "holiday@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      },
      {
        "id": "e128",
        "subject": "Reminder: Doctor's appointment",
        "body": "Just a reminder about your upcoming doctor's appointment.",
        "isRead": false,
        "sentAt": 1642434000,
        "removedAt": null,
        "from": "healthcare@example.com",
        "to": "user@example.com",
        "status": "inbox",
        "isStarred": false,
        "labels": []
      }
    ]

    storageService.saveToStorage(MAIL_KEY, mails)
    console.log('mails created', mails)
  }

  return mails
}