import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [zip, setZip] = useState(""); //　郵便番号（入力）
  const [query, setQuery] = useState("");
  const [resultTxt, setResultTxt] = useState(""); //　住所

  useEffect(() => {
    const fetchData = () => {
      console.log("データを取得します");
      console.log(query);

      axios
        .get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${query}`)
        .then((res) => {
          console.log(res);
          // APIがうまく動作していない時のエラー
          if (res.status !== 200) {
            throw new Error("APIがうまく動作していないようです");
          } else {
            // 郵便番号の桁数が不正の場合のメッセージ
            if (res.data.message) {
              setResultTxt(res.data.message);
              return;
            }

            // 郵便番号が存在しない場合のエラーメッセージ
            if (res.data.results == null) {
              setResultTxt("郵便番号が見つかりませんでした");
              return;
            }

            // 取得した住所を格納
            let getAddress = res.data.results[0];

            setResultTxt(
              `〒${getAddress.zipcode}\n${getAddress.address1}${getAddress.address2}${getAddress.address3}`
            );
          }
        })
        .catch((err) =>
          setResultTxt(`データがうまく取得できませんでした。${err}`)
        );
    };

    if (query) fetchData(); // 郵便番号が入力されてたら実行
  }, [query]); /// zipの値が更新されたら実行

  // 住所検索をクリックした時
  const onClickGetArea = () => {
    console.log("住所検索をクリックしました");

    // 未入力だったらアラートを表示
    if (zip === "") {
      alert("郵便番号を入力してください");
      return;
    }

    //　データ取得
    setQuery(zip);
  };

  const inputStyle = {
    border: "1px solid #ccc",
    padding: "5px 10px",
    borderRadius: "4px",
    marginRight: "10px"
  };

  const h1Style = {
    fontSize: "1.2em",
    color: "#b09851",
    background: "#e9e1c8",
    padding: "5px 10px"
  };

  return (
    <div>
      <h1 style={h1Style}>住所検索サンプル</h1>
      <p>
        郵便番号を入力して「住所検索」ボタンをクリックしてください
        <br />
        <span style={{ fontSize: ".8em" }}>例：1050011</span>
      </p>
      <input
        style={inputStyle}
        type="text"
        value={zip}
        placeholder="郵便番号を入力してください"
        onChange={(e) => setZip(e.target.value)}
      />
      <button onClick={onClickGetArea}>住所検索</button>
      <p>{resultTxt}</p>
    </div>
  );
}