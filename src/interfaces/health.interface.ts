export interface Health {
    id: number;
    batch_id: string;
    disease: string;
    treatment: string;
    date_created: string;
}

export interface Meta {
    status: number;
    message: string;
}

export interface HealthResponse {
    health: Health[];
    meta: Meta;
}