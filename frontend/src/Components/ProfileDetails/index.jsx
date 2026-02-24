import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import MapComponent from "../MapComponent";
import { editProfile, getProfileById } from "@/config/redux/action/profileAction";

const ProfileDetails = ({ profileId, setSelectedProfileId }) => {
  const dispatch = useDispatch();

  const { profile, loading, error, message } = useSelector(
    (state) => state.profile
  );

  const { token } = useSelector((state) => state.auth);

  // 🔐 Role-based access
  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : null;

  const isAdmin = role === "admin";

  const [showMap, setShowMap] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    if (profile) {
      setEditedProfile({ ...profile });
    }
  }, [profile]);

  if (loading) return <p className={styles.loading}>Loading profile...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!editedProfile) return null;

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!isAdmin) return;

    await dispatch(
      editProfile({
        profileId,
        profileData: editedProfile,
      })
    );

    dispatch(getProfileById(profileId));
    setIsEditing(false);
  };

  return (
    <div className={styles.profileDetailsContainer}>
      <button
        className={styles.backButton}
        onClick={() => setSelectedProfileId(null)}
      >
        ← Back
      </button>

      <div className={styles.profileCard}>
        <img
          src={editedProfile.image || "/default.jpg"}
          alt={editedProfile.name}
          className={styles.profileImage}
        />

        <div className={styles.details}>
          {isEditing && isAdmin ? (
            <>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
              />

              

              <textarea
                name="description"
                value={editedProfile.description || ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2>{editedProfile.name}</h2>

              

              <p>
                <strong>Description:</strong>{" "}
                {editedProfile.description || "No description provided"}
              </p>
            </>
          )}

          {editedProfile.location?.lat &&
            editedProfile.location?.lng && (
              <button
                className={styles.summaryButton}
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "Hide Map" : "Show on Map"}
              </button>
            )}

          {showMap && editedProfile.location && (
            <MapComponent
              latitude={editedProfile.location.lat}
              longitude={editedProfile.location.lng}
            />
          )}

          {/* 🔐 ADMIN ONLY CONTROLS */}
          {isAdmin && token && (
            <div className={styles.buttonContainer}>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className={styles.saveButton}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.editButton}
                >
                  Edit
                </button>
              )}
            </div>
          )}

          {message && (
            <p className={styles.successMessage}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
