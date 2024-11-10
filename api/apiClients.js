import { getUserToken, getUserAccount } from "@/utils/utils";

const getDefaultPostData = ({ reqUrl }) => {
  const isServer = import.meta.server;
  let path = isServer ? reqUrl.pathname : window?.location.pathname;
  const langFromPath = path.split("/")[1];

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const validTimeZone =
    timeZone && /^[A-Za-z]+\/[A-Za-z_]+$/.test(timeZone)
      ? timeZone
      : "Asia/Jakarta";
  let origin = "";
  if (isServer) {
    origin =
      reqUrl?.hostname === "localhost"
        ? "https://dev-jolli.idndemo.com"
        : reqUrl?.origin;
  } else {
    window.location.hostname === "localhost"
      ? "https://dev-jolli.idndemo.com"
      : window.location.origin;
  }

  return {
    origin,
    lang: langFromPath === "en" ? "en" : "id",
    account: "",
    token: "",
    zone: validTimeZone,
  };
};

// 使用 `$fetch` 請求
export const apiRequest = async ({
  apiUrl,
  postData = {},
  options = {},
  userVerify,
  dontCheckHighRisk,
  reqUrl,
}) => {
  // const { public: { apiBaseUrl } } = useRuntimeConfig();
  const baseURL = process.env.APP_API_HOST;
  const isClient = import.meta.client;
  if (isClient) {
    const account = getUserAccount();
    const token = getUserToken();
    if (userVerify && !(token && account)) {
      console.log("用戶未登入");
      return { data: {} };
    } else if (!dontCheckHighRisk && localStorage?.getItem("HighRisk")) {
      if (!window.location.pathname.includes("forceChangePassword")) {
        let urlLangParam = localStorage?.getItem("urlLangParam");
        window.location.href = urlLangParam
          ? `/${urlLangParam}/forceChangePassword`
          : "/forceChangePassword";
      }
      console.log("高風險玩家");
      return { data: {} };
    }
  }
  const fetchOptions = {
    method: "POST",
    body: new URLSearchParams({
      ...getDefaultPostData({ reqUrl }),
      ...postData,
    }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...options.headers,
    },
    ...options,
  };
  try {
    const response = await $fetch(`${baseURL}${apiUrl}`, fetchOptions);
    console.log("response", response);
    return JSON.parse(response);
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
