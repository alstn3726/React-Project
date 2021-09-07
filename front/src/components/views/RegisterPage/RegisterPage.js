import React from "react";
import moment from "moment";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";
import { withRouter } from "react-router";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {


  console.log('props',props);


  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        nickname: "",
        id: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string().required("아이디를 입력해주세요."),
        nickname: Yup.string().required("닉네임을 입력해주세요."),
        email: Yup.string()
          .email("이메일 형식에 맞게 입력해주세요.")
          .required("이메일을 입력해주세요."),
        password: Yup.string()
          .min(6, "6자리 이상의 비밀번호를 입력해주세요.")
          .required("비밀번호를 입력해주세요."),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치해야합니다.")
          .required("비밀번호를 입력해주세요."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            id: values.id,
            nickname: values.nickname,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            console.log('response.payload',response.payload)
            if (response.payload.success) {
              props.history.push("/users/login");
            } else {
              alert(response.payload.errMsg);
            }
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
          <div className="app2">
            <h2>Sign up</h2>
            <Form
              style={{ minWidth: "300px"}}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="">
                <Input style={{width:"100%",height:"60px",padding:"4px 11px",fontSize:"23px"}}
                  id="id"
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
                  <div className="input-feedback" style={{margin: "0 0 8px 10px"}}>{errors.id}</div>
                )}
              </Form.Item>

              <Form.Item required label="">
                <Input  style={{width:"100%",height:"60px",fontSize:"23px"}}
                  id="nickname"
                  placeholder="NICKNAME"
                  type="text"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.nickname && touched.nickname
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.nickname && touched.nickname && (
                  <div className="input-feedback" style={{margin: "0 0 8px 10px"}}>{errors.nickname}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label=""
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? "error" : "success"
                }
              >
                <Input style={{width:"100%",height:"60px",fontSize:"23px"}}
                  id="email"
                  placeholder="EMAIL"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback" style={{margin: "0 0 8px 10px"}}>{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label=""
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? "error" : "success"
                }
              >
                <Input style={{width:"100%",height:"60px",padding:"4px 11px",fontSize:"23px"}}
                  id="password"
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
                  <div className="input-feedback" style={{margin: "0 0 8px 10px"}}>{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="" hasFeedback>
                <Input style={{width:"100%",height:"60px",fontSize:"23px"}}
                  id="confirmPassword"
                  placeholder="CONFIRM PASSWORD"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback" style={{margin: "0 0 8px 10px"}}>{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout} style={{textAlign:"center", margin:"0",border:"1px solid #ffffff",fontSize:"23px"}}>
                <button className="signupbutton"
                style={{textAlign:"center"}}
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(RegisterPage);
