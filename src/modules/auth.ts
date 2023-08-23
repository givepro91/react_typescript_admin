import Api from "../configs/apiConfigs";
import * as tokenUtils from "./tokenInfo";

export default class AuthApi extends Api {
  async login(userId: string, password: string) {
    const params = {
      email: userId,
      password: password,
    };

    try {
      const res = await super
      .post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        JSON.stringify(params)
      );
      const user = res.data as { token: string };
        if (user.token) {
          const tokenInfo = tokenUtils.getTokenInfo(user.token);
          console.log(tokenInfo);
          if (tokenInfo?.roles.includes("ROLE_ADMIN")) {
            sessionStorage.setItem("accessToken", user.token);
            sessionStorage.setItem("refreshToken", user.token);
            const formattedExpirationTime = tokenUtils
              .convertToKST(tokenInfo.exp)
              .toLocaleString("en-US");
            sessionStorage.setItem("expireAt", formattedExpirationTime);
            console.log(sessionStorage)
            return user.token;
          } else {
            alert("접근 권한이 없는 계정입니다.");
            return;
          }
        } else {
          const error = res.data as { result: { code: number; msg: string } };
          alert(error.result.msg);
        }
    } catch (error) {
      // const error = res.data as { result: { code: number; msg: string } };
      // alert(error.result.msg);
    }
  }

  async refresh() {
    await super
      .put(`${process.env.REACT_APP_API_URL}/auth/refresh`)
      .then(function (res) {
        const user = res.data as { token: string };
        if (user.token) {
          const tokenInfo = tokenUtils.getTokenInfo(user.token);
          console.log(tokenInfo);
          if (tokenInfo?.roles.includes("ROLE_ADMIN")) {
            sessionStorage.setItem("accessToken", user.token);
            sessionStorage.setItem("refreshToken", user.token);
            const formattedExpirationTime = tokenUtils
              .convertToKST(tokenInfo.exp)
              .toLocaleString("en-US");
            sessionStorage.setItem("expireAt", formattedExpirationTime);
          } else {
            return;
          }

          return user.token;
        }
      });
  }
}
