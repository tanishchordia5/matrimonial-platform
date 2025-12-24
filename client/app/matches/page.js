"use client";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { getToken } from "../../utils/auth";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    api("/match/search", "GET", null, getToken()).then(setMatches);
  }, []);

  const sendInterest = async (userId) => {
    await api("/interests/send", "POST", { toUserId: userId }, getToken());
    alert("Interest sent");
  };

  return (
    <div className="p-10">
      <h1>Matches</h1>
      {matches.map(p => (
        <div key={p._id}>
          <h3>{p.basicDetails?.fullName}</h3>
          <button onClick={() => sendInterest(p.userId)}>Send Interest</button>
        </div>
      ))}
    </div>
  );
}
