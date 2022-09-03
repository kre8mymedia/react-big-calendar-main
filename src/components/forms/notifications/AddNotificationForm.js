import React from "react";
import {
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	TextField,
	Grid,
	Button,
} from "@material-ui/core";

import { useNotificationContext } from "../../../contexts/NotificationContext";

export default function AddNotificationForm() {
	const {
		submitForm,
		handleClose,
		notification,
		setNotification,
		setFormType,
	  } = useNotificationContext();

	return (
		<div>
			<DialogTitle>Create Notification</DialogTitle>
			<DialogContent>
				<DialogContentText>
				This modal is used for creating new notifications.
				</DialogContentText>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoFocus
							label="Name"
							placeholder="Enter notification name..."
							type="text"
							fullWidth
							variant="outlined"
							value={notification ? notification.name : ""}
							onChange={(e) => setNotification({ ...notification, name: e.target.value })}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Type"
							placeholder="Select notification type..."
							type="color"
							fullWidth
							variant="outlined"
							value={notification ? notification.type : ""}
							onChange={(e) => setNotification({ ...notification, color: e.target.value })}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{/* <ConfirmationModal action="Delete Notification" /> */}
				<Button
					style={{ position: "absolute", left: 20 }}
					onClick={() => setFormType('list')}
				>
					Edit
				</Button>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={submitForm}>Submit</Button>
			</DialogActions>
		</div>
	);
}
