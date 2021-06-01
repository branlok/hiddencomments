import { Formik, Form, Field } from "formik";
import React, { useRef } from "react";
import { useAuthorization } from "../../context/AuthorizationProvider";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../helpers/axios";
function CommentMaker({ videoId }) {
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
        queryClient.invalidateQueries("comments");
      },
    }
  );

  let myFormRef = useRef();

  let initialValues = {
    commentBody: "",
  };

  let validationSchema = yup.object().shape({
    commentBody: yup.string().required().max(500),
  });

  const onEnterPress = (e) => {
    //add shift to textarea for new line, and enter to submit
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      myFormRef.current.click();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, action) => {
        console.log("submited", values, authState.uid);
        mutation.mutate({ ...values, uid: authState.uid, videoId });
        action.resetForm();
      }}
    >
      <Form className="my-2 w-full ">
        <Field
          className="bg-cblue-300 h-20 w-full p-2 text-white font-bold rounded-md customRing"
          as="textarea"
          placeholder="leave a comment"
          name="commentBody"
          onKeyDown={onEnterPress}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto text-white border-indigo-500 border-2 px-2 py-1 rounded-md mt-2 hover:bg-cblue-300"
            ref={myFormRef}
          >
            Comment
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default CommentMaker;
