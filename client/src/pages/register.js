import { useState } from "react";
import Layout from "../components/layout";
import { onRegistration } from "../api/auth";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //registration submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({
        email: "",
        password: "",
        confirmedPassword: "",
        firstname: "",
        lastname: "",
      });
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Register</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            placeholder="test@gmail.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={values.password}
            placeholder="password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmedPassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            className="form-control"
            id="confirmedPassword"
            name="confirmedPassword"
            value={values.confirmedPassword}
            placeholder="confirm password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={values.firstname}
            placeholder="John"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={values.lastname}
            placeholder="Doe"
            required
          />
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Register;
