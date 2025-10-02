import ChatWindowContainer from "@/components/Chat";
import Footer from "@/components/Footer/footer";
import { Header } from "@/components/Header/header";
import { AppDispatch, AppState } from "@/redux";
import { refreshToken } from "@/redux/auth/action";
import { isTokenExpired } from "@/utils/request";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; // Thêm import này

const Layout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expiresAt, accessToken } = useSelector(
    (state: AppState) => state.auth
  );

  useEffect(() => {
    if (isTokenExpired(expiresAt)) {
      dispatch(refreshToken());
    }
  }, [accessToken, dispatch, expiresAt]);

  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Đây là nơi các page component sẽ được render */}
      </main>
      <footer className="bg-gray-900 text-gray-300">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
