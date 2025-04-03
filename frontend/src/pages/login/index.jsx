import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./styles.module.css"; 
import { loginUser } from "@/config/redux/action/authAction";
import NavBarComponent from "@/Components/Navbar";
import { jwtDecode } from "jwt-decode";

function LoginComponent() {
    const { loading, error, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                const currentTime = Date.now() / 1000;

                if (decoded.exp > currentTime) {
                    router.replace("/dashboard"); 
                } else {
                    localStorage.removeItem("token"); 
                }
            } catch (error) {
                localStorage.removeItem("token"); 
            }
        }
    }, [token]); 

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return; 

        dispatch(loginUser({ email, password }));
    };

    return (
        <>
            <NavBarComponent />
            <div className={styles.container}>
                <div className={styles.loginBox}>
                    <h2>Admin Login</h2>

                    {error && <p className={styles.error}>{error.message || "Login failed. Please try again."}</p>}

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
