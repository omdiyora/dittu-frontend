import { AssessmentFramework } from "./interfaces";

export const addAssessmentFrameworkData = (params: AssessmentFramework) => {
	const query = {
		...params,
		endpointUrlPath: `/grc/assessment-framework`,
		methodName: "POST",
	};
	return {
		body: JSON.stringify(query),
	};
}

export const getAllAssessmentFramework = (id?: number) => {
	const query = {
		endpointUrlPath: `/grc/assessment-framework?userId=${id}`,
		methodName: "GET",
	};
	return {
		body: JSON.stringify(query),
	};
};

export const updateAssessmentFrameworkData = (params: AssessmentFramework) => {
	const query = {
		...params,
		endpointUrlPath: `/grc/assessment-framework/${params?.id}`,
		methodName: "PUT",
	};
	return {
		body: JSON.stringify(query),
	};
}

export const deleteAssessmentFrameworkData = (id: string) => {
	const query = {
		endpointUrlPath: `/grc/assessment-framework/${id}`,
		methodName: "DELETE",
	};
	return {
		body: JSON.stringify(query),
	};
}