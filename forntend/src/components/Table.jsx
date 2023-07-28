// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Table() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({
    user_id: null,
    username: "",
    gender: "",
    email: "",
    field: "",
  });
  const [newData, setNewData] = useState({
    username: "",
    gender: "",
    email: "",
    field: "",
  });

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/read-data");
      setData(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/user/create-user", newData);
      fetchData(); // Refresh the data after adding
      setNewData({ username: "", gender: "", email: "", field: "" }); // Clear the form fields
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/user/user-update/${editData.user_id}`,
        editData
      );
      fetchData(); // Refresh the data after updating
      setEditData({
        user_id: "",
        username: "",
        gender: "",
        email: "",
        field: "",
      }); // Clear the form fields
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditClick = (item) => {
    // Set the data of the selected item into the form fields for editing
    setEditData({
      user_id: item.user_id,
      username: item.username,
      gender: item.gender,
      email: item.email,
      field: item.field,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/user-delete/${id}`);
      // Remove the deleted item from the data array
      setData((prevData) => prevData.filter((item) => item.user_id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className='table-main'>
      <div className='main-heading text-center pt-5'>
        <h4 className='main-color'>Table Crud Task</h4>
        <p className='sec-color px-3'>
          (Create record, Read record, Update record, Delete record)
        </p>
      </div>

      <div className='container'>
        <div className='table-responsive'>
          <table class='table shadow'>
            <thead>
              <tr className='head-row py-2 bg-dark'>
                <th scope='col'>User ID</th>
                <th scope='col'>Name</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Email</th>
                <th scope='col' style={{ width: "200px" }}>
                  Field
                </th>

                <th scope='col'>Actions</th>
              </tr>
            </thead>
            {/* <tbody> */}
            <tbody>
              {data.map((item) => (
                <tr>
                  <th key={item.user_id}> {item.user_id} </th>
                  <td> {item.username} </td>
                  <td> {item.gender} </td>
                  <td> {item.email} </td>
                  <td> {item.field} </td>

                  <td>
                    <div className='btn-divs'>
                      <button
                        className=' btns edit-btn'
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                        <i className='ps-2  edit-icon fa fa-edit'></i>
                      </button>
                      <button
                        className='btns dlt-btn'
                        onClick={() => handleDelete(item.user_id)}
                      >
                        Delete
                        <i className='dlt-icon fa fa-trash'></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className='head-row py-2 bg-dark'>
                <th> Update User </th>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={editData.gender}
                    onChange={(e) =>
                      setEditData({ ...editData, gender: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={editData.field}
                    onChange={(e) =>
                      setEditData({ ...editData, field: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  <div className='btn-divs'>
                    <button className='btns edit-btn' onClick={handleUpdate}>
                      Update{" "}
                    </button>
                    <button
                      className='btns dlt-btn'
                      onClick={() =>
                        setEditData({
                          user_id: "",
                          username: "",
                          gender: "",
                          email: "",
                          field: "",
                        })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
              <tr className='head-row py-2 bg-dark'>
                <th> Add User </th>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={newData.username}
                    onChange={(e) =>
                      setNewData({ ...newData, username: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={newData.gender}
                    onChange={(e) =>
                      setNewData({ ...newData, gender: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={newData.email}
                    onChange={(e) =>
                      setNewData({ ...newData, email: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  {" "}
                  <input
                    style={{ maxWidth: "150px" }}
                    type='text'
                    value={newData.field}
                    onChange={(e) =>
                      setNewData({ ...newData, field: e.target.value })
                    }
                  />{" "}
                </td>
                <td>
                  <div className='btn-divs'>
                    <button className='btns edit-btn' onClick={handleAdd}>
                      {" "}
                      Add User{" "}
                    </button>
                    <button
                      className='btns dlt-btn'
                      onClick={() =>
                        setNewData({
                          user_id: "",
                          username: "",
                          gender: "",
                          email: "",
                          field: "",
                        })
                      }
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>

            {/* </tr> */}
          </table>
        </div>
      </div>
    </div>
  );
}
