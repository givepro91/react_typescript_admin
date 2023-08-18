export async function login(userId: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
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
    sessionStorage.setItem("isAuthorized", "true");
    return user;
  }

  return null;
}
