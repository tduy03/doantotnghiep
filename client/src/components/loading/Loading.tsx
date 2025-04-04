import { Box, LinearProgress } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
  isShow: boolean;
};

const Loading: FC<LoadingProps> = ({ isShow }) => {
  return (
    <>
      {isShow && (
        <Box
          sx={{
            position: "fixed", // Luôn cố định
            top: 0,
            left: 0,
            width: "100%", // Chiếm toàn bộ chiều ngang
            zIndex: 1300, // Đảm bảo hiển thị trên cùng
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền mờ nhẹ
          }}
        >
          <LinearProgress
            color="primary" // Tùy chỉnh màu sắc
            sx={{
              height: 4, // Tăng chiều cao nếu cần
            }}
          />
        </Box>
      )}
    </>
  );
};

export default Loading;
