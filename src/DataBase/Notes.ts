
import DataBaseAbstract from '@/DataBase/DataBaseAbstract';
import {ObjectId} from 'mongodb';

class Notes extends DataBaseAbstract
{
  public async createNote(stockId: string , memberId: string, content: string)
  {
    const collection = await this.connect();
    return await collection.insertOne({
      stockId,
      memberId,
      content,
    });
  }

  public async findNote(stockId: string , memberId: string) {
    const collection = await this.connect();
    const cursor = await collection.find({stockId, memberId});
    return await cursor.toArray();
  }

  public async updateNote(noteId: string, content: string) {
    const collection = await this.connect();
    const filter = {_id:new ObjectId(noteId)};
    const updateDoc = {
      $set: {
        content
      },
    };

    return await collection.updateOne(filter, updateDoc);
  }

  public async deleteNote(noteId: string) {
    
    const collection = await this.connect();
    return await collection.deleteOne({_id:new ObjectId(noteId)});
  }
}

export default Notes;