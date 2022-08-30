// context/todoContext.tsx
import * as React from "react";
// Api
import {
    fetchProjects,
  } from "../utils/api";

export const ProjectContext = React.createContext("");

const ProjectProvider = ({ children }) => {
	const [modal, setModal] = React.useState(false);
	const [formType, setFormType] = React.useState('');
	const [projects, setProjects] = React.useState([]);
    const [project, setProject] = React.useState({
        name: '',
        color: ''
    });

	const handleClickOpen = (project = null) => {
		setModal(true);
        if (project === null) {
            setFormType('add');
        } else {
            setFormType('update');
        }
	};

	const handleClose = () => {
		setFormType("");
		setSelectedEvent(null);
		setModal(false);
	};

    const submitForm = () => {
		console.log(project)
	};

    const init = async () => {
        try {
          const items = await fetchProjects(null, {headers: {"Authorization": `Bearer ${token}`}});
          console.log("init: ", items);
          setEvents(items);
        } catch (e) {
          // alert(e);
          console.log(e)
        }
    };

    React.useEffect(() => {
        init();
    }, [])

	return (
		<ProjectContext.Provider
			value={{
				modal,
                project,
				projects,
                setProject,
				formType,
                setFormType,
				handleClickOpen,
                handleClose,
                submitForm,
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
