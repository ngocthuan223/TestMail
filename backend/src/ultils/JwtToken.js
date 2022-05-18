const { settings } = require("./AppConfig");
const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, settings.tokenSecret, { expiresIn: '30 days' });
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, settings.tokenSecret, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}