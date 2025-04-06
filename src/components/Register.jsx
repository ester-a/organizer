import { useState } from "react";
import { supabase } from "./../supabase/supabase-client";
import {useAuth} from '../context/AuthContext'

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const [message, setMessage] = useState(null);

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(null); //pokazde kdyz dojde k odeslani formulare, tak to nastavim na null, aby se ta zprava vynulovala

    if (email === "" || password === "") {
      setMessage("E-mail a heslo jsou povinné.");
      return;
    }
    try {
      const { data, error } = await register(
        email,
        password,
        firstName,
        lastName,
        age
      );

      if (error) {
        console.error(error);
        setMessage("Chyba při vytváření účtu");
      } else {
        console.log(data);
        setMessage(
          "Registrace proběhla úspěšně. Zkontrolujte e-mail pro potvrzení."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("Neočekávaná chyba.");
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Registrace</h2>

        {message && <p className="text-sm mb-4 text-[#693382]">{message}</p>}

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

          <hr className="my-4" />

          <div>
            <label className="block mb-1 font-medium">Jméno</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Příjmení</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Věk</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-[#693382] text-white py-2 px-4 rounded hover:bg-[#5a2b6f]"
          >
            Registrovat
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
