const jwt = require('jsonwebtoken')

function detokenize(token){
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    return decodedToken
}

module.exports = detokenize