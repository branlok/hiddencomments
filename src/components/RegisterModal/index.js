import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useAuthorization } from "../../context/AuthorizationProvider";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "../../helpers/axios";

function RegisterModal() {
  const history = useHistory();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation((values) => {
    return axiosInstance
      .post("/authentication/signup", values)
      .then((response) => {
        console.log(response.data);
      });
  });

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    username: yup
      .string()
      .required("Username is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    password: yup
      .string()
      .required("Password is required")
      .max(256, "Password is too long"),
  });

  const ErrorNotice = (formikErrors) => {
    return serverError ? (
      <h1 className="text-red-500 font-bold border-red-500 rounded-md border-2 px-4 py-1 mb-4 text-center">
        {serverError}
      </h1>
    ) : null;
  };

  if (mutation.isSuccess) {
    return <div className="text-gray-200 font-bold text-xl text-center">You are registered! <br/> <Link to="/"><span className="text-indigo-600">login here</span></Link></div>;
  }

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: () => {
            // history.push("/dashboard");
          },
          onError: (err) => {
            console.log(err.response.data.message);
            setServerError(err.response.data.message);
          },
          onSettled: () => {
            resetForm();
          },
        });
      }}
    >
      {(props) => (
        <Form className="w-80 flex flex-col justify-center items-center border-2 border-gray-600 p-5 m-2 rounded-md">
          {ErrorNotice(props.errors)}
          {/* {props.errors.username || props.errors.password ? (
            <h1 className="text-red-500 font-bold border-red-500 rounded-md border-2 px-4 py-1 mb-4 ">
              Username and Password are Required
            </h1>
          ) : null} */}
          <label className="text-gray-200 font-bold" htmlFor="email">
            Email
          </label>
          <Field className="modernInput" type="text" name="email" />
          <span className="text-white text-xs text-red-500 mb-2 font-bold ">
            {props.errors.email}
          </span>
          <label className="text-gray-200 font-bold" htmlFor="username">
            Username
          </label>
          <Field className="modernInput" type="text" name="username" />
          <span className="text-white text-xs text-red-500 mb-2 font-bold ">
            {props.errors.username}
          </span>
          <label className="text-gray-200 font-bold" htmlFor="password">
            Password
          </label>
          <Field className="modernInput" type="password" name="password" />
          <span className="text-white text-xs text-red-500  mb-2 font-bold">
            {props.errors.password}
          </span>

          <button
            className="text-white hover:bg-cblue-300 py-1 px-3 my-2 rounded-sm transition"
            type="submit"
          >
            Register
          </button>
          <Link
            to={"/"}
            className="text-gray-400 hover:text-white my-2 px-3 text-xs rounded-sm transition"
          >
            Sign in
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterModal;
