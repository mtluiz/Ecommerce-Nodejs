import { ObjectId } from "mongodb";

export interface MongoFindOneAccount {
  _id: ObjectId,
  name: string,
  email: string,
  password: string
}