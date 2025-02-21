export interface Batch {
    id: number;
    batch_name: string;
    pig_registered: number;
    current_pig: number;
    race: string;
    average_weight: number;
    mortality: number;
    date_created: string;
}

export interface Meta {
    status: number;
    message: string;
}

export interface BatchResponse {
    batch: Batch[];
    meta: Meta;
}