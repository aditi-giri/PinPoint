import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import NavBarComponent from "@/Components/Navbar";
import ProfileList from "@/Components/ProfileList";
import styles from "./style.module.css";
import { createProfile } from "@/config/redux/action/profileAction";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);
  const [showModal, setShowModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    lat: "",
    lng: "",
    description: "",
    interests: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; 
  
    const newProfile = {
      ...profileData,
      interests: profileData.interests.split(",").map((i) => i.trim()),
      location: {
        address: profileData.address,
        lat: parseFloat(profileData.lat),
        lng: parseFloat(profileData.lng),
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

      {/* Create Profile Button */}
      <button className={styles.createButton} onClick={() => setShowModal(true)}>
        + Create Profile
      </button>

      {/* Profile List */}
      <ProfileList />

      {/* Create Profile Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Create New Profile</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
              <input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
              <input type="text" name="lat" placeholder="Latitude" required onChange={handleChange} />
              <input type="text" name="lng" placeholder="Longitude" required onChange={handleChange} />
              <textarea name="description" placeholder="Description" onChange={handleChange} />
              <input type="text" name="interests" placeholder="Interests (comma-separated)" onChange={handleChange} />

              <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
