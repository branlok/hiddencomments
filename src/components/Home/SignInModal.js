import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useAuthorization } from "../../context/AuthorizationProvider";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function SignInModal() {
  const { authState, login } = useAuthorization();
  const history = useHistory();
  const [serverError, setServerError] = useState(null);

  const mutation = useMutation(async (values) => {
    return axios
      .post("http://localhost:3006/authentication/signin", values, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        return response;
      })
      .then((response) => {
        return response;
      });
  });

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Enter username")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    password: yup
      .string()
      .required("Enter password")
      .max(256, "Password is too long"),
  });

  const ErrorNotice = (formikErrors) => {
    return serverError ? (
      <h1 className="text-red-500 font-bold border-red-500 rounded-md border-2 px-4 py-1 mb-4 ">
        {serverError}
      </h1>
    ) : null;
  };

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ username: "", password: "" }}
      onSubmit={(values, { resetForm }) => {
        mutation.mutate(values, {
          onSuccess: (data) => {
            console.log(data.data.user);
            login(data.data.user);
            history.push("/dashboard");
          },
          onError: (err) => {
            console.log(err.response.data.message);
            setServerError(err.response.data.message);
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
            Sign in
          </button>
          <Link
            to={"/register"}
            className="text-gray-400 hover:text-white my-2 px-3 text-xs rounded-sm transition"
          >
            Register
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default SignInModal;
