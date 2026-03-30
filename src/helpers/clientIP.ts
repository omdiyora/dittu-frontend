export const getClientIP = async () => {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data?.ip;
};

export function diffData(prev: Record<string, any>, curr: Record<string, any>) {
  const changedFields: string[] = [];
  const prevValues: any[] = [];
  const newValues: any[] = [];

  const normalize = (val: any) => {
    if (val === undefined || val === null || val === '') return null;
    if (typeof val === 'string' && !isNaN(Number(val))) return Number(val); // convert numeric strings to numbers
    return val;
  };

  for (const key of Object.keys(curr)) {
    const prevValNorm = normalize(prev[key]);
    const currValNorm = normalize(curr[key]);

    if (JSON.stringify(prevValNorm) !== JSON.stringify(currValNorm)) {
      changedFields.push(key);
      prevValues.push(prev[key]); // keep original for audit
      newValues.push(curr[key]);
    }
  }

  return { changedFields, prevValues, newValues };
}

export function diffDatas(
  prev: Record<string, any> = {},
  curr: Record<string, any> = {}
) {
  const changes: { field_name: string; new_data: any; previous_data: any }[] = [];

  const normalize = (val: any) => {
    if (val === undefined || val === null || val === '') return null;
    if (typeof val === 'string' && !isNaN(Number(val))) return Number(val);
    return val;
  };

  for (const key of Object.keys(curr)) {
    const prevValNorm = normalize(prev[key]);
    const currValNorm = normalize(curr[key]);

    if (JSON.stringify(prevValNorm) !== JSON.stringify(currValNorm)) {
      changes.push({
        field_name: key,
        new_data: curr[key],
        previous_data: prev[key] ?? null
      });
    }
  }

  return changes;
}




export const getBrowserName = () => {
  // @ts-ignore
  if (navigator.userAgentData) {
    // @ts-ignore
    return navigator.userAgentData.brands
      .map((b: any) => b.brand)
      .find((brand: any) =>
        /Chrome|Safari|Brave|Edge|Firefox/i.test(brand)
      ) || 'Unknown';
  }
  return parseUserAgent(navigator.userAgent);
};

export const parseUserAgent = (ua: string): string => {
  if (/Brave/i.test(ua)) return 'Brave';
  if (/Edg/i.test(ua)) return 'Edge';
  if (/OPR|Opera/i.test(ua)) return 'Opera';
  if (/Chrome/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  return 'Unknown';
};