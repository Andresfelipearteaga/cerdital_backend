import { Meta } from "./meta.interface";

export interface Progress {
    progress_id: number;
    bbatch_id: number;
    date_weight: Date;
    weekly_average_weight: number;
    mortality: number;
    user_id: number;
}

export interface ProgressResponse {
    progress: Progress[];
    meta: Meta;
}