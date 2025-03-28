import { RootState } from "app/store";
import axios from "axios";
import { finishConnection } from "features/auth/authSlice";
import { resetUser, setUser } from "features/member/memberSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useReconnect = () => {
  const dispatch = useDispatch();
  const memberId = useSelector((state: RootState) => state.member.id);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/members/me`,
        );
        dispatch(setUser(res.data));
      } catch (err1: any) {
        if (memberId) {
          await axios
            .post(`${import.meta.env.VITE_API_URL}/auth/reissue`)
            .then(async () => {
              const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/members/me`,
              );
              dispatch(setUser(res.data));
            })
            .catch(() => {
              dispatch(resetUser());
            });
        } else {
          dispatch(resetUser());
        }
      } finally {
        dispatch(finishConnection());
      }
    };

    fetchMe();
  }, []);
};

export default useReconnect;
