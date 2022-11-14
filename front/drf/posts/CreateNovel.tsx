import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
import {post} from "types/post"
// import { useSetRecoilState } from "recoil"

export const CreateNovel = () => {
  const router = useRouter()
  const [cookie, setAccessToken] = useCookies(['accessToken']);

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
            'Authorization': `JWT ${cookie.accessToken}`
          }
        }
      ).then((res) => {
        alert("new post")
        router.push("/user/")
        console.log(res.data)
      })
      .catch(err => {
        alert("failed to post")
      })
  }, [])
  return newNovel
}
export default CreateNovel