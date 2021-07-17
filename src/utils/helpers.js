export const getRole = (roles, id) => {
	return id ? roles.find((x) => x.id === id).title : '';
};

export const getNormalisedOptions = (array, id) => {
	const selectedRole = array.find((x) => x.id === id);

	const otherRoles = array.filter((role) => role.id !== id);

	return { selectedRole, otherRoles };
};

export const getProject = (projects, id) => {
	return id ? projects.find((x) => x.id === id) : '';
};

export const getUnAssignedProjects = (projects, assignedProjects) => {
	return projects.filter((project) => !assignedProjects.find((assigned) => assigned.project_id === project.id));
};
