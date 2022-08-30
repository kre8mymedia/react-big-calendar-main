import React from 'react';
import {
    MenuItem,
    Select,
    Chip
} from "@material-ui/core";

import { useProjectContext } from "../../contexts/ProjectContext";

export default function SelectProject() {
    const {
        project,
		projects,
        setProject
	} = useProjectContext();

    const handleChange = (event) => {
        setProject(event.target.value);
        console.log('SelectProject.handleChange: ', event.target.value);
    };

  return (
    <>
        <Select
            fullWidth
            displayEmpty
            label="Project"
            variant="outlined"
            value={project}
            onChange={handleChange}
            renderValue={() => {
                if (project._id === "" || project === "") {
                    return <em>Select Project</em>
                } else {
                    return <em>{project.name}</em>
                }
                
            }}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {projects.map((project) => (
                <MenuItem
                    key={project._id}
                    value={project}
                    style={{ 
                        backgroundColor: `${project.color}`,
                        color: 'white'
                    }}
                >
                    {project.name}
                </MenuItem>
            ))}
        </Select>
    </>
  );
}