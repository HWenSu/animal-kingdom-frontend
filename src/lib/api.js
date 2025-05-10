
export async function userAuthApi ({ e, url, username, password, errMessage, onSuccess }) {
  e.preventDefault()

  try {
    const res = await fetch(url, {
      method: "POST",
      // 設定送出的資料格式
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log("後端回傳內容：", data); // <-- 加這一行
    if (!res.ok) {
      throw new Error(data.message || errMessage);
    }
    // 成功時由外部決定要做什麼
    onSuccess(data);
  } catch (err) {
    console.error("登入錯誤：", err);
    alert(err.message);
  }
}

// feedback 登入成功或登入失敗
