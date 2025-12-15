import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data);
      });
    }
  }, [user, axiosSecure]);

  const handleRequest = async (type) => {
    setLoading(true);

    const requestData = {
      userId: dbUser._id,
      userEmail: dbUser.email,
      userName: dbUser.name,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date(),
    };

    try {
      await axiosSecure.post("/requests", requestData);
      toast.success(`Request sent to become ${type}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Already requested");
    } finally {
      setLoading(false);
    }
  };

  if (!dbUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center">
            <img src={dbUser.photo} className="w-28 h-28 rounded-full border" />
            <h2 className="text-2xl font-bold mt-2">{dbUser.name}</h2>
            <p className="text-gray-500">{dbUser.email}</p>
          </div>

          <div className="divider"></div>

          <div className="space-y-2">
            <p>
              <b>Role:</b> {dbUser.role}
            </p>
            <p>
              <b>Status:</b> {dbUser.status}
            </p>
            <p>
              <b>Address:</b> {dbUser.address || "Not added"}
            </p>

            {dbUser.role === "chef" && (
              <p>
                <b>Chef ID:</b> {dbUser.chefId}
              </p>
            )}
          </div>

          <div className="divider"></div>

          <div className="flex gap-4 justify-center">
            {dbUser.role === "user" && (
              <button
                disabled={loading}
                onClick={() => handleRequest("chef")}
                className="btn bg-red-600 hover:bg-red-800 text-white rounded-lg"
              >
                Be a Chef
              </button>
            )}

            {(dbUser.role === "user" || dbUser.role === "chef") && (
              <button
                disabled={loading}
                onClick={() => handleRequest("admin")}
                className="btn bg-red-600 hover:bg-red-800 text-white rounded-lg"
              >
                Be an Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
