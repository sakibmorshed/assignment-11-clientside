import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const handleAction = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${status} this request`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/requests/${id}`, {
      status,
    });
    if (res.data) {
      Swal.fire({
        icon: "success",
        title: `Request ${status}`,
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    }
  };
  if (isLoading) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Manage Role Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td className="capitalize">{req.requestType}</td>
                <td>
                  <span
                    className={`badge ${
                      req.requestStatus === "pending"
                        ? "badge-warning"
                        : req.requestStatus === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>
                <td>{new Date(req.requestTime).toLocaleString()}</td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-success btn-xs"
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleAction(req._id, "approved")}
                  >
                    Accept
                  </button>

                  <button
                    className="btn btn-error btn-xs"
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleAction(req._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
