import React from "react";
import { useDispatch } from "react-redux";
import { getProfileById, deleteProfile } from "@/config/redux/action/profileAction";
import styles from "./style.module.css";

const ProfileCard = ({ profile, selectedProfile, setSelectedProfile }) => {
  const dispatch = useDispatch();
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const handleClick = () => {
    if (selectedProfile !== profile._id) {
      dispatch(getProfileById(profile._id));
      setSelectedProfile(profile._id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteProfile(profile._id));
  };

  return (
    <div className={styles.profileCard} onClick={handleClick}>
      <img
        src={profile.image || "/default.jpg"}
        alt={profile.name}
        className={styles.profileImage}
      />

      <div className={styles.profileDetails}>
        <h3>{profile.name}</h3>
        <p>{profile.description || "No description"}</p>
        <p>
          Lat: {profile.location?.lat}, Lng: {profile.location?.lng}
        </p>
      </div>

      {role === "admin" && (
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
