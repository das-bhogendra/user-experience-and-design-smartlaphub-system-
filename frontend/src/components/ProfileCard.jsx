import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex flex-col items-center">

        {/* Profile Image */}
        <img
          src={
            user?.profileImage ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(user?.name || "User") +
              "&background=0D8ABC&color=fff&size=200"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-orange-500"
        />

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.name}
        </h2>

        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">
            Phone
          </span>

          <span className="text-gray-800">
            {user?.phone || "Not Added"}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">
            Address
          </span>

          <span className="text-gray-800 text-right max-w-[220px]">
            {user?.address || "Not Added"}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">
            Member Since
          </span>

          <span className="text-gray-800">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

      </div>

      <button
       className="w-full mt-8 bg-black hover:bg-black text-white py-3 rounded-lg transition"
      >
     Edit Profile
     </button>

    </div>
  );
};

export default ProfileCard;
