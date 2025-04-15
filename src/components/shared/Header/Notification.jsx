import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { RxCross2 } from "react-icons/rx";
import useGetNotification from "../../../hooks/notification";
import { setShowNotification } from "../../../redux/features/global/globalSlice";

const Notification = () => {
  const { data, isFetched, isFetching } = useGetNotification();

  const dispatch = useDispatch();
  const [filteredNotification, setFilteredNotification] = useState([]);
  const { showNotification } = useSelector((state) => state.global);

  useEffect(() => {
    const storedNotificationId =
      JSON.parse(localStorage.getItem("notificationId")) || [];
    if (
      (!storedNotificationId || storedNotificationId?.length === 0) &&
      data?.length > 0
    ) {
      dispatch(setShowNotification(true));
      const sortNotification = data?.sort((a, b) => a.sort - b.sort);

      setFilteredNotification(sortNotification);
    }
    if (
      data?.length > 0 &&
      storedNotificationId &&
      storedNotificationId?.length > 0 &&
      !showNotification
    ) {
      const filteredNotifications = data.filter(
        (notif) => !storedNotificationId.some((nId) => nId.id == notif.id)
      );

      if (filteredNotifications?.length > 0) {
        const sortNotification = filteredNotifications?.sort(
          (a, b) => a.sort - b.sort
        );
        setFilteredNotification(sortNotification);
        dispatch(setShowNotification(true));
      }
    }
  }, [data, showNotification, isFetched, isFetching, dispatch]);

  const closeNotification = () => {
    const notificationIds =
      JSON.parse(localStorage.getItem("notificationId")) || [];

    data?.forEach((item) => {
      if (!notificationIds.some((notif) => notif.id === item.id)) {
        notificationIds.push({ id: item.id });
      }
    });

    localStorage.setItem("notificationId", JSON.stringify(notificationIds));

    dispatch(setShowNotification(false));
  };

  return (
    <>
      {showNotification && filteredNotification?.length > 0 && (
        <div className="marquee-box" style={{ display: "flex" }}>
          <h4>News</h4>

          <div
            style={{
              padding: "2px 5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              fontSize: "11px",
              backgroundColor: "#353535",
            }}
          >
            <Marquee>
              {filteredNotification?.map((item) => (
                <p key={item?.id} className="mr-[100vw] text-white">
                  {item?.text}
                </p>
              ))}
            </Marquee>

            <button onClick={closeNotification}>
              <RxCross2 color="#fff" size={20} cursor="pointer" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
