import axios from 'axios';
import { useCookies } from 'react-cookie';
import { drfApiRoot } from "constants/drf"

export const verifyJwtToken = async () => {
  // const [cookies, setCookie] = useCookies(['accesstoken'], ['refreshtoken']);
  const [cookies, setCookie] = useCookies(['accesstoken']);
  // const [cookies, setCookie] = useCookies(['refreshtoken']);
  // const response = await
  await axios
    .post(
      `${drfApiRoot}/auth/jwt/verify`,
      {
        'username': 'sin',
        'password': 'aws'
      },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          // 'X-CSRFTOKEN': 'PSLIyJxgYhXWQhTBKL3PRbrOAZUEEcYGuVIJ2hQKOwp6gqY0kCUb7ybJvGIZ581L'
        }
      }.then(res => {
        setCookie('accesstoken', res.data.access, { path: '/', httpOnly: true });
        // setCookie('refreshtoken', res.data.refresh, { path: '/', httpOnly: true });
      }).catch(err => {
        console.log("miss");
      })
    )
}