const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('authToken')
  req.isAuth = false
  if (!token) {
    return next()
  }
  jwt
    .verify(token, 'shhhhh')
    .then((err, decoded) => {
      if (decoded) {
        req.isAuth = true
        req.userID = decoded.userID
        return next()
      }
      return next()
    })
    .catch((err) => {
      return next()
    })
}
