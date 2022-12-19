import {MongoClient} from 'mongodb';

abstract class DataBaseAbstract {

  private client: any;
  private sheet: string;

  // 宣告時 提供資料表名稱
  public constructor(sheetName: string)
  {
    // 移除資料庫連線
    this.client = new MongoClient("");

    this.sheet = sheetName;
  }

  public async connect() {
    await this.client.connect();
    const database = this.client.db("single-stock");
    const collection = database.collection(this.sheet);

    return collection;
  }

  public close() {
    this.client.close();
  }
}

export default DataBaseAbstract;