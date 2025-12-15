export async function $fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers as Record<string, string>),
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data: T = await response.json();

    return data;
}

export async function $fetchWithHeaders<T>(
    url: string,
    options?: RequestInit,
): Promise<{ data: T; totalCount: number | null }> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers as Record<string, string>),
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const totalCount = response.headers.get("X-Total-Count");
    const data: T = await response.json();

    return {
        data,
        totalCount: totalCount ? parseInt(totalCount || "0", 10) : null,
    };
}
