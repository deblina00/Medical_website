import React, { useState } from "react";
import Button from "../Layouts/Button";

const Contact = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userNumber: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.userFirstName)
      newErrors.userFirstName = "First Name is required";
    if (!formData.userLastName)
      newErrors.userLastName = "Last Name is required";
    if (!formData.userEmail) {
      newErrors.userEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
      newErrors.userEmail = "Invalid email format";
    }
    if (!formData.userNumber) {
      newErrors.userNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.userNumber)) {
      newErrors.userNumber = "Enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form Submitted:", formData);
    alert("Booking Confirmed! We will contact you soon.");

    setFormData({
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userNumber: "",
    });
    closeForm();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeForm} // Close when clicking outside the form
    >
      <div
        className="popup-form absolute mt-12 text-black bg-white p-5 rounded-xl w-80 md:w-96"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Book Now
          </h1>
          {[
            { label: "First Name", name: "userFirstName", type: "text" },
            { label: "Last Name", name: "userLastName", type: "text" },
            { label: "Your Email", name: "userEmail", type: "email" },
            { label: "Phone No.", name: "userNumber", type: "number" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </label>
              <input
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
          <div className="flex gap-5">
            <Button title="Book Appointment" type="submit" />
            <button
              type="button"
              className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
