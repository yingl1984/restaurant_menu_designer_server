require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: (this.NODE_ENV === 'development')?'postgresql://dunder_mifflin1@localhost/rental-property-notebook':'postgres://atqaqqqbhitxfo:20ad2dc4e9c24c3418df8800f2db856a0fc886f255e3b4f85cf13271dfa340aa@ec2-34-225-167-77.compute-1.amazonaws.com:5432/dfem9stdj7l60g?ssl=true',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin1:lovebaobao040117@localhost/rental-property-notebook-test',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000'
}