// Makes an immutable copy of any object property set passed
export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	}
}
