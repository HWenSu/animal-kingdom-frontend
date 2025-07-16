const baseUrl = "http://localhost:8080";

// 登入或註冊通用函式 post
export async function userAuthApi({
  url,
  body,
}) {

  try {
    const res = await fetch(url, {
      method: "POST",
      // 設定送出的資料格式
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(
        // 優先使用後端回傳的錯誤訊息
        data.error || data.message || "API請求失敗"
      );
      error.response = {
        data: data, // data 就是 { error: "帳號已被使用" }
        status: res.status,
      };
      throw error
    }
    return data;
  } catch (err) {
    // 這裡的 catch 主要捕捉網路錯誤或 JSON 解析錯誤
    throw err;
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

// 獲取 ENUM

export async function fetchAnimalsEnumApi() {
  try {
    const res = await fetch(`${baseUrl}/animal/enums`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Enums載入錯誤");
    }
    // 回傳整包資料
    return data;
  } catch (err) {
    console.error("獲取資料錯誤：", err);
    throw err;
  }
}
