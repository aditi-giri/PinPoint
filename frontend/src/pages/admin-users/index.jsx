import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarComponent from "@/Components/Navbar";
import {
    getAllUsers,
    createUser,
    assignProperty,
    removeProperty,
} from "@/config/redux/action/userAction";
import { getAllProfiles } from "@/config/redux/action/profileAction";
import styles from "./adminUsers.module.css";

export default function AdminUsers() {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const { profiles } = useSelector((state) => state.profile);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllProfiles());
    }, []);

    const handleCreateUser = () => {
        if (!newUser.name || !newUser.email || !newUser.password) return;
        dispatch(createUser(newUser));
        setNewUser({ name: "", email: "", password: "" });
    };

    const handleRemove = async (userId, profileId) => {
        await dispatch(removeProperty({ userId, profileId }));
    };


    const handleAssign = async (userId, profileId) => {
        if (!profileId) return;

        await dispatch(assignProperty({ userId, profileId }));
        dispatch(getAllUsers()); // 🔁 refresh users
    };


    const assignedPropertyIds = users
        .flatMap((user) => user.profiles || [])
        .map((profile) => profile._id);

    return (
        <>
            <NavBarComponent />

            <div className={styles.page}>
                <h2 className={styles.pageTitle}>User Management</h2>

                {/* CREATE USER */}
                <div className={styles.createCard}>
                    <h3 className={styles.cardTitle}>Create New User</h3>

                    <div className={styles.formRow}>
                        <input
                            className={styles.input}
                            placeholder="Full Name"
                            value={newUser.name}
                            onChange={(e) =>
                                setNewUser({ ...newUser, name: e.target.value })
                            }
                        />
                        <input
                            className={styles.input}
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({ ...newUser, email: e.target.value })
                            }
                        />
                        <input
                            className={styles.input}
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({ ...newUser, password: e.target.value })
                            }
                        />
                        <button
                            className={styles.primaryButton}
                            onClick={handleCreateUser}
                        >
                            Add User
                        </button>
                    </div>
                </div>

                {/* USER LIST */}
                <div className={styles.userGrid}>
                    {users.map((user) => (
                        <div key={user._id} className={styles.userCard}>
                            <div className={styles.userHeader}>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                            </div>

                            <label className={styles.label}>Assign Property</label>
                            <select
                                className={styles.select}
                                onChange={(e) =>
                                    handleAssign(user._id, e.target.value)
                                }
                            >
                                <option value="">Select property</option>
                                {profiles.map((profile) => {
                                    const isAssigned = assignedPropertyIds.includes(
                                        profile._id
                                    );

                                    return (
                                        <option
                                            key={profile._id}
                                            value={profile._id}
                                            disabled={isAssigned}
                                        >
                                            {profile.name}
                                            {isAssigned ? " (Assigned)" : ""}
                                        </option>
                                    );
                                })}
                            </select>

                            <div className={styles.assignedSection}>
                                <span className={styles.assignedTitle}>
                                    Assigned Properties
                                </span>

                                <div className={styles.badgeContainer}>
                                    {user.profiles?.length > 0 ? (
                                        user.profiles.map((p) => (
                                            <div key={p._id} className={styles.badgeWrapper}>
                                                <span className={styles.badge}>{p.name}</span>
                                                <button
                                                    className={styles.removeBtn}
                                                    onClick={() => handleRemove(user._id, p._id)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <span className={styles.emptyText}>
                                            No properties assigned
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
