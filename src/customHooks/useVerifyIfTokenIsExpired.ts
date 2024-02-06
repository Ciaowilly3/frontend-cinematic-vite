import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { memorizeWebToken } from "../slices/auth/authTokenSlice";

const useVerifyIfTokenIsExpired = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.authToken);

  const verifyIfTokenIsExpired = () => {
    const { expirationDate } = authToken;

    if (expirationDate) {
      if (parseInt(expirationDate) < Date.now()) {
        console.log("è entrato solo?");

        localStorage.removeItem("persist:authToken");
        dispatch(memorizeWebToken(""));
      }
    }
  };

  return {
    verifyIfTokenIsExpired,
  };
};

export default useVerifyIfTokenIsExpired;
