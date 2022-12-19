import 'apollo-cache-control';
import jwt from 'jsonwebtoken';
import Member from '@/DataBase/Member';
import _ from 'lodash';
import StockRecord from '@/DataBase/StockRecord';

const member = new Member('Member');
const stockRecord = new StockRecord('StockRecord')

const StockRecordResolver = {
  Query: {
   record: async (parent: any , args: any, context: any , info: any) => {
    let member: any = jwt.decode(context.token.substring(7));
    const result = await stockRecord.getRecord(member._id);
    return JSON.parse(result[0].content);
   }
  },
  Mutation: {
    updateRecord: async (parent: any , args: any, context: any , info: any) => {

      let member: any = jwt.decode(context.token.substring(7));
      const result = await stockRecord.updateRecord(member._id, args.content);
      return true; 
    },
  }
};

export default StockRecordResolver;