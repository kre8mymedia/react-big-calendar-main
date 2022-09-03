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
import SimpleSelect from "../../fields/SimpleSelect";

import { useNotificationContext } from "../../../contexts/NotificationContext";

export default function AddNotificationForm() {
	const {
		submitForm,
		handleClose,
		notification,
		setNotification,
		setFormType,
	  } = useNotificationContext();

    const [item, setItem] = React.useState('');

    function whichForm(type) {
        if (type === 'email') {
            return (
                <TextField
                    required
                    autoFocus
                    label="Email"
                    placeholder="Enter recipient email..."
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={notification ? notification.hook : ""}
                    onChange={(e) => setNotification({ ...notification, hook: e.target.value })}
                />
            );
        }
    
        if (type === 'slack') {
            return (
                <TextField
                    required
                    autoFocus
                    label="Slack Webhook Url"
                    placeholder="Enter slack webhook url..."
                    type="url"
                    fullWidth
                    variant="outlined"
                    value={notification ? notification.hook : ""}
                    onChange={(e) => setNotification({ ...notification, hook: e.target.value })}
                />
            );
        }
    }

    React.useEffect(() => {
        setNotification({ ...notification, type: item })
    }, [item])

	return (
		<div>
			<DialogTitle>Add Alert</DialogTitle>
			<DialogContent>
				<DialogContentText>
				This modal is used for creating new notifications.
				</DialogContentText>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
                            required
							autoFocus
							label="Name"
							placeholder="Enter alert name..."
							type="text"
							fullWidth
							variant="outlined"
							value={notification ? notification.name : ""}
							onChange={(e) => setNotification({ ...notification, name: e.target.value })}
						/>
					</Grid>
					<Grid item xs={12}>
                        <SimpleSelect 
                            required
                            label="Type" 
                            item={item}
                            setItem={setItem}
                            items={[
                                {
                                    key: 'email',
                                    name: 'Email'
                                },
                                {
                                    key: 'slack',
                                    name: 'Slack'
                                },
                            ]}
                        />
					</Grid>
                    {item != '' ? (
                        <Grid item xs={12}>
                            {whichForm(item)}
                        </Grid>
                    ) : null}
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
