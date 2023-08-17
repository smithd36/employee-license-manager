import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const EditEmployeeForm = ({ selectedEmployee, setShowEditForm }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleRedirect = async () => {
    // Check if user email is within the allowed list
    const allowedEmails = ["dreysmith101@gmail.com", "piglife60@gmail.com"];
    if (!session) {
      router.push("/Login"); // Redirect to login if there is no session
    } else if (!allowedEmails.includes(session.user.email)) {
      router.push("/Unauthorized"); // Redirect to unauthorized if not allowed
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/updateEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedEmployee.EMAIL,
          name: data.NAME,
          cevoIss: data.cevoIss,
          dotExp: data.dotExp,
          palsExp: data.palsExp,
          aclsExp: data.aclsExp,
          emsExp: data.emsExp,
          blsExp: data.blsExp,
          licensureLevel: data.licensureLevel,
          mvrExp: data.mvrExp,
        }),
      });
  
      if (response.ok) {
        console.log("Employee details updated successfully");
        setShowEditForm(false); // Close the edit form
        // Refresh the page to show the updated data
        router.reload(window.location.pathname);

      } else {
        console.error("Error updating employee details");
      }
    } catch (error) {
      console.error("Error updating employee details:", error);
    }    
  };  

  return (
    <div className="popup-overlay">
        <div className="edit-employee-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <button onClick={() => setShowEditForm(false)} id="close-btn">X</button>
            <label>Name:</label>
            <input
                type="text"
                {...register("NAME", { required: true })}
                defaultValue={selectedEmployee.NAME}
            />

            <label>Email:</label>
            <input
                type="text"
                {...register("EMAIL", { required: true })}
                defaultValue={selectedEmployee.EMAIL}
            />

            {/* Use type="date" for date inputs */}
            <label>cevoIss:</label>
            <input
            type="date"
            {...register("cevoIss")}
            defaultValue={selectedEmployee.cevoIss ? selectedEmployee.cevoIss.substring(0, 10) : ""}
            />

            <label>dotExp:</label>
            <input
            type="date"
            {...register("dotExp")}
            defaultValue={selectedEmployee.dotExp ? selectedEmployee.dotExp.substring(0, 10) : ""}
            />

            <label>palsExp</label>
            <input
            type="date"
            {...register("palsExp")}
            defaultValue={selectedEmployee.palsExp ? selectedEmployee.palsExp.substring(0, 10) : ""}
            />

            <label>aclsExp:</label>
            <input
            type="date"
            {...register("aclsExp")}
            defaultValue={selectedEmployee.aclsExp ? selectedEmployee.aclsExp.substring(0, 10) : ""}
            />

            <label>emsExp:</label>
            <input
            type="date"
            {...register("emsExp")}
            defaultValue={selectedEmployee.emsExp ? selectedEmployee.emsExp.substring(0, 10) : ""}
            />

            <label>blsExp</label>
            <input
            type="date"
            {...register("blsExp")}
            defaultValue={selectedEmployee.blsExp ? selectedEmployee.blsExp.substring(0, 10) : ""}
            />

            <label>licensureLevel:</label>
            <input
                type="text"
                {...register("licensureLevel")}
                defaultValue={selectedEmployee.licensureLevel}
            />

            <label>mvrExp:</label>
            <input
            type="date"
            {...register("mvrExp")}
            defaultValue={selectedEmployee.mvrExp ? selectedEmployee.mvrExp.substring(0, 10) : ""}
            />

            <button id="save-btn" type="submit">Save Changes</button>    
        </form>
        </div>
    </div>
  );
};

export default EditEmployeeForm;