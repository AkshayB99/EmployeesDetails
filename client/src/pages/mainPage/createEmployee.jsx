import React, { useState } from "react";
import crCss from "./createEmployee.module.css";
import { json, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function CreateEmployee() {
  const token = cookies.get("token");
  const navigate = useNavigate();
  const [data, setData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "Hr", // Default to "Hr" for the select element
    f_Gender: "", // No default selected for gender
    f_Course: "", // No default selected for course
    f_Image: "",
  });

  const handleCourseChange = (selectedCourse) => {
    setData({ ...data, f_Course: selectedCourse });
  };

  const handleGenderChange = (selectedGender) => {
    setData({ ...data, f_Gender: selectedGender });
  };

  const handleImageChange = (e) => {
    setData({ ...data, f_Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("f_Name", data.f_Name);
      formData.append("f_Email", data.f_Email);
      formData.append("f_Mobile", data.f_Mobile);
      formData.append("f_Designation", data.f_Designation);
      formData.append("f_Gender", data.f_Gender);
      formData.append("f_Course", data.f_Course);
      formData.append("f_Image", data.f_Image);

      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/Employee/createEmployee`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      if (resData.status === "success") {
        navigate("/employees");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={crCss.main}>
      <h3>Create Employee</h3>
      <form className={crCss.data} onSubmit={handleSubmit}>
        <div className={crCss.Name}>
          <label htmlFor="f_Name">Name</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setData({ ...data, f_Name: e.target.value })}
          />
        </div>
        <div className={crCss.Email}>
          <label htmlFor="f_Email">Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, f_Email: e.target.value })}
          />
        </div>
        <div className={crCss.Mobile}>
          <label htmlFor="f_Mobile">Mobile</label>
          <input
            type="text"
            placeholder="Mobile"
            onChange={(e) => setData({ ...data, f_Mobile: e.target.value })}
          />
        </div>
        <div className={crCss.Designation}>
          <label htmlFor="f_Designation">Designation</label>
          <select
            value={data.f_Designation}
            onChange={(e) =>
              setData({ ...data, f_Designation: e.target.value })
            }
          >
            <option value="Hr">Hr</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className={crCss.Gender}>
          <label>Gender</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={data.f_Gender === "Male"}
              onChange={(e) => handleGenderChange("Male")}
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
              onChange={(e) => handleGenderChange("Female")}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div className={crCss.Course}>
          <label>Course</label>
          <div>
            <input
              type="checkbox"
              id="mca"
              name="course"
              value="MCA"
              checked={data.f_Course === "MCA"}
              onChange={(e) =>
                handleCourseChange(e.target.checked ? "MCA" : "")
              }
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
              onChange={(e) =>
                handleCourseChange(e.target.checked ? "BCA" : "")
              }
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
              onChange={(e) =>
                handleCourseChange(e.target.checked ? "BSC" : "")
              }
            />
            <label htmlFor="bsc">BSC</label>
          </div>
        </div>
        <div className={crCss.Image}>
          <label htmlFor="f_Image">Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" className={crCss.Button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee;
