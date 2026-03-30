export const fetcher = async (body: RequestInit) => {
    // @ts-ignore
    const url = process.env.APPSETTING_NEXTAUTH_URL || process.env.NEXT_PUBLIC_HOST || process.env.APPSETTING_NEXT_PUBLIC_HOST
    const res = await fetch(`${url}/api`, body);
    return await res.json()
}