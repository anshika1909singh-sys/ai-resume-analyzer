import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/login.tsx", { id: "login-root" }),
  route("/login", "./routes/login.tsx", { id: "login-page" }),
  route("/signup", "./routes/signup.tsx", { id: "signup-page" }),
  route("/logout", "./routes/logout.tsx", { id: "logout-page" }),
  route("/home", "./routes/home.tsx", { id: "home-page" }),
  route("/upload", "./routes/upload.tsx", { id: "upload-page" }),
  route("/analyze", "./routes/analyze.tsx", { id: "analyze-page" }),
  route("/history", "./routes/history.tsx", { id: "history-page" }),
] satisfies RouteConfig;
