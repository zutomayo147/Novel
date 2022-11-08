import { useState, useEffect } from "react";
import "./styles.css";

const res = {
  data: {
    message: null,
    results: [
      {
        address1: "東京都",
        address2: "港区",
        address3: "芝公園",
        kana1: "ﾄｳｷｮｳﾄ",
        kana2: "ﾐﾅﾄｸ",
        kana3: "ｼﾊﾞｺｳｴﾝ",
        prefcode: "13",
        zipcode: "1050011"
      }
    ],
    status: 200
  }
};

export default function App() {
  const [query, setQuery] = useState({}); // クエリ
  const [resultTxt, setResultTxt] = useState(""); //　住所

  useEffect(() => {
    const fetchData = () => {
      // 取得した住所を格納
      let getAddress = query.data.results[0];

      setResultTxt(
        `〒${getAddress.zipcode}\n${getAddress.address1}${getAddress.address2}${getAddress.address3}`
      );
    };
    if (query.data) fetchData();
  }, [query]); //　住所検索がクリックされたら実行

  // 住所検索をクリックした時
  const onClickGetArea = () => {
    setQuery(res);
  };

  return (
    <div>
      <p>「住所検索」ボタンをクリックすると、東京タワーの住所が表示されます</p>
      <button onClick={onClickGetArea}>住所検索</button>
      <p>{resultTxt}</p>
    </div>
  );
}