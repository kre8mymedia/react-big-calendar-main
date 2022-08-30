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

import { useProjectContext } from "../../../contexts/ProjectContext";

export default function AddProjectForm() {
	const {
		submitForm,
		handleClose,
		project,
		setProject
	  } = useProjectContext();

	return (
		<div>
			<DialogTitle>Create Project</DialogTitle>
			<DialogContent>
				<DialogContentText>
				This modal is used for creating new calendar events.
				</DialogContentText>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							autoFocus
							id="name"
							label="Name"
							placeholder="Enter project name..."
							type="text"
							fullWidth
							variant="outlined"
							value={project.name || ""}
							onChange={(e) => setProject({ name: e.target.value, color: project.color })}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							type="text"
							label="Color"
							placeholder="Enter project color..."
							value={project.color || ""}
							onChange={(e) => setProject({ color: e.target.value, name: project.name })}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={submitForm}>Submit</Button>
			</DialogActions>
		</div>
	);
}
