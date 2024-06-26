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
            id: "e101",
            subject: "Hello there!",
            body: "Just wanted to say hi and see how you're doing.",
            isRead: false,
            sentAt: 9644763200,
            removedAt: null,
            from: "friend1@example.com",
            to: "user@example.com",
            status: 'inbox',
            isStarred: false,
            labels: []
          },
          {
            id: "e102",
            subject: "Meeting reminder",
            body: "Don't forget about our meeting tomorrow at 10 AM.",
            isRead: false,
            sentAt: 8644680400,
            removedAt: null,
            from: "assistant@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e103",
            subject: "Good news!",
            body: "I got the job! Let's celebrate tonight.",
            isRead: false,
            sentAt: 7644594000,
            removedAt: null,
            from: "friend2@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e104",
            subject: "Project update",
            body: "Here's the latest update on our project. Let me know if you have any questions.",
            isRead: false,
            sentAt: 6644507600,
            removedAt: null,
            from: "colleague@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e105",
            subject: "Invitation to webinar",
            body: "Join us for an exclusive webinar on digital marketing strategies.",
            isRead: false,
            sentAt: 5644421200,
            removedAt: null,
            from: "marketing@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e106",
            subject: "Happy Birthday!",
            body: "Wishing you a fantastic birthday filled with joy and laughter.",
            isRead: false,
            sentAt: 4644334800,
            removedAt: null,
            from: "family@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e107",
            subject: "Quick question",
            body: "I need your opinion on something. Can we chat later?",
            isRead: false,
            sentAt: 3644248400,
            removedAt: null,
            from: "friend3@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e108",
            subject: "Travel plans",
            body: "Let's plan our next adventure together!",
            isRead: false,
            sentAt: 2644162000,
            removedAt: null,
            from: "travel@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e109",
            subject: "Feedback request",
            body: "We'd love to hear your feedback on our latest product.",
            isRead: false,
            sentAt: 1644075600,
            removedAt: null,
            from: "product@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e110",
            subject: "Congratulations!",
            body: "Congratulations on your recent achievement. You deserve it!",
            isRead: false,
            sentAt: 643998200,
            removedAt: null,
            from: "colleague2@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e111",
            subject: "Upcoming event",
            body: "Don't forget about the upcoming event this weekend. It's going to be fun!",
            isRead: false,
            sentAt: 543902800,
            removedAt: null,
            from: "event@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e112",
            subject: "New job opportunity",
            body: "I came across a job opening that might interest you. Let me know if you want more details.",
            isRead: false,
            sentAt: 1642434000,
            removedAt: null,
            from: "recruiter@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e113",
            subject: "Recipe share",
            body: "I found a delicious recipe that I thought you might like. Check it out!",
            isRead: false,
            sentAt: 1542520400,
            removedAt: null,
            from: "friend4@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e114",
            subject: "Reminder: RSVP",
            body: "Just a friendly reminder to RSVP for the event next week.",
            isRead: false,
            sentAt: 1442606800,
            removedAt: null,
            from: "organizer@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e115",
            subject: "Vacation planning",
            body: "Let's start planning our next vacation destination. Any preferences?",
            isRead: false,
            sentAt: 1242779600,
            removedAt: null,
            from: "friend5@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e116",
            subject: "Vacation planning",
            body: "Let's start planning our next vacation destination. Any preferences?",
            isRead: false,
            sentAt: 1242779600,
            removedAt: null,
            from: "friend5@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e117",
            subject: "New recipe",
            body: "Here's a new recipe I found. It looks delicious!",
            isRead: false,
            sentAt: 1142866000,
            removedAt: null,
            from: "chef@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e118",
            subject: "Congratulations on your promotion",
            body: "Congratulations on your recent promotion! Well deserved.",
            isRead: false,
            sentAt: 1042952400,
            removedAt: null,
            from: "colleague3@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e119",
            subject: "Weekly newsletter",
            body: "Here's our weekly newsletter with updates on industry trends.",
            isRead: false,
            sentAt: 1943038800,
            removedAt: null,
            from: "newsletter@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e120",
            subject: "Book recommendation",
            body: "I just finished reading an amazing book. You should check it out!",
            isRead: false,
            sentAt: 1843125200,
            removedAt: null,
            from: "bookworm@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e121",
            subject: "Project collaboration",
            body: "I have an idea for a new project. Let's collaborate on it.",
            isRead: false,
            sentAt: 1743038800,
            removedAt: null,
            from: "partner@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e122",
            subject: "Dinner invitation",
            body: "I'm hosting a dinner party next weekend. You're invited!",
            isRead: false,
            sentAt: 1642952400,
            removedAt: null,
            from: "host@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e123",
            subject: "New product launch",
            body: "We're launching a new product next month. Stay tuned for updates!",
            isRead: false,
            sentAt: 1542866000,
            removedAt: null,
            from: "marketing2@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e124",
            subject: "Weekend getaway",
            body: "Let's plan a weekend getaway to unwind and relax.",
            isRead: false,
            sentAt: 1442779600,
            removedAt: null,
            from: "relaxation@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          },
          {
            id: "e125",
            subject: "Important update",
            body: "There's an important update regarding our project. Please review it.",
            isRead: false,
            sentAt: 1342693200,
            removedAt: null,
            from: "manager@example.com",
            to: "user@example.com",
            status: "inbox",
            isStarred: false,
            labels: []
          }
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
      }
      return mails
    })
}
