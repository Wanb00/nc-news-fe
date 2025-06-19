import { useState, useContext } from "react";
import { getUserByUsername } from "../fetch";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const DevLogin = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [error, setError] = useState("");
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    getUserByUsername(inputUsername)
      .then((user) => {
        setLoggedInUser(user);
        navigate("/");
      })
      .catch(() => {
        setError("Invalid username");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="dev-login-form">
      <input
        type="text"
        placeholder="Enter username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
};

export default DevLogin;
