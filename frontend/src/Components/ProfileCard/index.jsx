import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileById, deleteProfile } from "@/config/redux/action/profileAction";
import styles from "./style.module.css";

const ProfileCard = ({ profile, selectedProfile, setSelectedProfile }) => {
  const dispatch = useDispatch();
  
  const { token } = useSelector((state) => state.auth);

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
        <p>{profile.email}</p>
        <p>{profile.contact}</p>
        <p>{profile.location?.address}</p>
      </div>

      
      {token && (
        <button onClick={handleDelete} className={styles.deleteButton}>
          Delete
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
