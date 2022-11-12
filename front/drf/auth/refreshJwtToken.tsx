import axios from 'axios';
import { useCookies } from 'react-cookie';
import { drfApiRoot } from "constants/drf"
import { useCallback } from "react"

// export const refreshJwtToken = async () => {
const UseRefreshJwtToken = () => {
  const [accessToken, setAccessToken] = useCookies(['accessToken']);
  const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);
  // const response = await
  // const refreshJWT = useCallback(async (props: userInfo) => {
  const refreshJWT = useCallback(async () => {
    await axios
      .post(
        `${drfApiRoot}/auth/jwt/refresh/`,
        {
          refreshToken
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFTOKEN': 'PSLIyJxgYhXWQhTBKL3PRbrOAZUEEcYGuVIJ2hQKOwp6gqY0kCUb7ybJvGIZ581L'
          }
        }.then(res => {
          // setAccessToken('accesstoken', res.data.access, { path: '/', httpOnly: true });
          // setRefreshToken('refreshtoken', res.data.refresh, { path: '/', httpOnly: true });
          setAccessToken('accessToken', res.data.access, { path: '/' });
          setRefreshToken('refreshToken', res.data.refresh, { path: '/' });
        }).catch(err => {
          console.log("miss");
          alert("ログインしてください");
        })
      )
  }, [])
}
export default UseRefreshJwtToken