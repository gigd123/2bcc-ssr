export const getUserToken = () => localStorage?.getItem("token");
export const getUserAccount = () => localStorage?.getItem("account");

export function getCookie(cname) {
  if (typeof document !== "undefined") {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return "";
}

export function clearCookie(cname) {
  if (typeof document !== "undefined") {
    const d = new Date();
    d.setTime(d.getTime() + -1 * 24 * 60 * 60 * 1000);
    const expires = d.toUTCString();
    document.cookie = `${cname}=;expires=${expires};path=/`;
  }
}

export function tokenErr() {
  console.trace("ErrTrace");
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("closePopupGuest");
    sessionStorage.removeItem("closePopupMember");
    sessionStorage.removeItem("closeDownload");
    // sessionStorage.removeItem("tawk")
    sessionStorage.removeItem("promotionBanner");
    sessionStorage.removeItem("gameBrand");

    localStorage.removeItem("token");
    localStorage.removeItem("account");
    localStorage.removeItem("lottoCount");
    clearCookie("data");

    //目前沒有用到，但要把之前已存的刪乾淨
    localStorage.removeItem("checkViewDesktop");

    setTimeout(() => {
      localStorage.setItem("tokenErr", "tokenErr");
      window.location.href = "/";
    }, 2500);
  }
}

export async function apiResError(res) {
  if (res?.msg) {
    //   Notify.create({
    //     icon: "report_problem",
    //     position: "center",
    //     message: `${res.msg}`,
    //     timeout: 3500,
    //     spinnerSize: 50,
    //   })
  }

  const error = new Error();
  const stackLines = error.stack.split("\n");
  const functionNameLine = stackLines[2].trim();
  const fileLocationLine = stackLines[2].trim();
  const functionName = functionNameLine.substring(
    functionNameLine.indexOf("at ") + 3,
    functionNameLine.lastIndexOf(" (")
  );
  const fileLocation = fileLocationLine.substring(
    fileLocationLine.lastIndexOf("(") + 1,
    fileLocationLine.lastIndexOf(")")
  );

  console.log(
    `👺%c\nMsg: ${res.msg}\nFunction: ${functionName}\nFile: ${fileLocation}`,
    "color: #f0404b;"
  );
}

export async function apiError(error) {
  // Notify.create({
  //   icon: "report_problem",
  //   position: "center",
  //   message: `Network Error, Please try again later. ${error}`,
  //   timeout: 3500,
  //   spinnerSize: 50,
  // })
  console.error(`Msg: ${error}`);
}
