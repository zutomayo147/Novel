import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
// import { useCookies } from 'react-cookie';

// import { useSetRecoilState } from "recoil"

type snippet = {
  title: string
  caption: string
  content: boolean
}

// export const CreateSnippeet = () => {
export const CreateNovel = () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['accessToken']);
  console.log(cookies.accessToken)

  const newNovel = useCallback(async (props: snippet) => {
    const { title, caption, content } = props
    await axios
      .post(
        `${drfApiRoot}/posts/`,
        {
          title, caption, content
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${cookies.accessToken}`
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
  return newNovel
}
export default CreateNovel