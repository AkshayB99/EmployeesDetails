import React, { useEffect, useState } from "react";
import upCss from "./updateEmployee.module.css";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

function UpdateEmployee() {
  const token = cookies.get("token");
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/Employee/getEmployee/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await res.json();
        if (responseData.status === "success") {
          setData(responseData.data.employee);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, [id, token]);

  const handleCourseChange = (selectedCourse) => {
    setData({ ...data, f_Course: selectedCourse });
  };
  const handleImageChange = (e) => {
    setData({ ...data, f_Image: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("f_Name", data.f_Name);
      formData.append("f_Email", data.f_Email);
      formData.append("f_Mobile", data.f_Mobile);
      formData.append("f_Designation", data.f_Designation);
      formData.append("f_Gender", data.f_Gender);
      formData.append("f_Course", data.f_Course);
      formData.append("f_Image", data.f_ImageFile); // Assuming you add a file input for image
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/Employee/updateEmployee/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const responseData = await res.json();
      if (responseData.status === "success") {
        navigate("/employees");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={upCss.main}>
        <h3>Edit Employee</h3>
        <div className={upCss.data}>
          <div className={upCss.Name}>
            <label htmlFor="f_Name">Name</label>
            <input
              type="text"
              value={data.f_Name || ""}
              onChange={(e) => setData({ ...data, f_Name: e.target.value })}
            />
          </div>
          <div className={upCss.Email}>
            <label htmlFor="f_Email">Email</label>
            <input
              type="email"
              value={data.f_Email || ""}
              onChange={(e) => setData({ ...data, f_Email: e.target.value })}
            />
          </div>
          <div className={upCss.Mobile}>
            <label htmlFor="f_Mobile">Mobile</label>
            <input
              type="text"
              value={data.f_Mobile || ""}
              onChange={(e) => setData({ ...data, f_Mobile: e.target.value })}
            />
          </div>
          <div className={upCss.Designation}>
            <label htmlFor="f_Designation">Designation</label>
            <select
              value={data.f_Designation || "Hr"}
              onChange={(e) =>
                setData({ ...data, f_Designation: e.target.value })
              }
            >
              <option value="Hr">Hr</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className={upCss.Gender}>
            <label>Gender</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={data.f_Gender === "Male"}
                onChange={(e) => setData({ ...data, f_Gender: e.target.value })}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={data.f_Gender === "Female"}
                onChange={(e) => setData({ ...data, f_Gender: e.target.value })}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className={upCss.Course}>
            <label>Course</label>
            <div>
              <input
                type="checkbox"
                id="mca"
                name="course"
                value="MCA"
                checked={data.f_Course === "MCA"}
                onChange={(e) => handleCourseChange("MCA")}
              />
              <label htmlFor="mca">MCA</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bca"
                name="course"
                value="BCA"
                checked={data.f_Course === "BCA"}
                onChange={(e) => handleCourseChange("BCA")}
              />
              <label htmlFor="bca">BCA</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="bsc"
                name="course"
                value="BSC"
                checked={data.f_Course === "BSC"}
                onChange={(e) => handleCourseChange("BSC")}
              />
              <label htmlFor="bsc">BSC</label>
            </div>
          </div>
          <div className={upCss.Image}>
            <img
              width={100}
              height={100}
              src={`data:image/jpeg;base64,${data.f_Image}`}
            />
            <input type="file" onChange={handleImageChange} />
          </div>
          <button onClick={handleUpdate} className={upCss.Button}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateEmployee;
