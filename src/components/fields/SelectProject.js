import React from 'react';
import {
    MenuItem,
    Select,
    Chip,
    Grid
} from "@material-ui/core";

import { useProjectContext } from "../../contexts/ProjectContext";
import { useEventContext } from "../../contexts/EventContext";

export default function SelectProject(props) {
    const {
        project,
		projects,
        setProject
	} = useProjectContext();
    const {
        selectedEvent
	} = useEventContext();

    const handleChange = (event) => {
        setProject(event.target.value);
        console.log('SelectProject.handleChange: ', event.target.value);
    };

    React.useEffect(() => {
        setProject(selectedEvent ? selectedEvent.project : null);
    }, [])

  return (
    <>
        <Select
            fullWidth
            displayEmpty
            disabled={props.disabled}
            label="Project"
            variant="outlined"
            value={project || {}}
            onChange={handleChange}
            renderValue={() => {
                if (
                    project === "" || 
                    project === null
                ) {
                    return <em>Select Project</em>
                } else {
                    return <em>{project.name}</em>
                }
                
            }}
        >
            <MenuItem value={null}>
                <em>None</em>
            </MenuItem>
            {projects.map((project) => (
                <MenuItem
                    key={project._id}
                    value={project}
                >
                    <Grid container>
                        <Grid item xs={10}>
                            {project.name}
                        </Grid>
                        <Grid item xs={2}>
                            <Chip 
                                label={`${project.color}`} 
                                style={{ 
                                    backgroundColor: `${project.color}`, 
                                    color: "white"
                                }}
                            />
                        </Grid>
                    </Grid>
                </MenuItem>
            ))}
        </Select>
    </>
  );
}