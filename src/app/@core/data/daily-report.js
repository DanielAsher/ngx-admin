
var Realm = require('realm')
var BooksSchema = require('./books-schema')
var UserSchema = require('./user-schema')
var RealmAdminSchema = require('./realm-admin-model')

var nodemailer = require('nodemailer')

var realmServerIP = '34.243.104.109'
var realmAuthURL = 'http://' + realmServerIP
var realmBooksURL = 'realm://' + realmServerIP + '/books'
var realmAdminURL = 'realm://' + realmServerIP + '/__admin'
var adminUsername = 'dan@lexilabs.co'
var adminPassword = 'dan@lexilabs.co'

function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()-1);
    return date
}

Realm.Sync.User.login(realmAuthURL, adminUsername, adminPassword)
.then( adminUser => {
    var ra = RealmAdminSchema
    const config = {
        schema: [ra.User, ra.Account, ra.UserMetadataRow],
        sync: {
          user: adminUser,
          url: realmAdminURL,
          error: err => console.log(err)
        }
    }
    function runQueryAndSendEmail() {
        const yesterday = getYesterdaysDate()
        console.log('📅 yesterday:', yesterday)
        Realm.open(config).then( realm => {

            var users = realm.objects('User')
            console.log("💋🔢 number of users", users.length)

    //         // console.log(users)
            const pagesRead = users.map( user => {

                const userRealmURL = `realm://${realmServerIP}/${user.userId}/user`
                console.log(userRealmURL)
                const us = UserSchema
                const userConfig = {
                    schema: [us.User, us.ExerciseGroup, us.ExerciseResult, us.MasterUser, us.UserBookResult, us.UserProfileIcon, us.UserRecords],
                    sync: {
                    user: adminUser,
                    url: userRealmURL,
                    error: err => console.log(err)
                    }
                }

                return Realm.open(userConfig)
                .then( userRealm => {

                    const exerciseGroups = userRealm.objects('ExerciseGroup')
                        .filtered('type = "Exercise" AND startDate != nil AND startDate > $0', yesterday) // ADD startDate > $0', yesterday)
                    console.log('💯', userRealmURL, exerciseGroups.map( group => {
                        console.log(group.startDate, yesterday)
                        return group.startDate > yesterday }
                        ))
                    return exerciseGroups.length

                }).catch( error => {
                    console.log(error, `Unable to login to user realm ${userRealmURL}`)
                })
            })
            //End of PagesRead

            console.log(pagesRead)

            const totalPagesRead = Promise.all(pagesRead).then( values => {
                return values.reduce( (total, value) => { return total + value} )
            }) //Promise
            .then( totalPagesRead => {

                console.log('😎🍻', 'totalPagesRead:', totalPagesRead)

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'lexilabsllc@gmail.com',
                    pass: 'Lexilabs354'
                    }
                })

                // const sendEmail = () => {
                var message = `Exercise groups started in the last 24 hours: ${totalPagesRead}`
                var mailOptions = {
                    from: 'info@lexilabs.co',
                    to: 'dan@lexilabs.co, lexilabsllc@gmail.com',
                    subject: 'Updated Report',
                    text: message
                }
                //'sebtimpson@gmail.com, info@lexilabs.co,

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                    console.log(error)
                    } else {
                    console.log('Email sent: ' + info.response)
                    }
                })
            }) //End of totalpagesread
        })
            //sendEmail()
    }
    runQueryAndSendEmail()
    const twentyFourHoursInMilliseconds = 86400000
    const intervalTime = twentyFourHoursInMilliseconds /* 60000 */

    setInterval(runQueryAndSendEmail, intervalTime )
    }
)
.catch( error => {
    console.log('❗️ Error:', error)
})

console.log("😀 Script run...")

