import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { saveUserProfile } from "../services/profileService";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, saveUser, logout } = useUser();
  const [name, setName] = useState(user.name || "");
  const [genres, setGenres] = useState(user.genres || []);
  const [language, setLanguage] = useState(user.language || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const GENRES = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 16, name: "Animation" },
  ];

  const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "ml", label: "Malayalam" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedProfile = { name, genres, language };
      await saveUserProfile(user.uid, updatedProfile);
      saveUser({ ...user, ...updatedProfile });
      toast.success("Profile updated successfully 🎉");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return toast.error("Enter a new password");

    try {
      await updatePassword(auth.currentUser, newPassword);
      setNewPassword("");
      toast.success("Password updated 🔐");
    } catch {
      toast.error("Please re-login to change password");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center mb-8">
          <img
            src={user.avatar}
            className="w-28 h-28 rounded-full border border-neutral-600"
          />
          <button
            onClick={logout}
            className="mt-3 text-sm text-red-400 hover:underline"
          >
            Logout
          </button>
        </div>

        <div className="bg-[#1b1b1b] border border-neutral-700 rounded-2xl p-6 space-y-6">
          {loading && (
            <FadeLoader className="mx-auto" color="#FFC509" width={4} />
          )}

          {message && (
            <p className="text-center text-sm text-[#FFC509]">{message}</p>
          )}

          {/* Name */}
          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700"
            />
          </div>

          {/* Genres */}
          <div>
            <label>Favorite Genres</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {GENRES.map((g) => (
                <button
                  key={g.id}
                  onClick={() =>
                    setGenres((prev) =>
                      prev.includes(g.id)
                        ? prev.filter((i) => i !== g.id)
                        : [...prev, g.id]
                    )
                  }
                  className={`px-3 py-2 rounded-lg border ${
                    genres.includes(g.id)
                      ? "bg-[#FFC509] text-black"
                      : "border-neutral-600 hover:bg-neutral-700"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label>Language</label>
            <div className="flex flex-wrap gap-3 mt-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-4 py-2 rounded-lg border ${
                    language === l.code
                      ? "bg-[#FFC509] text-black"
                      : "border-neutral-600 hover:bg-neutral-700"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700"
              placeholder="Leave empty to keep old password"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#FFC509] py-3 rounded-xl text-black font-semibold hover:bg-amber-300"
          >
            Save Changes
          </button>

          <button
            onClick={handlePasswordChange}
            className="w-full border border-neutral-600 py-3 rounded-xl hover:bg-neutral-800"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
