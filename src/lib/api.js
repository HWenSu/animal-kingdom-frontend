const baseUrl = "http://localhost:8080";

// 登入或註冊通用函式 post
export async function userAuthApi({
  e,
  url,
  username,
  password,
  errMessage,
  onSuccess,
}) {
  e.preventDefault();

  try {
    const res = await fetch(url, {
      method: "POST",
      // 設定送出的資料格式
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
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

// 獲取動物列表資料 api
export async function fetchAnimalsApi({currentPage}) {
  try {
    const res = await fetch(`${baseUrl}/animal?page=${currentPage}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "動物資料載入錯誤");
    }
    // 回傳整包資料
    return data;
  } catch (err) {
    console.error("獲取資料錯誤：", err);
    throw err;
  }
}

// 獲取單一動物資料 api

export async function fetchAnimalApi({ id }) {
  try {
    const res = await fetch(`${baseUrl}/animal/${id}`);
    console.log(`${baseUrl}/animal/${id}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "動物資料載入錯誤");
    }
    // 回傳整包資料
    return data;
  } catch (err) {
    console.error("獲取資料錯誤：", err);
    throw err;
  }
}
