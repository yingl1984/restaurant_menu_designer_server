require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: "postgresql://dunder_mifflin1:lovebaobao040117@localhost/restaurant_menu_designer",
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin1:lovebaobao040117@localhost/restaurant_menu_designer_test',
    // CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
    CLIENT_URL:'http://localhost:3000'
}