export const createReport = (values: any) => {
  return {
    body: JSON.stringify({
      ...values,
      endpointUrlPath: "/api/reports",
      methodName: "POST",
    }),
  };
};

export const getReport = () => {
  const query = {
    endpointUrlPath: "/api/reports",
    methodName: "GET",
  };
  return {
    body: JSON.stringify(query),
  };
};

export const getSingleReport = (id?: number) => {
  const query = {
    endpointUrlPath: `/api/reports/${id}`,
    methodName: "GET",
  };
  return {
    body: JSON.stringify(query),
  };
};

export const updateReport = (params: any) => {
  const query = {
    ...params,
    endpointUrlPath: `/api/reports/${params?.fno}`,
    methodName: "PUT",
  };
  return {
    body: JSON.stringify(query),
  };
};

export const deleteReport = (id: string) => {
  const query = {
    endpointUrlPath: `/api/reports/${id}`,
    methodName: "DELETE",
  };
  return {
    body: JSON.stringify(query),
  };
};

export const createContact = (values: any) => {
  return {
    body: JSON.stringify({
      ...values,
      endpointUrlPath: "/api/contacts",
      methodName: "POST",
    }),
  };
};

export const getContact = () => {
  const query = {
    endpointUrlPath: "/api/contacts",
    methodName: "GET",
  };
  return {
    body: JSON.stringify(query),
  };
};

export const createUser = (values: any) => {
  return {
    body: JSON.stringify({
      ...values,
      endpointUrlPath: "/api/users",
      methodName: "POST",
    }),
  };
};

export const getUser = () => {
  const query = {
    endpointUrlPath: "/api/users",
    methodName: "GET",
  };
  return {
    body: JSON.stringify(query),
  };
};
