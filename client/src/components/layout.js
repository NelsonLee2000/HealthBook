import Navbar from "./navbar";

const Layout = ({ children, name }) => {
  return (
    <div>
      <Navbar name={name} />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
