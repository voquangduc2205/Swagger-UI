export const errorResponse = {
  DEFAULT_500_ERROR: { error: "Something went wrong" },
  DEFAULT_404_ERROR: { error: "Requested resource not found" },
  DEFAULT_403_ERROR: { error: "Permission denined" },
  DEFAULT_401_ERROR: { error: "Unauthorize" },
  INVALID_QUERY: { error: "Invalid query" },
  INVALID_TOKEN: { error: "Invalid token" },
  MISSING_USER_REGISTER_FIELDS: {
    error: "Missing username, email or password",
  },
  INVALID_USERNAME: { error: "Invalid username" },
  INVALID_EMAIL: { error: "Invalid email" },
  INVALID_PASSWORD: { error: "Invalid password" },
  USER_EXISTS: { error: "User already exists" },
  MISSING_USER_LOGIN_FIELDS: {
    error: "Missing username or password",
  },
  WRONG_USERNAME_PASSWORD: { error: "Wrong username or password" },
};
