import jwt from "jsonwebtoken"

export async function verifyToken(request) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { success: false, message: "Access denied", status: 401 }
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return { success: true, user: decoded }
  } catch (error) {
    return { success: false, message: "Invalid token", status: 403 }
  }
}

export function isAdmin(user) {
  return user && user.isAdmin === true
}

