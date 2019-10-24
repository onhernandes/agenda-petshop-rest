const mysql = require('mysql')
const config = require('config')

const conexao = mysql.createConnection({
  host: config.get('mysql.host', 'localhost'),
  port: config.get('mysql.port', 3306),
  user: config.get('mysql.user', 'root'),
  password: config.get('mysql.password', 'admin'),
  database: config.get('mysql.database', 'agenda-petshop')
})

module.exports = conexao
