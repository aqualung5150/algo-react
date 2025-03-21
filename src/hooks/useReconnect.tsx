import { RootState } from "app/store";
import { axiosInstance } from "data/axiosInstance";
import { resetUser, setUser } from "features/member/memberSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useReconnect = () => {
  const dispatch = useDispatch();
  const memberId = useSelector((state: RootState) => state.member.id);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axiosInstance.get("members/me");
        dispatch(setUser(res.data));
      } catch (err1: any) {
        if (memberId) {
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
        } else {
          dispatch(resetUser());
        }
      }
    };

    fetchMe();
  }, []);
};

export default useReconnect;
