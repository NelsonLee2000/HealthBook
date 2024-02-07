import Navbar from "./navbar";

const Layout = ({ children, name }) => {
  return (
    <div className="w-100">
      <Navbar name={name} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
