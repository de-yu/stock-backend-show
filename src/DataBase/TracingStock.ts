import DataBaseAbstract from '@/DataBase/DataBaseAbstract';
import {ObjectId} from 'mongodb';

class TracingStock extends DataBaseAbstract {


  public async createTracing(memberID: string) {
    const collection = await this.connect();
    return await collection.insertOne({
      memberID,
      list: []
    });
  } 

  public async updateTracing(memberID: string, list: string[]) {
    const collection = await this.connect();
    const filter = {memberID:new ObjectId(memberID)};
    const updateDoc = {
      $set: {
        list
      },
    };

    return await collection.updateOne(filter, updateDoc);
  }

  public async getTracingList(memberID: string) {
    const collection = await this.connect();
    const cursor = await collection.find({memberID: new ObjectId(memberID)});
    return await cursor.toArray();
  }
}

export default TracingStock;