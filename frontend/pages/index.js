import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { login } from "../src/services/authService";
import { saveToken } from "../src/services/tokenService";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = useState({
    usuario: "oigor",
    password: "safepassword",
  });

  function handleChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setValues((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await login(values.usuario, values.password);
      saveToken(response.data.access_token);
      router.push("/auth-page-static");
    } catch (e) {
      alert("Usuário ou senha incorretos");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          onChange={handleChange}
          name="usuario"
          value={values.usuario}
        />
        <input
          placeholder="Senha"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
