const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt"); // descriptografar/criptografar a senha
const jwt = require("jsonwebtoken"); // gerar token

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        userSchema.findOne({
            email: req.body.email // buscar no banco de dados o email
        }, (error, user) => {
            if (!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            }
            const validPassoword = bcrypt.compareSync(req.body.password, user.password) // comparar a senha do body da requisição com a senha do usuario

            if (!validPassoword) {
                return res.status(401).send({
                    message: "Login não autorizado"
                })
            }

            const token = jwt.sign({name: user.name} , SECRET)

            // se for autorizado

            res.status(200).send({
                message: "Login autorizado", token
            })
        })
        // login autorizado e autenticado

    } catch (e) {
        console.error(e)
    }

}

module.exports = {
    login
}