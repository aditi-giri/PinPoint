import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";
import ProfileDetails from "../ProfileDetails";
import styles from "./style.module.css";
import { getAllProfiles } from "@/config/redux/action/profileAction";

const ProfileList = () => {
  const dispatch = useDispatch();
  const { profiles, loading, error } = useSelector((state) => state.profile);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    if (!profiles.length) {
     
      dispatch(getAllProfiles());
    } else {
     
    }
  }, [dispatch, profiles]); 

  // Update filtered profiles based on search query
  useEffect(() => {
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.location?.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [searchQuery, profiles]);

  if (loading) return <p className={styles.loading}>Loading profiles...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div>
      {selectedProfileId ? (
        <ProfileDetails profileId={selectedProfileId} setSelectedProfileId={setSelectedProfileId} />
      ) : (
        <>
        <input
            type="text"
            placeholder="Search by name, email, or location..."
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
