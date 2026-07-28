import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        {/* Profile Image with gradient border */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 p-0.5">
            <div className="w-full h-full rounded-full bg-white" />
          </div>
          <img
            src={
              user?.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user?.name || "User") +
                "&background=1f2937&color=fff&size=200"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white relative z-10 shadow-sm"
          />
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full z-20" />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          {user?.name}
        </h2>

        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {/* User Details */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-500">
            Phone
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {user?.phone || "Not Added"}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-500">
            Address
          </span>
          <span className="text-sm font-semibold text-gray-800 text-right max-w-[200px]">
            {user?.address || "Not Added"}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-50">
          <span className="text-sm font-medium text-gray-500">
            Member Since
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-8 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 active:scale-[0.98]">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
