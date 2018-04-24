const Yesterday = new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)
const Today = new Date().setTime(new Date().getTime())

module.exports = {
    PREFIX: 'http://10.66.140.9:6601',
    PREFIX2: 'http://10.66.140.9:6600',
    YESTERDAY: `${new Date(Yesterday).getFullYear()}-${new Date(Yesterday).getMonth() + 1}-${new Date(Yesterday).getDate()}`,
    TODAY: `${new Date(Today).getFullYear()}-${new Date(Today).getMonth() + 1}-${new Date(Today).getDate()}`,
    TODAY2: Today
}
