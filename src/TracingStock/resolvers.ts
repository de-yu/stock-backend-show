import 'apollo-cache-control';
import jwt from 'jsonwebtoken';
import Member from '@/DataBase/Member';
import _ from 'lodash';
import TracingStock from '@/DataBase/TracingStock';

const member = new Member('Member');
const tracingStock = new TracingStock('TracingStock')

const tracingStockResolver = {
  Query: {
   tracingStockId: async (parent: any , args: any, context: any , info: any) => {
    let member: any = jwt.decode(context.token.substring(7));
    const result = await tracingStock.getTracingList(member._id);

    return result[0].list;
   }
  },
  Mutation: {
    // 已存在 則刪除
    // 不存在 則新增
    updateTracingStock: async (parent: any , args: any, context: any , info: any) => {

      let member: any = jwt.decode(context.token.substring(7));
      const result = await tracingStock.getTracingList(member._id);
      console.log(result[0].list, [args.id]);
      console.log(_.xor(result[0].list,[args.id]));
      const updateResult = await tracingStock.updateTracing(member._id , _.xor(result[0].list,[args.id]));
      return true; 
    },
  }
};

export default tracingStockResolver;