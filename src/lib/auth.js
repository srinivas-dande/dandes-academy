import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "DandesAcademySecretKey";

// Generate token including FULL NAME, EMPLOYEE ID, ROLE
export function generateToken(user) {
  return jwt.sign(
    {
      empId: user.empId,
      fullName: user.fullName,
      role: user.role,
      email: user.email
    },
    SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
