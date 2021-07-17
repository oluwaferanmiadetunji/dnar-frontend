export const getRole = (roles, id) => {
	return id ? roles.find((x) => x.id === id).title : '';
};

export const getNormalisedOptions = (array, id) => {
	const selectedRole = array.find((x) => x.id === id);

	const otherRoles = array.filter((role) => role.id !== id);

	return { selectedRole, otherRoles };
};
