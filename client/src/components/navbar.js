import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Navbar = ({ name }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light border w-100">
      <div className="container">
        <div>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <span className="navbar-brand mb-0 h1">
              <i className="fa-solid fa-book-medical me-1"></i>HealthBook
            </span>
          </NavLink>
        </div>

        {isAuth ? (
          <div className="d-flex align-items-center">
            <NavLink
              to="/doctor"
              className="navbar-brand mb-0 text-secondary mx-4"
            >
              <span>Professionals</span>
            </NavLink>
            <NavLink
              to="/medicine"
              className="navbar-brand mb-0 text-secondary mx-4"
            >
              <span>Medicine</span>
            </NavLink>
            <NavLink
              to="/appointment"
              className="navbar-brand mb-0 text-secondary mx-4"
            >
              <span>Appointments</span>
            </NavLink>
            <div className="dropdown mx-3">
              <button
                className="btn btn-secondary dropdown-toggle btn-light"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {name}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    type="button"
                    className="btn btn-white dropdown-item"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <NavLink to="/login">
              <span>Login</span>
            </NavLink>

            <NavLink to="/register" className="mx-3">
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
