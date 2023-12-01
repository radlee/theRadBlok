import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllNotifications } from "../apicalls/notifications";
import { GetUser } from "../apicalls/users";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import {
  SetCurrentUser,
  SetNotifications,
  SetSocket,
  SetUnreadCount,
} from "../redux/usersSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000"); //3000 Works
// const socket = io("https://radblok.onrender.com");

function ProtectedRoute({ children }) {
  const { currentUser, unreadCount } = useSelector(
    (state) => state.usersReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUser();
      if (response.success) {
        dispatch(SetCurrentUser(response.data));
        dispatch(SetSocket(socket));
        const notificationsResponse = await GetAllNotifications();
        if (notificationsResponse.success) {
          const notificationsTemp = {
            read: notificationsResponse.data.filter(
              (notification) => notification.read
            ),
            unread: notificationsResponse.data.filter(
              (notification) => !notification.read
            ),
          };
          dispatch(SetNotifications(notificationsTemp));
          dispatch(SetUnreadCount(notificationsTemp.unread.length));
        }
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }// eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.emit("join", currentUser?._id);
    }

    socket.off("newNotification").on("newNotification", (data) => {
      toast((t) => (
        <span className="bg-white text-black p-2 rounded ">
          {data.title}
        </span>
      ))
      const audio = new Audio("/notificationSound.mp3");
      audio.play();
      dispatch(SetUnreadCount(unreadCount + 1));

      // play notification sound
    });// eslint-disable-next-line
  }, [currentUser]);

  return (
    currentUser && (
      <div className="p-5 ">
      <nav className="bg-header px-2 sm:px-4 py-2.5 rounded ">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
      <div className="flex items-center  cursor-pointer" onClick={() => navigate("/")}>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/d8ab2f164464737.63f74bc45587e.png" className="h-9 mr-6 sm:h-12" alt="radBlok Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-primary"><span className="rad">rad</span>Blok</span>
      </div>
      <div className="flex items-center md:order-2">
          <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          </button>


              <div className="bg-white rounded p-2 flex gap-2 items-center font-semibold text-primary">
          <h1
              className="underline uppercase text-sm cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {currentUser.name}
            </h1>
            <div
              className="  relative flex cursor-pointer"
              onClick={() => navigate("/notifications")}
            >
              <i className="ri-notification-line cursor-pointer"></i>
              {unreadCount > 0 && (
                <h1 className="p-2 h-5 w-5 bg-red text-white  rounded-full text-[10px] flex items-center justify-center  -ml-1">
                  {unreadCount}
                </h1>
              )}
            </div>
            <i
              className="ri-logout-circle-r-line ml-5 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
      </div>
     
      </div>
    </nav>

    <div className="mt-5 overflow-scroll h-[85vh]">{children}</div>

</div>
    
    )
  );
}

export default ProtectedRoute;
