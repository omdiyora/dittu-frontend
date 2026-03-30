
export type AssessmentFrameworkNewField = {
    category_id? :string;
    subcategory_id? : string;
    question_no?: string;
    question?: string;
    guidance_text?: string;
    answer_type_id?: string;
    question_logic?: string;
    answer?: string;
    assessor_score?: string;
    assessor_notes?: string;
    createdby?: string;
    assessment_id?: string;
}

export type AssessmentFramework = {
    id?: string;
    assessment_name: string;
    assessment_description: string,
    assessment_version: number,
    accreditation_body: string,
    assessment_db_table: string,
    // assessment_framework_fields : AssessmentFrameworkNewField[]
} 

export type AssessmentFrameworkResponse = {
    data: AssessmentFramework[]
  }

