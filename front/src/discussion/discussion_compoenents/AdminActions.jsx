import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { urlDeleteDiscussion } from "../../utils/endpoints";

export default function AdminActions({ discussionId, title, text, topic, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-discussion/${discussionId}`, {
      state: { title, text, topic, discussionId },
    });
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the discussion along with all its comments and reactions.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${urlDeleteDiscussion}/${discussionId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.status === 200) {
            Swal.fire("Deleted!", response.data.message, "success").then(() => {
              if (onDelete) {
                onDelete(discussionId);
              }
            });
          }
        } catch (error) {
          console.error("Error deleting discussion:", error.response || error);
          Swal.fire(
            "Error",
            "Failed to delete discussion. Please try again.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="card-footer text-end">
      <button className="btn btn-warning me-2" onClick={handleEdit}>
        Edit Discussion
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Discussion
      </button>
    </div>
  );
}
