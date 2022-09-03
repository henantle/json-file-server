const fs = require('fs')
const sqlite = require('sqlite3').verbose()

const filesFolder = './files'

const insertFromFiles = (fName) => {
    try {
        sql = "INSERT OR REPLACE INTO responses (idtext, response) VALUES (?, ?)"
        console.log(fName)
        fs.existsSync(filesFolder + '/' + fName)
        let idtext = fName.split('.')[0]
        let obj = fs.readFileSync(filesFolder + '/' + fName, 'utf8')
        obj = JSON.parse(obj)
        database.run(sql, [idtext, JSON.stringify(obj)])
    } catch (err) {
        console.error("catn", err)
    }

}

const readFiles = () => {
    fs.readdir(filesFolder, (err, files) => {
        files.forEach(f => insertFromFiles(f))
    })
}

let database = new sqlite.Database("database.sqlite")
database.exec('CREATE TABLE IF NOT EXISTS responses (idtext text UNIQUE, response text, CONSTRAINT file_const UNIQUE (idtext));')
readFiles()
module.exports = database