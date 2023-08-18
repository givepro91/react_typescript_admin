import React from "react";

const baseURL = "https://dev-api2.landbook.me/";

const login = async (username: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  });

  const user = await res.json();

  if (user.token) {
    return user;
  }

  return null;
};
