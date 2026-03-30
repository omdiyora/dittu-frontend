import { number, object, string } from "yup";

const validationSchema = () => {
	return object().shape({
		assessment_name : string().required("Assessment name Is Required "),
		assessment_description: string().required("Description Is Required"),
		assessment_version : number().required("version Is Required"),
		accreditation_body: string().required("Accreditation body Is Required"),
		assessment_db_table : string().required("Accreditation Table Is Required")
	});
};

export default validationSchema;
