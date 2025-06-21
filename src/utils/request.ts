export const isTokenExpired = (expiresAt: Date | null) => {
  if (!expiresAt) return true;
  return new Date() >= new Date(expiresAt);
};
