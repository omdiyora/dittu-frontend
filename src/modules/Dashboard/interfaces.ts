export type Organization = {
    organisation_name: string;
    logo_mark: string;
    organisation_size_id: string;
    first_line_address: string;
    second_line_address: string;
    contact_number: string;
    contact_name: string;
    billing_name: string;
    billing_contact: string;
    billing_address: string;
    vat_number: string;
    description: string;
};

export type OrganizationTypeResponse = {
    data: Organization[];
  };

  export type OrganizationSize = {
    id: string;
    organisation_size: string,
    description: string
};

export type OrganizationSizeTypeResponse = {
    data: OrganizationSize[];
  };