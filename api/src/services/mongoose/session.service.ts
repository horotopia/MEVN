import {MongooseService} from "./mongoose.service";
import {Model, isValidObjectId} from "mongoose";
import {sessionSchema} from "./schema/session.schema";
import {Session} from "../../models";

export type CreateSession = Omit<Session, '_id' | 'createdAt' | 'updatedAt'>;

export class SessionService {

    readonly mongooseService: MongooseService;
    readonly model: Model<Session>;

    constructor(mongooseService: MongooseService) {
        this.mongooseService = mongooseService;
        const mongoose = this.mongooseService.mongoose; // recuperation de la connexion
        this.model = mongoose.model('Session', sessionSchema); // creation du model sur la connexion avec le schema
    }

    async createSession(session: CreateSession): Promise<Session> {
        const res = await this.model.create(session);
        return res;
    }

    async findActiveSession(id: string): Promise<Session | null> {
        if(!isValidObjectId(id)) {
            return null;
        }
        const res = await this.model.findOne({
            _id: id,
            $or: [
                {expirationDate: {$exists: false}},
                {expirationDate: {$gt: Date.now()}}
            ]
        }).populate('user'); // populate permet de charger un objet d'une autre collection
        return res;
    }

    async increaseExpirationDate(id: string): Promise<Session | null> {
        if(!isValidObjectId(id)) {
            return null;
        }
        const res = await this.model.findOneAndUpdate({
            _id: id
        }, {
            expirationDate: new Date( (new Date().getTime()) + 1_296_000_000)
        }, {
            new: true // option new -> true permet de recuperer l'objet modifié.
        }).populate('user');
        return res;
    }
}