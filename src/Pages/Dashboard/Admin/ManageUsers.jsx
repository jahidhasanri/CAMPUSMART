import React, { useEffect, useState, useContext } from "react";
import SharedBanner from "../../../components/Shared/SharedBanner";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxios();
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, []);

  // update role
  const updateRole = (id, role) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Convert this user to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/role/${id}`, {
          role: role,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", "User role updated", "success");

          const updated = users.map((user) =>
            user._id === id ? { ...user, role } : user
          );

          setUsers(updated);
        }
      }
    });
  };

  // delete user
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been deleted.", "success");

          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      }
    });
  };

  return (
    <div>
      <div className="bg-[#3b5d50]">
        <SharedBanner
          title="MANAGE USERS"
          subtitle="Manage your users and their permissions."
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-2xl p-4 overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3 min-w-[700px]">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase">
                <th className="px-4">User</th>
                <th className="px-4 hidden md:table-cell">Email</th>
                <th className="px-4">Role</th>
                <th className="px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const isSelf = currentUser?.email === user.email;

                return (
                  <tr
                    key={user._id}
                    className="bg-gray-50 border shadow-sm rounded-xl"
                  >
                    {/* User Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div>
                          <p className="font-medium">
                            {user.name}{" "}
                            {isSelf && (
                              <span className="text-xs text-gray-500 ml-1">
                                (You)
                              </span>
                            )}
                          </p>

                          <p className="text-xs text-gray-500 md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3">
                      <span className="font-semibold text-blue-600">
                        {user.role}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-center gap-2">

                        {/* Only show buttons if NOT self */}
                        {!isSelf && (
                          <>
                            {user.role !== "user" && (
                              <button
                                onClick={() =>
                                  updateRole(user._id, "user")
                                }
                                className="px-3 py-1 rounded text-white text-xs bg-green-600 hover:bg-green-700"
                              >
                                User
                              </button>
                            )}

                            {user.role !== "admin" && (
                              <button
                                onClick={() =>
                                  updateRole(user._id, "admin")
                                }
                                className="px-3 py-1 rounded text-white text-xs bg-[#524ffc] hover:bg-red-700"
                              >
                                Admin
                              </button>
                            )}

                            <button
                              className="px-3 py-1 rounded text-white text-xs bg-red-600 hover:bg-[#524ffc]"
                              onClick={() => deleteUser(user._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}

                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;