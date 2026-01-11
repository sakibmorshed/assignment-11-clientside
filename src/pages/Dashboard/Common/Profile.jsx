import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import {
  User,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
  AlertCircle,
  ChefHat,
  Crown,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

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

  if (!dbUser) return <LoadingSpinner />;

  const getRoleBadge = (role) => {
    const badges = {
      user: {
        color: "bg-orange-100 text-orange-600 border border-orange-200",
        icon: <User className="w-4 h-4" />,
      },
      chef: {
        color: "bg-orange-200 text-orange-700 border border-orange-300",
        icon: <ChefHat className="w-4 h-4" />,
      },
      admin: {
        color: "bg-orange-600 text-white",
        icon: <Crown className="w-4 h-4" />,
      },
    };
    return badges[role] || badges.user;
  };

  const getStatusBadge = (status) =>
    status === "active"
      ? {
          color: "bg-green-100 text-green-600 border border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
        }
      : {
          color: "bg-red-100 text-red-600 border border-red-200",
          icon: <AlertCircle className="w-4 h-4" />,
        };

  const roleBadge = getRoleBadge(dbUser.role);
  const statusBadge = getStatusBadge(dbUser.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/30 to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-orange-100 dark:border-gray-700">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

          {/* Content */}
          <div className="px-6 pb-8 -mt-16">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-orange-100">
                  {dbUser.photo ? (
                    <img
                      src={dbUser.photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-orange-600">
                      {dbUser.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 bg-orange-500 p-1.5 rounded-full shadow-md">
                  <BadgeCheck className="text-white w-5 h-5" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {dbUser.name}
                  <Sparkles className="text-orange-500" />
                </h2>
                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {dbUser.email}
                </p>

                <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm flex items-center gap-2 ${roleBadge.color}`}
                  >
                    {roleBadge.icon} {dbUser.role}
                  </span>
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm flex items-center gap-2 ${statusBadge.color}`}
                  >
                    {statusBadge.icon} {dbUser.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-orange-100 dark:border-gray-700 my-8" />

            {/* Address */}
            <div className="bg-orange-50 dark:bg-gray-700 p-5 rounded-2xl border border-orange-100 dark:border-gray-600 flex gap-4">
              <MapPin className="text-orange-500" />
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Address
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {dbUser.address || "Not added yet"}
                </p>
              </div>
            </div>

            <div className="border-t border-orange-100 dark:border-gray-700 my-8" />

            {/* Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              {dbUser.role === "user" && (
                <button
                  onClick={() => handleRequest("chef")}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold shadow-lg"
                >
                  Become Chef
                </button>
              )}
              {(dbUser.role === "user" || dbUser.role === "chef") && (
                <button
                  onClick={() => handleRequest("admin")}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:to-orange-800 text-white py-4 rounded-xl font-semibold shadow-lg"
                >
                  Become Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
