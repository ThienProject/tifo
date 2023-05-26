import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { loginGoogleThunk } from 'src/redux_store/user/user_action';
import { useAppDispatch } from 'src/redux_store';
import { useNavigate } from 'react-router';
interface ILoginInfo {
  access_token: string;
}
interface IGoogleUser {
  id: string;
  picture: string;
  name: string;
  email: string;
  birthday: Date;
}
function LoginGoogle() {
  const [loginInfo, setLoginInfo] = useState<ILoginInfo>();
  const [profile, setProfile] = useState<IGoogleUser | null>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setLoginInfo(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (loginInfo) {
      axios
        .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${loginInfo.access_token}`, {
          headers: {
            Authorization: `Bearer ${loginInfo.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          const { email, id: id_user, name: fullname } = res.data;
          if (res.data) {
            const action = loginGoogleThunk({ email: res.data.email });
            dispatch(action)
              .unwrap()
              .then((data) => {
                const { user } = data;
                if (!user) {
                  throw new Error();
                } else {
                  navigate('/');
                }
              })
              .catch(() => {
                navigate('/auth/register', {
                  state: {
                    email,
                    id_user,
                    fullname
                  }
                });
              });
          }
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loginInfo]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <Box>
      {profile ? (
        <div>
          <img src={profile?.picture} alt='user' />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <Button onClick={() => login()}>Sign in with Google 🚀 </Button>
      )}
    </Box>
  );
}
export default LoginGoogle;
