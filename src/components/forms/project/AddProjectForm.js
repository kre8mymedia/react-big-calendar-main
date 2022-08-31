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
		setProject,
		setFormType,
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
							id="name"
							label="Color"
							placeholder="Enter project color..."
							type="color"
							fullWidth
							variant="outlined"
							value={project.color || ""}
							onChange={(e) => setProject({ name: project.name, color: e.target.value })}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{/* <ConfirmationModal action="Delete Project" /> */}
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
