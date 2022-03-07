import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/">Authentication</Link> | <Link to="/wallet">Wallet</Link> |
      <Link to="/transfer">Transfer</Link>
    </nav>
  );
};

export default Navbar;
