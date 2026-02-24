import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileDetails from "../ProfileDetails";
import styles from "./style.module.css";
import { getAllProfiles, getUserProfiles } from "@/config/redux/action/profileAction";

const ProfileList = () => {
  const dispatch = useDispatch();

  const { profiles, loading, error } = useSelector((state) => state.profile);
  const { role, isAuthenticated } = useSelector((state) => state.auth);

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  // ✅ ROLE-BASED FETCH (FIXED)
  useEffect(() => {
    if (!isAuthenticated) return;

    if (role === "admin") {
      dispatch(getAllProfiles());
    }

    if (role === "user") {
      dispatch(getUserProfiles());
    }
  }, [dispatch, role, isAuthenticated]);

  // 🔍 Search filter
  useEffect(() => {
    const filtered = profiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [searchQuery, profiles]);

  if (loading) return <p className={styles.loading}>Loading profiles...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div>
      {selectedProfileId ? (
        <ProfileDetails
          profileId={selectedProfileId}
          setSelectedProfileId={setSelectedProfileId}
        />
      ) : (
        <>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />

          <div className={styles.profileContainer}>
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile._id}
                  profile={profile}
                  setSelectedProfile={setSelectedProfileId}
                />
              ))
            ) : (
              <p className={styles.noProfiles}>No matching profiles found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileList;
