import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { loginUser } from "@/config/redux/action/authAction";
import NavBarComponent from "@/Components/Navbar";

function LoginComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRole, setLoginRole] = useState("admin");

  // ✅ Redirect AFTER Redux auth updates
  useEffect(() => {
    if (!isAuthenticated) return;

    if (role === "admin") {
      router.replace("/dashboard");
    } else if (role === "user") {
      router.replace("/user-dashboard");
    }
  }, [isAuthenticated, role]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loading) return;

    dispatch(loginUser({ email, password, role: loginRole }));
  };

  return (
    <>
      <NavBarComponent />

      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2>Login</h2>

          <div className={styles.roleToggle}>
            <label>
              <input
                type="radio"
                checked={loginRole === "admin"}
                onChange={() => setLoginRole("admin")}
              />
              Admin
            </label>

            <label>
              <input
                type="radio"
                checked={loginRole === "user"}
                onChange={() => setLoginRole("user")}
              />
              User
            </label>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginComponent;
