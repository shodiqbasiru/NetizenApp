import React, { useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { NavLink, useNavigate } from "react-router";
import { User } from "../../../types/auth";
import { createUser, getUsers } from "../../../usecase/usecase-users";

function Register(): React.ReactElement {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validate = () => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const existingUsers = getUsers();

    if (firstName.length < 1) {
      errors.firstName = "First name must be at least 1 character.";
    }
    if (lastName.length < 1) {
      errors.lastName = "Last name must be at least 1 character.";
    }
    if (date) {
      const year = date.getFullYear();
      if (year < 1968 || year > 2015) {
        errors.dateOfBirth = "Date of birth must be between 1968 and 2015.";
      }
    } else {
      errors.dateOfBirth = "Date of birth is required.";
    }
    if (phoneNumber.length > 15) {
      errors.phoneNumber = "Phone number must be at most 15 characters.";
    }
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    } else if (existingUsers.some((user : User) => user.email === email)) {
      errors.email = "Email is already in use.";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser: User = {
      id: Date.now().toString(),
      firstName,
      lastName,
      dateOfBirth: date?.toISOString() || "",
      phoneNumber,
      email,
      password,
    };

    createUser(newUser);
    alert("Account created successfully!");
    navigate("/auth/login");
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-jura font-bold">Create Your Account</h1>
          <p className="text-lg font-public-sans">
            Join the NetizenApp community and start sharing your stories today!
          </p>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-bold mb-2"
                htmlFor="first-name"
              >
                First Name
              </label>
              <InputText
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your firstname"
                type="text"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-bold mb-2"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <InputText
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                type="text"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date-of-birth"
            >
              Date of Birth
            </label>
            <Calendar
              id="buttondisplay"
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
              placeholder="Select a Date"
              className="w-full"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone-number"
              >
                Phone Number
              </label>
              <div className="p-inputgroup flex-1">
                <InputText
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  type="text"
                />
                <span className="p-inputgroup-addon">
                  <i className="pi pi-phone"></i>
                </span>
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="p-inputgroup flex-1">
                <InputText
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                />
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="p-inputgroup flex-1">
              <InputText
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <Button label="Sign Up" className="w-full" type="submit" />
          </div>
        </form>
      </div>
      <div className="text-center">
        <p className="font-public-sans">
          Already have an account?{" "}
          <NavLink to="/auth/login" className="font-bold">
            Sign In
          </NavLink>
        </p>
      </div>
    </>
  );
}

export default Register;
