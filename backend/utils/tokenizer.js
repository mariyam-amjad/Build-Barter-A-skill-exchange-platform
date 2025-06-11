const jwt = require('jsonwebtoken');

function tokenize(username, email, timeInMs=3600000 * 1 ){
    const token = jwt.sign(
        {username, email}, 
        process.env.SECRET_KEY, 
        {expiresIn: timeInMs}
    )
    console.log("New token generated !")
    return token
}

module.exports = tokenize;