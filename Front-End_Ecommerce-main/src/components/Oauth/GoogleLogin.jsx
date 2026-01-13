import { GoogleOAuthProvider } from '@react-oauth/google';
const GoogleLogin = () => {
    return (
        <GoogleOAuthProvider clientId="<your_client_id>">...</GoogleOAuthProvider>
    )
}

export default GoogleLogin