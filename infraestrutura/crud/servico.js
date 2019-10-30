const executaQuery = require('../database/queries')

class Servico {
  lista(res) {
    const sql = 'SELECT * FROM Servicos'

    executaQuery(res, sql)
  }

  buscaPorId(res, id) {
    const sql = `SELECT * FROM Servicos WHERE id=${parseInt(id)}`

    executaQuery(res, sql)
  }

  adiciona(res, item) {
    const { nome, preco, descricao } = item
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`

    executaQuery(res, sql)
  }

  async adicionaVarios(res, item) {
    const { nome, preco, descricao } = item
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`
    const fakeExecutaQuery = (q) => new Promise(
      (resolve, reject) => executaQuery({ json: resolve }, q)
    )

    let chunks = []

    for (let i = 0; i < 1000; i++) {
      if (chunks.length < 50) {
        await Promise.all(chunks)
        chunks = []
      }

      chunks.push(fakeExecutaQuery(sql))
    }

    res.json({ ok: true })
  }

  atualiza(res, novoItem, id) {
    const { nome, preco, descricao } = novoItem
    const sql = `UPDATE Servicos SET nome='${nome}', Preco=${preco}, Descricao='${descricao}' WHERE id=${id}`

    executaQuery(res, sql)
  }

  deleta(res, id) {
    const sql = `DELETE FROM Servicos WHERE id=${id}`

    executaQuery(res, sql)
  }
}

module.exports = new Servico
