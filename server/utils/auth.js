const jwt = require('jsonwebtoken');
const SECRET = process.env.AUTH_SECRET;

module.exports = {
    createAuthContext({ req }) {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) return {}
        try {
            const user = jwt.verify(token, SECRET)
            return {
                user
            }
        } catch {
            return {}
        }
    },
    signToken({ _id, userName, email }) {
        return jwt.sign({ data: { _id, userName, email } }, SECRET)
    }
}
