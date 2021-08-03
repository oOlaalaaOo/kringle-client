import { useEffect, useState } from "react";
import AuthService from "../services/api/auth.service";

const WithAuth = (WrappedComponent: any) => {
  const NewComponent = (props: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const result = await AuthService.authUser();

          setUser(result.data.user);
          setLoading(false);
        } catch (err) {
          console.log("err", err);
          setLoading(false);
        }
      })();
    }, []);

    return loading === false ? (
      <WrappedComponent user={user} {...props} />
    ) : null;
  };

  return NewComponent;
};

export default WithAuth;
