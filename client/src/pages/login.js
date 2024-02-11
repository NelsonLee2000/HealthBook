import { useState } from "react";
import Layout from "../components/layout";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

const Login = ({ getName }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError(false);
  };

  const dispatch = useDispatch();

  //login submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // await onLogin(values);
      // dispatch(authenticateUser());
      // localStorage.setItem("isAuth", "true");
      // getName();
      const { data } = await onLogin(values);
      dispatch(authenticateUser());
      localStorage.setItem('token', data.token);
      localStorage.setItem("isAuth", "true");
      getName();
    } catch (err) {
      console.log(err.response.data.errors[0].msg);
      setError(err.response.data.errors[0].msg);
    }
  };

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Login</h1>

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

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Login;
