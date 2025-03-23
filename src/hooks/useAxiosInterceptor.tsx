import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, resetUser, setUser } from "features/member/memberSlice";

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const dispatch = useDispatch();

  const handleRequest = async (config: InternalAxiosRequestConfig) => {
    return config;
  };
  const handleResponse = (response: AxiosResponse) => {
    return response;
  };

  const handleError = async (error: any) => {
    if (error.response.data.code === 1002) {
      //토큰 만료
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/reissue`);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/members/me`,
        );
        dispatch(setUser(res.data));
        return error.config && axios(error.config);
      } catch (err) {
        alert("로그인 정보가 만료되었습니다.");
        dispatch(logout(`${import.meta.env.VITE_BASE_URL}/login`));
      }
    }

    return Promise.reject(error);
  };

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      handleRequest,
      handleError,
    );
    const responseInterceptor = instance.interceptors.response.use(
      handleResponse,
      handleError,
    );

    return () => {
      instance.interceptors.response.eject(responseInterceptor);
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return instance;
};

export default useAxiosInterceptor;
