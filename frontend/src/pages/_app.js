import { Provider } from "react-redux";
import { store } from "../config/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { logout } from "@/config/redux/reducer/authReducer";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
        store.dispatch(logout());
      } else {
        store.dispatch(
          restoreAuth({ token, role: decoded.role })
        );
      }
    } catch {
      localStorage.clear();
      store.dispatch(logout());
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
