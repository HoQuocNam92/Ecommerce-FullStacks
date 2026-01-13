
import * as AuthRepo from '../../../modules/auth/auth.repositories.js';
import { error } from '../../utils/response.js';
import 'dotenv/config';


const authorization = async (req, res, next) => {
    const user = req.user;
    const isRole = await AuthRepo.GetRoleUserID(user.id);
    if (isRole !== "admin") {
        return error(res, 403, 'Access Denied. You do not have permission to access this resource.');
    }
    next();
}
export default authorization;