import { FC } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosClient from "../../../lib/axiosClient";
import { toast } from "../../../lib/myToast";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Btn } from "../../../components";
interface LoginProps {
  setIsNewUser: (_val: boolean) => void;
}

const Login: FC<LoginProps> = ({ setIsNewUser }) => {
  const nav = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const submitHandler = async (
    values: Yup.InferType<typeof LoginSchema>,
    { setSubmitting }: { setSubmitting: (_val: boolean) => void }
  ) => {
    setSubmitting(true);
    await axiosClient
      .post(`/login`, values)
      .then((res) => {
        if (res.data.success == 1 && res.status == 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          nav("/homepage");
        } else {
          toast({ type: "error", message: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.error(err);
        toast({ type: "error", message: err.response.data.msg });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <h2 className=" text-3xl  capitalize">login</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="flex  flex-col gap-4 p-2">
            <div className=" relative">
              <Field
                type="email"
                name="email"
                className="form-input"
                placeholder="email"
                autoComplete="true"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="email"
              />
            </div>
            <div className=" relative">
              <Field
                type="password"
                name="password"
                className="form-input"
                placeholder="password"
                autoComplete="true"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="password"
              />
            </div>

            <Btn
              type="button"
              className="p-2"
              onClick={() => {
                setIsNewUser(true);
              }}
            >
              don't have an account ? sign up
            </Btn>
            <Btn
              variant="fill"
              type="submit"
              disabled={isSubmitting}
              className="rounded px-4 py-2"
            >
              {isSubmitting ? "submiting..." : "login"}
            </Btn>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
