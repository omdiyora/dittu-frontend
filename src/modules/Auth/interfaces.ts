export type userLoginQueryParam = {
  identifier: string;
  password: string;
  user_agent: string;
  ip_address?: string;
};
export type userForgetPram = {
  email: string;
};

export type userResetPasswordvalues = {
  password: string;
};
export type userChangePram = {
  email: string | undefined;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  organisation_id: number | null;
  client_organization_id: string;
  assessment_framework_id: any;
  role_id: number;
  createdon: Date;
  createdby: number;
  updatedon: null;
  updatedby: null;
  passwordtoken: null;
  role: string;
  module_role_id: any;
  wishlist: any;
};
