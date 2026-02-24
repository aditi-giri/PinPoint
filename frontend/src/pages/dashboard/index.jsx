import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Head from "next/head";
import NavBarComponent from "@/Components/Navbar";
import ProfileList from "@/Components/ProfileList";
import styles from "./style.module.css";
import { createProfile } from "@/config/redux/action/profileAction";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state) => state.profile);

  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    description: "",
    lat: "",
    lng: "",
  });
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  // 🔐 Admin-only protection
  useEffect(() => {
    if (!isAuthenticated) return;
  
    if (role !== "admin") {
      router.replace("/login");
    }
  }, [isAuthenticated, role]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newProfile = {
      name: profileData.name,

      // ✅ REQUIRED to avoid backend conflict
      email: `property_${Date.now()}@pinpoint.local`,

      description: profileData.description,

      location: {
        lat: Number(profileData.lat),
        lng: Number(profileData.lng),
        address: "Derived location",
      },
    };


    dispatch(createProfile(newProfile));
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>PinPoint - Admin Dashboard</title>
      </Head>

      <NavBarComponent />

      <button className={styles.createButton} onClick={() => setShowModal(true)}>
        + Create Property
      </button>

      <ProfileList />

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Create Property</h2>

            <form onSubmit={handleSubmit}>
              <label>Name *</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
              />

              <label>Description</label>
              <textarea
                name="description"
                onChange={handleChange}
              />

              <label>Latitude *</label>
              <input
                type="number"
                step="any"
                name="lat"
                required
                onChange={handleChange}
              />

              <label>Longitude *</label>
              <input
                type="number"
                step="any"
                name="lng"
                required
                onChange={handleChange}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>

              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
