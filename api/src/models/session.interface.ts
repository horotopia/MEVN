import { model } from "mongoose";
import {Timestamps} from "./timestamps.interface";
import {User} from "./user.interface";
import { sessionSchema } from "../services/mongoose";

export interface Session extends Timestamps {
    _id: string;
    expirationDate?: Date;
    userAgent: string;
    user: string | User; // soit l'id du user soit l'objet User
}

export const SessionModel = model<Session>('Session', sessionSchema);