import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate(); //vrati fci kterou nazvu navigate, tim ze ji zavolam mohu skocit na jakoukoli adresu

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Prihlasuji...", email, password);

    //has to be await, ve videu - v reseni je chyba!!""
    // const {data, error} = await login(email, password);

    //await supabase.auth.signInWithPassword({ email, password}) - ted to taham z AuthContext.jsx

    const { data, error } = await login(email, password);

    // if (!error && data) {
    // 	console.log(data) // vratili se data o prihlasenem uzivateli
    // }
    if (error) {
      console.log(error);
      return;
    }
    //pokud pri prihlaseni nedoslo k chybe, presmeruj na puvodni stranku
    navigate("/");
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Přihlášení</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-[#693382] text-white py-2 px-4 rounded hover:bg-[#5a2b6f]"
          >
            Přihlásit se
          </button>

          <p className="text-sm">
            Ještě nemáš účet?{" "}
            <Link to="/register" className="text-[#5F99AE] underline">
              Zaregistruj se.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
