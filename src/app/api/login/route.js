import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // -----------------------------
    // 1️⃣ Validate login credentials
    // -----------------------------
    const loginUser = await prisma.UserLoginDetails.findUnique({
      where: { username },
    });

    if (!loginUser) {
      return NextResponse.json({ ok: false, message: "User not found" });
    }

    if (loginUser.password !== password) {
      return NextResponse.json({ ok: false, message: "Incorrect password" });
    }

    // ✅ Increment login count
    await prisma.UserLoginDetails.update({
      where: { username },
      data: {
        logincount: { increment: 1 },
        lastlogin: new Date(),
      },
    });

    let sessionUser;
    let redirectPath = "/myhome";

    // -----------------------------
    // 2️⃣ ROLE BASED USER HANDLING
    // -----------------------------
    if (loginUser.role === "student") {
      
      sessionUser = {
        username: loginUser.username,
        role: "student",
      };

      redirectPath = "/mystudent";

    } else {
      // ✅ EMPLOYEE / ADMIN LOGIN
      const emp = await prisma.employees.findUnique({
        where: { email: username },
      });

      if (!emp) {
        return NextResponse.json({
          ok: false,
          message: "Employee record not found",
        });
      }

      sessionUser = {
        empId: emp.empId,
        fullName: emp.fullName,
        role: emp.designation,
        email: emp.email,
      };

      if (sessionUser.role === "Admin") {
        redirectPath = "/admin";
      }
    }

    // -----------------------------
    // 3️⃣ Create token
    // -----------------------------
    const token = generateToken(sessionUser);

    // -----------------------------
    // 4️⃣ Send response + cookie
    // -----------------------------
    const res = NextResponse.json({
      ok: true,
      role: sessionUser.role,
      redirect: redirectPath,
    });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return res;

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ ok: false, message: "Server error" });
  }
}
