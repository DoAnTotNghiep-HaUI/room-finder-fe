import { Blog } from "@/page/Blog";
import { BlogDetail } from "@/page/BlogDetail";
import FindRental from "@/page/FindRental";
import HomePage from "@/page/HomePage";
import { RoomDetail } from "@/page/RoomDetail";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/find-rental",
      element: <FindRental />,
    },
    {
      path: "/room/:roomId",
      element: <RoomDetail />,
    },
    {
      path: "/blog",
      element: <Blog />,
    },
    {
      path: "/blog/:blogId",
      element: <BlogDetail />,
    },
  ],
  { basename: "/" }
);
