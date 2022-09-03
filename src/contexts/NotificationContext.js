// context/todoContext.tsx
import * as React from "react";
// Api
import { fetchNotifications, deleteNotification, createNotification } from "../utils/api";

export const NotificationContext = React.createContext("");

const NotificationProvider = ({ children }) => {
	const [modal, setModal] = React.useState(false);
	const [formType, setFormType] = React.useState("");
	const [notifications, setNotifications] = React.useState([]);
	const [notification, setNotification] = React.useState(null);
	const [selected, setSelected] = React.useState([]);

	const handleClickOpen = () => {
		init();
		setModal(true);
		setFormType("add");
	};

	const handleClose = () => {
		setFormType("");
		setModal(false);
	};

	const saveNotification = async () => {
		try {
            const item = await createNotification(
                project,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            if (item.success) {
                init();
                handleClose();
            }
            return item;
        } catch(e) {
            throw new Error(e);
        }
	};

	const removeNotification = async (id) => {
		try {
			const item = await deleteNotification(id, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
			if (item.success) {
				init();
			}
			return item;
		} catch(e) {
			throw new Error(e);
		}
	};

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
                notification,
                setNotification,
				saveNotification,
				removeNotification,
                selected,
                setSelected,
				handleClickOpen,
				handleClose
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
