export declare const axios: {
    get(url: string, config?: any): Promise<{
        data: any;
        status: number;
        statusText: string;
        headers: Headers;
        config: any;
    }>;
    post(url: string, data?: {}, config?: any): Promise<{
        data: any;
        status: number;
        statusText: string;
        headers: Headers;
        config: any;
    }>;
};
