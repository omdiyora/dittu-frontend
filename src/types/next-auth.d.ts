import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      organisation_id: number | null;
      assessment_framework_id: any;
      role_id: number;
      createdon: Date;
      createdby: number;
      updatedon: null;
      updatedby: null;
      passwordtoken: null;
      role: string;
      client_organization_id: any;
      module_role_id: any;
      audit_role_id: any;
      risk_role_id: any;
      incident_role_id: any;
      grc_user_status: any;
      grc_client_organization_id: any;
      client_organization_name: any;
      user_activity: any;
      account_status: any;
    };
  }
}
