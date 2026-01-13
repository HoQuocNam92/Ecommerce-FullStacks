import bcrypt from 'bcrypt';
import genarateToken from '../../shared/utils/jwt.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import * as UserRepo from '../user/user.repositories.js';
import * as TokenRepo from '../access-control/refreshToken.repositories.js';
import * as AuthRepo from './auth.repositories.js';
import { OAuth2Client } from 'google-auth-library';

import dayjs from 'dayjs'
export const Register = async (data) => {
    const hasUser = await AuthRepo.FindEmail(data.email);
    if (hasUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await UserRepo.createUser(data)
    return user;
};
export const LogIn = async (data) => {

    const user = await AuthRepo.Login(data.email);

    if (!user) {
        throw new Error("NOT_USER");
    }

    const password = await bcrypt.compare(data.password, user.password);
    if (!password) {
        throw new Error("INVALID_PASSWORD");
    }


    const AccessToken = genarateToken({ id: user.id, email: data.email, role: user.role }, process.env.AccessToken, '1h');
    const RefreshToken = genarateToken({ id: user.id, email: data.email, role: user.role }, process.env.RefreshToken, '30d');

    const expiresVN = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm:ss');

    const tokenHash = await bcrypt.hash(RefreshToken, 10);

    const addToken = await upsetRefereshToken({ userID: user.id, tokenHash: tokenHash, expires: expiresVN });
    if (!addToken) throw new Error("ADD_TOKEN_ERROR");

    return { AccessToken, RefreshToken, user }


};
export const LoginWithGoogle = async (id_token) => {
    const client = new OAuth2Client(process.env.CLIENT_ID_Google);
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID_Google
    })
    const payload = ticket.getPayload();
    const hasUser = await UserRepo.findEmail(payload.email);
    if (!hasUser) {
        await UserRepo.createUser(payload)
    }
    const user = await AuthRepo.Login(payload.email);
    const AccessToken = genarateToken({ id: user.id, email: payload.email, role: user.role }, process.env.AccessToken, '1h');
    const RefreshToken = genarateToken({ id: user.id, email: payload.email, role: user.role }, process.env.RefreshToken, '30d');

    const expiresVN = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm:ss');

    const tokenHash = await bcrypt.hash(RefreshToken, 10);

    const addToken = await upsetRefereshToken({ userID: user.id, tokenHash: tokenHash, expires: expiresVN });
    if (!addToken) throw new Error("ADD_TOKEN_ERROR");

    return { AccessToken, RefreshToken, user }
}
export const ForgotPassword = async (email) => {
    const user = await UserRepo.findEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export const ResetPassword = async (email, newPassword) => {
    const user = await UserRepo.findEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updated = UserRepo.updatePassword(user.id, hashedPassword);
    if (!updated) throw new Error("Updated failed");
    return { message: 'Password reset successfully' };

}


export const upsetRefereshToken = async ({ userID, tokenHash, expires }) => {
    try {
        const existingToken = await TokenRepo.getRefreshToken(userID);
        if (existingToken) {
            return await TokenRepo.updateRefreshToken({ userID, tokenHash, expires });
        }
        return await TokenRepo.addRefreshToken({ userID, tokenHash, expires });
    } catch (error) {
        throw error;
    }
};

export const RefreshToken = async (token) => {
    try {

        const decoded = jwt.verify(token, process.env.RefreshToken);
        if (!decoded) {
            throw new Error("Invalid refresh token.");
        }

        const payload = { id: decoded.id, email: decoded.email, role: decoded.role }
        const tokenDB = await TokenRepo.getRefreshToken(decoded.id);
        if (!tokenDB) {
            throw new Error("NOT_FOUND_TOKEN");
        }

        const tokenCompare = await bcrypt.compare(token, tokenDB.tokenHash);

        if (!tokenCompare) {
            throw new Error("Token incorect")
        }

        if (dayjs().isAfter(dayjs(tokenDB.expires))) {
            throw new Error("Token expired")
        }
        const newAccessToken = genarateToken(payload, process.env.AccessToken, '1h');


        return newAccessToken
    } catch (error) {
        throw error
    }
}