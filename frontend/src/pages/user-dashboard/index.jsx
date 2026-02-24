import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavBarComponent from "@/Components/Navbar";
import ProfileList from "@/Components/ProfileList";

export default function UserDashboard() {
  const router = useRouter();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (role !== "user") {
      router.replace("/login");
    }
  }, [isAuthenticated, role]);

  return (
    <>
      <NavBarComponent />
      <ProfileList />
    </>
  );
}