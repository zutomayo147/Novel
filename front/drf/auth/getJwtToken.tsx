import axios from 'axios';
import { useCookies } from 'react-cookie';
import { drfApiRoot } from "constants/drf"
import { useCallback } from "react"
import { userInfo } from "types/userInfo"

// type GetJWT = (props: userInfoJWT) => number;

export const GetJwtToken = () => {
  const [accessToken, setAccessToken] = useCookies(['accessToken']);
  const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);

  const getJWT = useCallback(async (props: userInfo) => {
    const { email, password } = props
    await axios
      .post(
        `${drfApiRoot}/auth/jwt/create/`,
        {
          email, password
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      )
      .then(res => {
        console.log(res.data.access)
        setAccessToken('accessToken', res.data.access, { path: '/' });
        setRefreshToken('refreshToken', res.data.refresh, { path: '/' });
        // setAccessToken('accessToken', res.data.access, { path: '/',httpOnly:true });
        // setRefreshToken('refreshToken', res.data.refresh, { path: '/',httpOnly:true });
      })
      .catch(err => {
        console.log("coudn't get JWT");
        alert("認証に失敗しました");
      })
  }, [])
  return getJWT
}
export default GetJwtToken