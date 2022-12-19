import DataBaseAbstract from '@/DataBase/DataBaseAbstract';
import {ObjectId} from 'mongodb';

class Member extends DataBaseAbstract {

  public async register(account: string , password: string) {

    const collection = await this.connect();
    return await collection.insertOne({
      account,
      password,
      authority: 2
    });
  }

  public async comparsionAccount(account: string, password: string) {
    const collection = await this.connect();
    const cursor = await collection.find({account, password});
    return await cursor.toArray();
  }

  public async findAccount (account: string) {
    const collection = await this.connect();
    const cursor = await collection.find({account});
    return await cursor.toArray();
  }

  public async authority(id: string) {
    const collection = await this.connect();
    await collection.find({_id:new ObjectId(id)});
    return await collection.toArray();
  }
}

export default Member;