import React from "react";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useDeleteUserMutation } from "../../slices/usersApiSlices";
import { Button, Table } from "react-bootstrap";
import { useGetUsersQuery } from "../../slices/usersApiSlices";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
         try {
           await deleteUser(id);
           refetch();
         } catch (err) {
           toast.error(err?.data?.message || err.error);
         }
       }
  };
  // Format currency function
  // const formatCurrency = (value) =>
  //   new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   }).format(value);

  // // Safe date formatting
  // const formatDate = (dateString) =>
  //   dateString ? new Date(dateString).toLocaleDateString() : "N/A";

  return (
    <>
      <div className="p-3">
        <h1>Users</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error || "Error loading orders"}
          </Message>
        ) : (
          <div className="table-responsive">
            <Table striped hover bordered className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        {user._id}
                      </td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>

                      <td>
                        {user.isAdmin ? (
                          <FaCheck style={{ color: "green" }} />
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>

                      <td>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
