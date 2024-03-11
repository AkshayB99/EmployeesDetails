import React, { useState, useEffect } from "react";
import empCss from "./employee.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Employee() {
  const navigate = useNavigate();
  const authToken = cookies.get("token");
  const [employees, setEmployees] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3000/api/v1/Employee/getEmployees`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setEmployees(data.data.employees);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authToken, reload]);

  const handleUpdate = (id) => {
    // Navigate to update page with employee ID
    navigate(`/updateEmployee/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Send delete request to API
      const response = await fetch(
        `http://127.0.0.1:3000/api/v1/Employee/deleteEmployee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        setReload(!reload);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={empCss.main}>
      <div className={empCss.empHeader}>
        <div className={empCss.empHeaderLeft}>
          <h3>Employee List</h3>
        </div>
        <div className={empCss.empHeaderRight}>
          <p>Total Count: {employees.length}</p>
          <button onClick={() => navigate("/createEmployee")}>
            Create Employee
          </button>
        </div>
      </div>
      <div className={empCss.body}>
        <table className={empCss.employeeTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile Pic</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Created Date</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.f_Id}</td>
                <td>
                  <img
                    width={100}
                    height={100}
                    src={`data:image/jpeg;base64,${employee.f_Image}`}
                    alt="Profile Pic"
                  />
                </td>
                <td>{employee.f_Name}</td>
                <td>{employee.f_Email}</td>
                <td>{employee.f_Mobile}</td>
                <td>{employee.f_Designation}</td>
                <td>{employee.f_Gender}</td>
                <td>{employee.f_Course}</td>
                <td>{employee.f_Createddate}</td>
                <td>
                  <button onClick={() => handleUpdate(employee._id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
