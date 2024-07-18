/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
} from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import AdminMenu from "./AdminMenu";

export default function UsersList() {
  const { data: users, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserDetails] = useUpdateUserDetailsMutation();
  const [editedUsers, setEditedUsers] = useState<any>({});

  useEffect(() => {
    if (users) {
      const initialUsersState = users.data.reduce((acc: any, user: any) => {
        acc[user._id] = { username: user.username, email: user.email };
        return acc;
      }, {});
      setEditedUsers(initialUsersState);
    }
  }, [users]);

  const handleInputChange = (id: string, field: string, value: string) => {
    setEditedUsers((prev: any) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      refetch();
      toast.success("User deleted successfully");
    }
  };

  const handleUpdate = async (id: string) => {
    const { username, email } = editedUsers[id];
    try {
      const { data } = await updateUserDetails({
        id,
        email,
        username,
      }).unwrap();

      toast.success(data.message || "User updated successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="pl-20 text-gray-900">
      <AdminMenu />
      <div className="flex p-4">
        <h1 className="text-3xl font-bold text-white">Users</h1>
      </div>
      <div className="flex justify-center px-3 py-4">
        <div className="w-full overflow-x-auto">
          <table className="table w-full mb-4 bg-white rounded shadow-md text-md">
            <thead className="text-white border-b bg-slate-700">
              <tr>
                <th className="p-3 px-5 text-left">ID</th>
                <th className="p-3 px-5 text-left">Name</th>
                <th className="p-3 px-5 text-left">Email</th>
                <th className="p-3 px-5 text-left">Role</th>
                <th className="text-center ">Edit</th>
              </tr>
            </thead>
            {isLoading ? (
              <div className="flex items-center justify-center w-full">
                <Loader />
              </div>
            ) : (
              <tbody>
                {users?.data.map((user: any, i: number) => {
                  return (
                    <tr
                      className="bg-gray-100 border-b hover:bg-orange-100"
                      key={i}
                    >
                      <td className="p-3">
                        <p>{user._id}</p>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          className="p-2 bg-transparent border-none outline-primary"
                          value={editedUsers[user._id]?.username || ""}
                          onChange={(e) =>
                            handleInputChange(
                              user._id,
                              "username",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="email"
                          className="p-2 bg-transparent border-none outline-primary"
                          value={editedUsers[user._id]?.email || ""}
                          onChange={(e) =>
                            handleInputChange(user._id, "email", e.target.value)
                          }
                        />
                      </td>
                      <td className="p-3 px-5">
                        {user?.isAdmin ? (
                          <p className="text-center align-baseline inline-flex p-2 mr-auto items-center font-semibold text-[.95rem] leading-none text-green-500 bg-green-200 rounded-lg">
                            Admin
                          </p>
                        ) : (
                          <p className="text-center inline-flex p-2 items-center font-semibold text-[.95rem] leading-none text-cyan-950 bg-primary rounded-lg">
                            User
                          </p>
                        )}
                      </td>
                      <td className="flex justify-end p-3 px-5">
                        <button
                          onClick={() => handleUpdate(user._id)}
                          type="button"
                          className="px-2 py-1 mr-3 text-sm text-white rounded bg-primary hover:bg-secondry focus:outline-none focus:shadow-outline"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
