import React, { useState } from "react"
import axios, { AxiosError } from "axios"

export const App = (): JSX.Element => {
  const [file, setFile] = useState<File | null>(null)

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  const onClickSubmit = async () => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append("file", file)

    await axios.post(`${apiUrl}/api/upload`, formData)
      .then((res) => {
        console.log(res.data)
      })
      .catch((e: AxiosError) => {
        console.error(e)
      })
  }
}

return (
  <div className="App">
    <div className="App-form">
      <input
        name="file"
        type="file"
        accept="image/*"
        onChange={onChangeFile}
      />
      <input type="button" disabled={!file} value="送信" onClick={onClickSubmit} />
    </div>
  </div>
)
}