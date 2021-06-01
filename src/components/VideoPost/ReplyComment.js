
import { Field, Form, Formik } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { useAuthorization } from "../../context/AuthorizationProvider";
import axiosInstance from "../../helpers/axios";

function ReplyComment({ videoId, replyTo }) {
  let { authState } = useAuthorization();
  const queryClient = useQueryClient();

  let mutation = useMutation(
    (values) => {
      return axiosInstance
        .post(`/comments`, values)
        .catch((err) => {
          console.log(err.response);
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(replyTo);
      },
    }
  );

  let initialValues = {
    commentBody: "",
  };

  let validationSchema = yup.object().shape({
    commentBody: yup.string().required().max(500),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, action) => {
        mutation.mutate(
          {
            ...values,
            uid: authState.uid,
            videoId,
            replyTo,
          },
          {
            onError: (err) => {
              console.log(err);
            },
          }
        );
        action.resetForm();
      }}
    >
      <Form className="mt-4 w-full">
        <Field
          className="bg-gray-800 h-12 w-full p-2 text-white font-bold rounded-md
            outline-none
          border-2 border-gray-500 
          focus:bg-cblue-400
          "
          autoComplete="off"
          type="text"
          placeholder="leave a comment"
          name="commentBody"
        />
      </Form>
    </Formik>
  );
}

export default ReplyComment;
