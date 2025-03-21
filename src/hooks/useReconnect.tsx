import { axiosInstance } from "data/axiosInstance";
import { resetUser, setUser } from "features/member/memberSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useReconnect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axiosInstance.get("members/me");
        dispatch(setUser(res.data));
      } catch (err1: any) {
        await axiosInstance
          .post("auth/reissue")
          .then(async () => {
            console.log("here?");
            const res = await axiosInstance.get("members/me");
            dispatch(setUser(res.data));
          })
          .catch(() => {
            dispatch(resetUser());
          });
      }
    };

    fetchMe();
  }, []);
};

export default useReconnect;
