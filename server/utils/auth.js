const jwt = require('jsonwebtoken');
const SECRET = process.env.AUTH_SECRET;

module.exports = {
    createAuthContext({ req }) {
        const token = req.headers.userization?.split(" ")[1]
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
    signToken({ _id, username, email }) {
        return jwt.sign({ data: { _id, username, email } }, SECRET)
    }
}
