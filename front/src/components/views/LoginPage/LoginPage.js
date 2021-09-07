import React, { useState } from "react";
import "../../../BookMain.scss";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Checkbox, Typography } from "antd";
import { useDispatch } from "react-redux";

// const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialId = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{
        id: initialId,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().required("아이디를 입력해주세요."),
        password: Yup.string()
          .min(6, "6자리 이상의 비밀번호를 입력해주세요.")
          .required("비밀번호를 입력해주세요."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            id: values.id,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.id);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                setFormErrorMessage("계정 또는 비밀번호를 다시 확인하세요.");
              }
            })
            .catch((err) => {
              setFormErrorMessage("계정 또는 비밀번호를 다시 확인하세요.");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h1 className="logintitle">Log In</h1>
            <form className="loginform" onSubmit={handleSubmit}>
              <Form.Item required>
                <Input className="logininput"
                  id="id"
                  prefix={
                    <Icon type="user" className="loginIcon"/>
                  }
                  placeholder="ID"
                  type="text"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.id && touched.id ? "text-input error" : "text-input"
                  }
                />
                {errors.id && touched.id && (
                  <div className="input-feedback">{errors.id}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input className="logininput"
                  id="password"
                  prefix={
                    <Icon type="lock" className="loginIcon" />
                  }
                  placeholder="PASSWORD"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: "#ff0000bf",
                      fontSize: "0.9rem",
                      border: "1px solid",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <Form.Item>
                <div className="loginbutton_con">
                  <button className="loginbutton"
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    Log in
                  </button>
                </div>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
