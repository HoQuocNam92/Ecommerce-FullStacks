
import jwt from 'jsonwebtoken';
const genarateToken = (payload, secret, time) => {
    return jwt.sign(payload, secret, {
        expiresIn: time
    });
}
export default genarateToken;