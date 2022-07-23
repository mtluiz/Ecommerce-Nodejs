import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongodb-helper";
import { MongoFindOneAccount } from "../protocols/mongo-find-one-account";

export default class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts")
    const saveAccount = await accountCollection.insertOne(accountData)
    const { _id, ...acc }: MongoFindOneAccount = await accountCollection.findOne<MongoFindOneAccount>({ _id: saveAccount.insertedId }) as MongoFindOneAccount
    return {
      id: _id.toString(),
      name: acc.name,
      email: acc.email,
      password: acc.password
    }
  }
}