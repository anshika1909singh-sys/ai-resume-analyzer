import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/login.tsx"),
  route("/signup", "./routes/signup.tsx"),
  route("/logout", "./routes/logout.tsx"),
  route("/home", "./routes/home.tsx"),
  route("/upload", "./routes/upload.tsx"),
  route("/analyze", "./routes/analyze.tsx"),
  route("/history", "./routes/history.tsx"),
] satisfies RouteConfig;
