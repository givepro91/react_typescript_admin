import * as tokenUtils from "./tokenInfo"

export async function login(userId: string, password: string) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userId,
      password: password,
    }),
  });

  const user = await res.json();

  if (user.token) {
    const tokenInfo = tokenUtils.getTokenInfo(user.token)  
    sessionStorage.setItem("accessToken", user.token);
    console.log(tokenInfo)
    if (tokenInfo) {
      const formattedExpirationTime = tokenUtils.convertToKST(tokenInfo.exp).toLocaleString('en-US');
      sessionStorage.setItem("expireAt", formattedExpirationTime);
    }

    return user.token;
  }

  return null;
}
