"use client";
import { useState } from "react";
import { api } from "../../services/api";
import { getToken } from "../../utils/auth";

export default function ProfilePage() {
    const [fullName, setFullName] = useState("");
    if (!getToken()) {
        router.push("/login");
    }

    const saveProfile = async () => {
        await api(
            "/profile",
            "POST",
            {
                basicDetails: { fullName }
            },
            getToken()
        );
        alert("Profile saved");
    };

    return (
        <div className="p-10">
            <h1>My Profile</h1>
            <input placeholder="Full Name" onChange={e => setFullName(e.target.value)} />
            <button onClick={saveProfile}>Save</button>
        </div>
    );
}
