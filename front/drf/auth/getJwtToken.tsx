import axios from 'axios';
import { useCookies } from 'react-cookie';
import { drfApiRoot } from "constants/drf"
import { useCallback } from "react"

type userInfo = {
  email: string
  // userName: string
  password: string
}

// TODO
export const GetJwtToken = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  // const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);

  const getJWT = useCallback(async (props: userInfo) => {
    // const { password, userName } = { ...props }
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
            // 'X-CSRFTOKEN': 'PSLIyJxgYhXWQhTBKL3PRbrOAZUEEcYGuVIJ2hQKOwp6gqY0kCUb7ybJvGIZ581L'
          }
        }
      )
      .then(res => {
        console.log(res.data.access)
        setCookie('accessToken', res.data.access, { path: '/' });
        // setCookie('accessToken', res.data.access, { path: '/', httpOnly: true });
        // setRefreshToken('refreshToken', res.data.refresh, { path: '/', httpOnly: true });
        // setRefreshToken('refreshToken', res.data.refresh, { path: '/' });
      })
      .catch(err => {
        console.log("miss");
      })
  }, [])
  return getJWT
}
export default GetJwtToken