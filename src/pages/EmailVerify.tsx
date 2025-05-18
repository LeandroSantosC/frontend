import { CircularProgress, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiResponse } from "../services/api/request";
import { useAuth } from "../context/AuthContext";

export default function EmailVerify() {

  const [result, setResult] = useState<ApiResponse<string> | undefined>();
  const { verifyEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token).then((res) => {
        setResult(res);
      });
    }

    const timeoutId = setTimeout(() => {
      navigate("/")
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [token]);

  // const boardButtons = [
  //   { id: 1, text: "BoardBtn 1" },
  //   { id: 2, text: "BoardBtn 2" },
  // ];

  return (
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-blue-500 items-center justify-center">
        <div className="h-[30vh]">
          <Typography>Redirecionando</Typography>
          <Typography>{result?.success ? result.response : result?.error}</Typography>
          <CircularProgress />
        </div>
      </div>
  );
}