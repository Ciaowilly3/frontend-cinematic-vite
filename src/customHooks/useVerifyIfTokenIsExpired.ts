import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { memorizeWebToken } from "../slices/auth/authTokenSlice";

const useVerifyIfTokenIsExpired = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.authToken);

  const verifyIfTokenIsExpired = () => {
    const { expirationDate } = authToken;

    if (expirationDate) {
      const expirationDateObject = new Date(expirationDate);

      if (expirationDateObject < new Date()) {
        console.log("è espirato");

        localStorage.removeItem("persist:authToken");
        dispatch(memorizeWebToken(""));
      } else {
        console.log("non ancora");
      }
    }
  };

  return {
    verifyIfTokenIsExpired,
  };
};

export default useVerifyIfTokenIsExpired;
