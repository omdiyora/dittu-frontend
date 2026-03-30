export type AnswerType = {
  id: string;
  answer_type: string;
  description: string;
};

export type AnswerTypeResponse = {
  data: AnswerType[];
};

export type CategoryType = {
  id: string;
  category: string;
  description: string;
};
export type CategoryResponse = {
  messahe: string;
  data: CategoryType[];
};
export type SubCategory = {
  id: string;
  sub_category: string;
  category_id: string;
  description: string;
};
export type SubCategoryResponse = {
  message: string;
  data: SubCategory[];
};


export type AssessmentFramework = {
  id: string;
  assessment_name: string;
  assessment_description: string | null;
  assessment_version: string | null;
  accreditation_body: string | null;
  assessment_db_table: string | null
};

export type AssessmentFrameworkResponse = {
  data: AssessmentFramework[] | null
}