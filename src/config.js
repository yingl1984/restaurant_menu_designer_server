require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: "postgres://oregflybujkekn:51ccd4363b781a938928ef5948d0d75fc700a4547ee0d5165355c569fac9e499@ec2-34-200-94-86.compute-1.amazonaws.com:5432/d9j70cq5avrpgo",
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin1:lovebaobao040117@localhost/restaurant_menu_designer_test',
    // CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
    CLIENT_URL:'http://localhost:3000'
}