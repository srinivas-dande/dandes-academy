import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    return verifyToken(token);

  } catch (err) {
    console.error("Session error:", err);
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: false,
    maxAge: 0,
    path: "/",
  });
}
