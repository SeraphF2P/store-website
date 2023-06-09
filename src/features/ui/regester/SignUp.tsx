import { FC } from "react";
import * as Yup from "yup";
import axiosClient from "../../../lib/axiosClient";
import { toast } from "../../../lib/myToast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaFemale, FaMale } from "react-icons/fa";
import { Btn } from "../../../components";
import { useNavigate } from "react-router-dom";
interface SignUpProps {
  setIsNewUser: (_val: boolean) => void;
}

const SignUp: FC<SignUpProps> = ({ setIsNewUser }) => {
  const nav = useNavigate();
  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Write Your Full Name")
      .required("name is required"),
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string()
      .min(6, "password must be at least 6 characters")
      .required("password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "passwords must match")
      .required("confirm your password"),
    isMale: Yup.boolean().required("Please select a gender"),
    phone: Yup.string().nullable(),
    address: Yup.string().nullable(),
  });
  const submitHandeler = async (
    values: Yup.InferType<typeof SignUpSchema>,
    { setSubmitting }: { setSubmitting: (_val: boolean) => void }
  ) => {
    setSubmitting(true);
    await axiosClient
      .post(`/signup`, values)
      .then((res) => {
        if (res.status === 200 && res.data.success == 1) {
          setIsNewUser(false);
          nav("/homepage");
          toast({ type: "success", message: res.data.msg });
        } else {
          toast({ type: "warn", message: res.data.msg });
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
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          isMale: true,
          phone: "",
          address: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={submitHandeler}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col items-center justify-center ">
            <div className="relative h-12  ">
              <Field
                className=" form-input"
                autoComplete="true"
                name="name"
                type="text"
                placeholder="Name"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="name"
              />
            </div>

            <div className=" relative h-12 ">
              <Field
                className=" form-input"
                autoComplete="true"
                name="email"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="email"
              />
            </div>
            <div className=" relative h-12">
              <Field
                className=" form-input"
                autoComplete="true"
                name="password"
                type="password"
                placeholder="Password"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="password"
              />
            </div>
            <div className=" relative  h-12">
              <Field
                className=" form-input"
                autoComplete="true"
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="password_confirmation"
              />
            </div>

            <div className=" flex gap-2 p-2">
              <div className=" flex flex-row-reverse items-center gap-2 p-2 ">
                <Field
                  value="male"
                  id="male"
                  checked={values.isMale == true}
                  onClick={() => setFieldValue("isMale", true)}
                  className="  cursor-pointer text-teal-400 !ring-teal-400  hover:scale-110"
                  name="isMale"
                  type="radio"
                />

                <label
                  onClick={() => setFieldValue("isMale", true)}
                  className=" cursor-pointer hover:scale-105 active:scale-95"
                  htmlFor="male"
                >
                  <FaMale className=" text-sky-500" size={24} />
                </label>
              </div>
              <div className=" flex items-center gap-2 p-2 ">
                <Field
                  value="female"
                  id="female"
                  checked={values.isMale == false}
                  onClick={() => setFieldValue("isMale", false)}
                  className="  cursor-pointer text-teal-400 !ring-teal-400  hover:scale-110"
                  name="isMale"
                  type="radio"
                />
                <label
                  onClick={() => setFieldValue("isMale", false)}
                  className=" cursor-pointer hover:scale-105 active:scale-95"
                  htmlFor="female"
                >
                  <FaFemale className=" text-pink-500" size={24} />
                </label>
              </div>
            </div>
            <div className=" relative h-12">
              <Field
                className=" form-input"
                name="phone"
                type="text"
                placeholder="Phone"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="phone"
              />
            </div>
            <div className=" relative h-12">
              <Field
                className=" form-input"
                autoComplete="true"
                name="address"
                type="text"
                placeholder="Address"
              />
              <ErrorMessage
                component="div"
                className=" form-error"
                name="address"
              />
            </div>
            <div className=" flex w-full justify-between p-4 ">
              <Btn
                onClick={() => {
                  setIsNewUser(false);
                }}
                className="px-4 py-2"
                variant="outline"
                type="button"
              >
                close
              </Btn>
              <Btn
                variant="fill"
                className="px-4 py-2"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Btn>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
