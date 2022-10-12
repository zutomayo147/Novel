import axios from 'axios';
import { useCookies } from 'react-cookie';
import { drfApiRoot } from "constants/drf"
import { useCallback } from "react"

type userInfo = {
  // email: string
  userName: string
  password: string
}

// TODO
// export const GetJwtToken = async (props: userInfo): void => {
// export const GetJwtToken = async (props: userInfo) => {
// export const GetJwtToken = async () => {
export const GetJwtToken = () => {
  // const [accsesToken, setAccessToken] = useCookies(['accsesToken']);
  // const [accsesToken, setAccessToken] = useCookies(['accessToken']);
  const [cookies, setCookie] = useCookies(['accessToken']);
  // const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);

  const getJWT = useCallback(async (props: userInfo) => {
    const { password, userName } = { ...props }
    await axios
      .post(
        `${drfApiRoot}/auth/jwt/create`,
        {
          'username': userName,
          'password': password
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
        // console.log('get jwt')
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