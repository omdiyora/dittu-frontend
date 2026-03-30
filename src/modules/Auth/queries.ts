import {
  userChangePram,
  userForgetPram,
  userLoginQueryParam,
  userResetPasswordvalues,
} from "./interfaces";

export const userLoginQuery = (payload: userLoginQueryParam) => {
  return {
    body: JSON.stringify({
      ...payload,
      endpointUrlPath: "/grc/login",
      methodName: "POST",
    }),
  };
};

export const userForgetPasswordQuery = (payload: userForgetPram) => {
  return {
    body: JSON.stringify({
      ...payload,
      endpointUrlPath: "/grc/login/forget-password",
      methodName: "POST",
    }),
  };
};

export const userResetPasswordQuery = (
  payload: userResetPasswordvalues,
  params: string
) => {
  return {
    body: JSON.stringify({
      ...payload,
      endpointUrlPath: `/grc/login/reset-password${params}`,
      methodName: "POST",
    }),
  };
};

export const userChangePasswordQuery = (payload: userChangePram) => {
  return {
    body: JSON.stringify({
      ...payload,
      endpointUrlPath: "/grc/login/change-password",
      methodName: "POST",
    }),
  };
};

export const createUserResetPassword = (payload: userResetPasswordvalues) => {
  return {
    body: JSON.stringify({
      ...payload,
      endpointUrlPath: `/grc/login/user-reset-password`,
      methodName: "POST",
    }),
  };
};
