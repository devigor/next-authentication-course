import { useRouter } from "next/router";
import { useSession } from "../hooks/useSession";

import { getSession } from "./authService";

export const withSession = (callback) => {
  return async (ctx) => {
    try {
      const session = await getSession(ctx);
      const newContext = {
        ...ctx,
        req: {
          ...ctx,
          session,
        },
      };
      return callback(newContext);
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
};

export const withSessionHOC = (Component) => {
  return function Wrapper(props) {
    const router = useRouter();
    const { session, loading, error } = useSession();

    if (loading) <h1>Carregando...</h1>;
    if (!loading && error) router.push(`/?error=401`);

    const newProps = {
      ...props,
      session,
    };

    return <Component {...newProps} />;
  };
};
