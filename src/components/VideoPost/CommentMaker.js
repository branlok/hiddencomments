import { Formik, Form, Field } from "formik";
import React, { useRef } from "react";
import { useAuthorization } from "../../context/AuthorizationProvider";
import * as yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
function CommentMaker({ videoId }) {
  let { authState } = useAuthorization();

  let mutation = useMutation((values) => {
    return axios
      .post(`http://localhost:3006/comments`, values, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err.response);
      });
  });

  //    uid: authState.user.uid,
  let initialValues = {
    commentBody: "",
  };
  let myFormRef = useRef();
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
        console.log("submited", values, authState.user.uid);
        mutation.mutate({ ...values, uid: authState.user.uid, videoId });
        action.resetForm();
      }}
    >
      <Form className="my-2 w-full">
        <Field
          className="bg-cblue-300 h-20 w-full p-2 text-white font-bold rounded-md"
          as="textarea"
          placeholder="leave a comment"
          name="commentBody"
          onKeyDown={onEnterPress}
        />
        <button type="submit" className="text-white" ref={myFormRef}>
          Comment
        </button>
      </Form>
    </Formik>
  );
}

export default CommentMaker;
