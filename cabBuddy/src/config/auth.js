/**
 * Centralized user context helper
 * --------------------------------
 * Reads userId from JWT payload
 */

export const getCurrentUserId = () => {
  const token = localStorage.getItem("token");

  console.log(JSON.parse(atob(token.split(".")[1])));
  if (!token) {
    console.warn("JWT token not found in localStorage");
    return null;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));

    if (!payload.userId) {
      console.warn("userId not found in JWT payload");
      return null;
    }

    return payload.userId;
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};


/**
 * Get current logged-in user role from JWT
 * Example return values: "USER", "DRIVER", "ADMIN"
 */
export const getCurrentUserRole = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("JWT token not found in localStorage");
    return null;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));

    if (!payload.role) {
      console.warn("role not found in JWT payload");
      return null;
    }

    return payload.role;
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};

/**
 * Role helper methods (optional usage)
 */
export const isUser = () => getCurrentUserRole() === "USER";
export const isDriver = () => getCurrentUserRole() === "DRIVER";
export const isAdmin = () => getCurrentUserRole() === "ADMIN";
