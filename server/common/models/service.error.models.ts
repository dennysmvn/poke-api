export interface ServiceError {
    statusCode: number;
    data: Errors;
}

export interface Errors {
    errors: Error[];
}

export interface Error {
    code: string;
    message: string;
}
