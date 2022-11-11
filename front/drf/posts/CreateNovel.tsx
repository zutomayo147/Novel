import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
// import { useSetRecoilState } from "recoil"

type post = {
  post_title: string
  post_caption: string
  post_content: string
}

// export const CreateSnippeet = () => {
export const CreateNovel = () => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['accessToken']);

  const newNovel = useCallback(async (props: post) => {
    const { post_title, post_caption, post_content } = props
    await axios
      .post(
        `${drfApiRoot}/post/`,
        {
          post_title, post_caption, post_content
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${cookies.accessToken}`
          }
        }
      ).then((res) => {
        alert("new post")
        router.push("/user/")
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        alert(err)
        console.error("failed to post")
      })
  }, [])
  return newNovel
}
export default CreateNovel