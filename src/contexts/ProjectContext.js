// context/todoContext.tsx
import * as React from "react";
// Api
import { fetchProjects, createProject, deleteProject } from "../utils/api";
// Context
import { useAuthContext } from "./AuthContext";

export const ProjectContext = React.createContext("");

const ProjectProvider = ({ children }) => {
    const { token } = useAuthContext();
	const [modal, setModal] = React.useState(false);
	const [formType, setFormType] = React.useState("");
	const [projects, setProjects] = React.useState([]);
	const [project, setProject] = React.useState({
		_id: '',
		name: "",
		color: "",
	});

	const handleClickOpen = (project = null) => {
		setModal(true);
		if (project === null) {
			setFormType("add");
		} else {
			setFormType("update");
		}
	};

	const handleClose = () => {
		setFormType("");
		setProject({
			_id: "",
            name: "",
            color: "",
        });
		setModal(false);
	};

	const submitForm = async () => {
		console.log("ProjectContext.submitForm: ", project);
        try {
            const project = await saveProject();
            return project;
        } catch(e) {
            throw new Error(e);
        }
		
	};

	const saveProject = async () => {
		try {
            const newProject = await createProject(
                project,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (newProject.success) {
                init();
                handleClose();
            }
            return newProject;
        } catch(e) {
            throw new Error(e);
        }
	};

	const removeProject = async (id) => {
		try {
			const newEvent = await deleteProject(id, {headers: {"Authorization": `Bearer ${token}`}});
			if (newEvent.success) {
				handleClose();
				init();
			}
			return newEvent;
		} catch(e) {
			throw new Error(e);
		}
	};

	const init = async () => {
		try {
			const items = await fetchProjects(null, {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}});
			console.log("ProjectContext.init: ", items);
			setProjects(items.projects);
		} catch (e) {
			throw new Error(e);
		}
	};

	React.useEffect(() => {
		init();
	}, []);

	return (
		<ProjectContext.Provider
			value={{
				modal,
				formType,
				setFormType,
                projects,
                project,
				setProject,
				handleClickOpen,
				handleClose,
				submitForm,
                saveProject,
				removeProject,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export default ProjectProvider;

export function useProjectContext() {
	return React.useContext(ProjectContext);
}
