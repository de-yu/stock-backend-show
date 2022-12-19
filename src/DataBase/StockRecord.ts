import DataBaseAbstract from '@/DataBase/DataBaseAbstract';
import {ObjectId} from 'mongodb';

class StockRecord extends DataBaseAbstract
{
  public async createRecord(memberId: string) {

    const collection = await this.connect();
    return await collection.insertOne({
      memberId,
      content: "{}",
    });
  }

  public async updateRecord(memberId: string, content: string) {
    const collection = await this.connect();
    const filter = {memberId: memberId};
    const updateDoc = {
      $set: {
        content
      },
    };

    return await collection.updateOne(filter, updateDoc);
  }

  public async getRecord(memberId: string) {
    const collection = await this.connect();
    const cursor = await collection.find({memberId});
    return await cursor.toArray();
  }
}

export default StockRecord;