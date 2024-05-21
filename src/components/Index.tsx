import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="links">
      <Link to="/register" className="link">
        Rejestracja
      </Link>
      <Link to="/login" className="link">
        Logowanie
      </Link>
    </div>
  );
};

export default Index;
