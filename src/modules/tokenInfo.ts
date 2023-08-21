interface TokenInfo {
  sub: string;
  id: number;
  roles: string[];
  iat: number;
  exp: number;
}

export const getTokenInfo = (token: string): TokenInfo | null => {
  try {
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    console.log(payload)
    return {
      sub: payload.sub,
      id: payload.id,
      roles: payload.roles,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const convertToKST = (timestamp: number): Date => {
  const utcTimestamp = new Date(timestamp * 1000);
  return new Date(utcTimestamp.getTime() + 0 * 60 * 60 * 1000);
};