import { useState, useContext } from "react";
import { userLogin } from "../fetch";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const DevLogin = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    userLogin(inputUsername, inputPassword)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedInUser(data.user);
        navigate("/");
      })
      .catch(() => {
        setError("Invalid Credentials");
      });
  };

  return (
    <form onSubmit={handleLogin} className="dev-login-form">
      <input
        type="text"
        placeholder="Enter username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
};

export default DevLogin;
