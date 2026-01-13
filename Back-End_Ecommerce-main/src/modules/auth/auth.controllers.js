
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { z } from 'zod'
import SendResetPasswordEmail from '../resetPassword/SendResetPasswordEmail.js';
import * as AuthServices from './auth.services.js';
import * as UserRepo from '../user/user.repositories.js';
import * as AuthRepo from './auth.repositories.js'
import { success } from '../../shared/utils/response.js';
export const HandleRefreshToken = async (req, res, next) => {

  try {
    const token = req.cookies?.RefreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh Token found" })
    }
    const newAccessToken = await AuthServices.RefreshToken(token);
    return success(res, { token: newAccessToken }, "New access token generated");
  } catch (error) {
    next(error);
  }

}


export const Registers = async (req, res, next) => {
  try {

    const RegisterSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2)
    })
    const parseResult = RegisterSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: RegisterSchema.safeParse.error.errors })
    }
    const newUser = await AuthServices.Register(req.body);
    return success(res, { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }, "Tài khoản đăng ký thành công");
  } catch (error) {
    next(error);
  }
};
export const Login = async (req, res, next) => {
  try {
    const LoginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })
    const parseResult = LoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors })
    }

    const { AccessToken, RefreshToken, user } = await AuthServices.LogIn(req.body);
    return res.cookie('RefreshToken', RefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(200).json({ user: { id: user.id, name: user.nam, role: user.role }, token: AccessToken })
  } catch (error) {
    next(error);
  }
};
export const LoginGoogle = async (req, res, next) => {
  const { id_token } = req.body;
  try {
    const { AccessToken, RefreshToken, user } = await AuthServices.LoginWithGoogle(id_token);
    return res.cookie('RefreshToken', RefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(200).json({ user: { id: user.id, name: user.name, role: user.role }, token: AccessToken })
  } catch (error) {
    next(error)
  }
}
export const Logout = async (req, res, next) => {
  try {
    return res.clearCookie('RefreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    }).status(200).json({ message: 'Đăng xuất thành công' });
  } catch (error) {
    next(error);
  }
};






export const ForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await AuthServices.ForgotPassword(email);
    const token = jwt.sign({ id: user?.id, email: user?.email }, process.env.RESET_PASSWORD, { expiresIn: '10m' });
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`

    const htmlContent = `
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Đặt lại mật khẩu</title>
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:20px 0;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellspacing="0" cellpadding="0" 
        style="background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 3px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="text-align:center; padding-bottom:20px;">
              <h2 style="margin:0; font-size:24px; color:#111;">Password Reset Request</h2>
            </td>
          </tr>

          <!-- Welcome -->
          <tr>
            <td style="font-size:15px; color:#333;">
              <p style="margin:0 0 14px;">Hello <strong>${user.name || ""}</strong>,</p>
              <p style="margin:0 0 18px; line-height:1.5;">
                We received a request to reset your password. Click the button below to proceed:
              </p>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:20px 0 30px;">
              <a href="${resetLink}" 
                style="
                  background:#111827;
                  padding:14px 28px;
                  font-size:15px;
                  color:#fff;
                  text-decoration:none;
                  border-radius:6px;
                  display:inline-block;
                  font-weight:bold;
                ">
                  Reset Password
              </a>
            </td>
          </tr>

          <!-- Link -->
          <tr>
            <td style="font-size:14px; color:#444;">
              <p>If the button doesn’t work, copy and paste this link into your browser:</p>
              <p style="word-break:break-all;">
                <a href="${resetLink}" style="color:#1d4ed8;">${resetLink}</a>
              </p>
            </td>
          </tr>

          <!-- Note -->
          <tr>
            <td style="padding-top:20px;">
              <div style="
                background:#f8fafc;
                border-left:4px solid #0f172a;
                padding:12px 16px;
                border-radius:6px;
                font-size:13px;
                color:#334155;
                line-height:1.5;
              ">
                <b>Note:</b> This link will expire in <strong>10 minutes</strong>.
              </div>
            </td>
          </tr>

          <!-- Ignore -->
          <tr>
            <td style="font-size:14px; color:#555; padding-top:20px;">
              <p>If you did not request this password reset, simply ignore this email.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center; font-size:12px; color:#94a3b8; padding-top:25px;">
              <p style="margin:0;">Best regards,</p>
              <p style="margin:0;">Support Team</p>
              <p style="margin-top:10px; font-size:11px; color:#aaa;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await SendResetPasswordEmail(user.email, "Reset your password", htmlContent);
    await AuthRepo.createTokenByUserId(user.id, token, expiresAt);
    return res.status(200).json({ message: 'Password reset email sent' });

  } catch (error) {
    next(error);
  }
}




export const verifyResetToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD);
    if (decoded == null) {
      return res.status(400).json({ valid: false, message: "Invalid token" });
    }

    let token_user = await AuthRepo.getTokenByUserId(decoded?.id);
    if (token_user == null) {
      return res.status(404).json({ valid: false, message: "This reset link no longer exists" });
    }

    await AuthRepo.updateTokenByUserId(req?.user?.id);


    return res.status(200).json({ valid: true, userId: token_user.user_id });
  } catch (error) {
    next(error);
  }
};


export const ResetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD);
    if (decoded == null) {
      return res.status(400).json({ valid: false, message: "Invalid token" });
    }



    const user = await AuthServices.ResetPassword(decoded?.email, newPassword);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
}