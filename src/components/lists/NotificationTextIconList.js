import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Notifications from '@material-ui/icons/Notifications';
import Email from '@material-ui/icons/Email';
import { BsSlack } from "react-icons/bs";

import {
    Box,
    Grid,
    List,
    Button,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import ConfirmationModal from '../modals/ConfirmationModal';
import { useNotificationContext } from "../../contexts/NotificationContext";

export default function NotificationTextIconList() {
    const {
		notifications,
        setFormType,
        removeNotification,
    } = useNotificationContext();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <DialogTitle>Notification List</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {notifications.length > 0 ? (
                            <List dense={true}>
                                <Box sx={{ maxHeight: "400px" }}>
                                    {notifications.map((notification) => (
                                        <ListItem
                                            style={{ border: "solid 1px black", borderRadius: "10px", margin: "1px" }}
                                            key={notification._id}
                                        >
                                            <ListItemAvatar>
                                                
                                                    {notification.type === 'email' ? (
                                                        <Avatar style={{ backgroundColor: `#021D7C` }}>
                                                            <Email style={{ fill: `white` }} />
                                                        </Avatar>
                                                    ) : null}
                                                    {notification.type === 'slack' ? (
                                                        <Avatar style={{ backgroundColor: `#4A154B` }}>
                                                            <BsSlack style={{ fill: `white` }} />
                                                        </Avatar>
                                                    ) : null}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={notification.name}
                                            />
                                            <ConfirmationModal action="Delete Notification" handleSub={()=>removeNotification(notification._id)} />
                                        </ListItem>
                                    ))}
                                </Box>
                            </List>
                        ) : (
                            <p>There are currently no notifications..</p>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setFormType('add')}>Cancel</Button>
            </DialogActions>
        </Box>
    );
}
