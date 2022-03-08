import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/" && (
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/wallet">Wallet</Link> |{" "}
          <Link to="/transfer">Transfer</Link>
        </nav>
      )}
    </>
  );
};

export default Navbar;
