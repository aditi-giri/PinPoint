import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; 
import styles from "./styles.module.css";

export default function NavBarComponent() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login"); 
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h1 style={{ cursor: "pointer", padding: "1.2rem" }}>PinPoint📍</h1>
                <div className={styles.navBarOptionContainer}>
                    <div className={styles.navBarOptionContainer__options}>
                        {!isLoggedIn && (
                            <div style={{ cursor: "pointer", }} onClick={() => router.push("/")} className={styles.navBarOptionContainer__option}>
                            Explore
                        </div>
                        )}
                    </div>

                    {isLoggedIn ? (
                        <div onClick={handleLogout} className={styles.buttonJoin}>
                            Logout
                        </div>
                    ) : (
                        <div onClick={() => router.push("/login")} className={styles.buttonJoin}>
                            Login
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
