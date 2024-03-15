import API from "../api";

export const verifyAccessToken = async (
  access?: string | null
): Promise<string | undefined> => {
  if (!access) return;

  try {
    await API.verifyToken(access);
    return access;
  } catch {}
};
