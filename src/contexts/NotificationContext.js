// context/todoContext.tsx
import * as React from "react";
// Api
import { fetchNotifications } from "../utils/api";

export const NotificationContext = React.createContext("");

const NotificationProvider = ({ children }) => {
	const [modal, setModal] = React.useState(false);
	const [formType, setFormType] = React.useState("");
	const [notifications, setNotifications] = React.useState([]);
	// const [notification, setNotification] = React.useState(null);
    const [selected, setSelected] = React.useState([]);

	const init = async () => {
		try {
			const items = await fetchNotifications(null, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
			console.log("NotificationContext.init: ", items);
			setNotifications(items.notifications);
		} catch (e) {
			throw new Error(e);
		}
	};

	React.useEffect(() => {
		init();
	}, []);

	return (
		<NotificationContext.Provider
			value={{
				modal,
				formType,
				setFormType,
                notifications,
                setNotifications,
                // notification,
                // setNotification,
                selected,
                setSelected,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;

export function useNotificationContext() {
	return React.useContext(NotificationContext);
}
