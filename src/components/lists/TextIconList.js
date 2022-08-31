import * as React from 'react';
// import { styled } from '@mui/material/styles';
import FolderIcon from '@material-ui/icons/Folder';

import {
    Box,
    Grid,
    List,
    Button,
    Avatar,
    ListItem,
    IconButton,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import ConfirmationModal from '../modals/ConfirmationModal';
import { useProjectContext } from "../../contexts/ProjectContext";

export default function TextIconList() {
    const {
		projects,
        handleClose,
        setFormType,
        removeProject,
    } = useProjectContext();
    const [dense, setDense] = React.useState(true);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <DialogTitle>Project List</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <List dense={dense}>
                            <Box sx={{ maxHeight: "400px" }}>
                                {projects.map((project) => (
                                    <ListItem
                                        style={{ border: "solid 1px black", borderRadius: "10px", margin: "1px" }}
                                        key={project._id}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon style={{ backgroundColor: `${project.color}` }} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={project.name}
                                        />
                                        <ConfirmationModal action="Delete Project" handleSub={()=>removeProject(project._id)} />
                                    </ListItem>
                                ))}
                            </Box>
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setFormType('add')}>Cancel</Button>
                {/* <Button>Submit</Button> */}
            </DialogActions>
        </Box>
    );
}
