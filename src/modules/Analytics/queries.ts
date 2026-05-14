export const getDashboardStatusData = (values: any) => {
    return {
        body: JSON.stringify({ ...values, endpointUrlPath: '/grc/dashboard/end-user/assessment-status', methodName: "POST", }),
    };
}

export const getDashboardCompliancePie = (values: any) => {
    return {
        body: JSON.stringify({ ...values, endpointUrlPath: '/grc/dashboard/end-user/compliance-pie', methodName: "POST", }),
    };
}

export const getDashboardComplianceOverview = (values: any) => {
    return {
        body: JSON.stringify({ ...values, endpointUrlPath: '/grc/dashboard/end-user/compliance-overview', methodName: "POST", }),
    };
}