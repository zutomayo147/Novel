import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
// import { useCookies } from 'react-cookie';

// import { useSetRecoilState } from "recoil"

type snippet = {
  title: string
  code: string
  linenos: boolean
  language: string
  style: string
}
//   "title": "たいとる",
//   "code": "print",
//   "linenos": true,
//   "language": "python",
//   "style": "abap"


// export const CreateSnippeet = () => {
export const CreateSnippeet = () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['accessToken']);
  // console.log(cookies.csrftoken)
  console.log(cookies.accessToken)
  // console.log(11)
  // {csrftoken: 'FFSIpGEy4bM922oxqaD5XQTUIQJSOFrPSSj0HhwUrw0cTFzVWgrTJ7bhv9yFdFNU', isLogin: 'true', accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90e…iOjF9.SWK9PymuE8ymoNEX2ZXIQ-JqFd3qBIKYM8rGKRlR_ro'}

  const newSnippet = useCallback(async (props: snippet) => {
    // const { email, password, userName } = props
    // const { password, userName } = props
    const { title, code, linenos, language, style } = props
    await axios
      .post(
        `${drfApiRoot}/snippets/`,
        {
          'title': title,
          'code': code,
          'linenos': linenos,
          'language': language,
          'style': style,

        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            // 'CSRFTOKEN': 'cookies.csrftoken',
            'Authorization': `JWT ${cookies.accessToken}`
            // 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzI1MzA0LCJqdGkiOiJhNGMzZWRlMGU2ODg0MzM4YTc1M2QyMjFhYzMxYTFiMiIsInVzZXJfaWQiOjF9.SWK9PymuE8ymoNEX2ZXIQ-JqFd3qBIKYM8rGKRlR_ro',
            // 'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNzI1MzA0LCJqdGkiOiJhNGMzZWRlMGU2ODg0MzM4YTc1M2QyMjFhYzMxYTFiMiIsInVzZXJfaWQiOjF9.SWK9PymuE8ymoNEX2ZXIQ-JqFd3qBIKYM8rGKRlR_ro'
          }
        }
      ).then((res) => {
        // TODO
        alert("new snippet")
        router.push("/user/")
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        alert(err)
        console.error("failed to create")
      })
      .catch((err) => {
        alert(err)
        console.error("failed to signIn")
      })
  }, [])
  return newSnippet
}
export default CreateSnippeet