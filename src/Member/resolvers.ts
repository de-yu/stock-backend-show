
import 'apollo-cache-control';
import jwt from 'jsonwebtoken';
import Member from '@/DataBase/Member';
import TracingStock from '@/DataBase/TracingStock';

const member = new Member('Member');
const tracingStock = new TracingStock('TracingStock')

const MemberResolvers = {
  Query: {
    login: async (parent: any , args: any, context: any , info: any) => {
      const response = {
        status: Status.Success,
        code: StatusCode.Success,
        data: ''
      }
      try {
        const result = await member.comparsionAccount(args.data.account , args.data.password);
        if(result.length === 1) {
          response.data = jwt.sign(result[0],'privatekey');
        }else {
          throw 'Member not exist';
        }
      }catch(err) {
        response.status = Status.Error;
        response.code = StatusCode.Error;
      }

      return response;
    },
    verify: async (parent: any , args: any, context: any , info: any) => {

      const response = {
        status: Status.Success,
        code: StatusCode.Success,
        data: {
          account: '',
          authority: 0
        }
      };

      try {
        let decoded: any = jwt.verify(context.token.substring(7), 'privatekey');
        response.data = decoded;
      } catch(err) {
        response.status = Status.Error;
        response.code = StatusCode.Error;
      }

      return response;
    },
  },
  Mutation: {
    register: async (parent: any , args: any, context: any , info: any) => {
      const response = {
        status: Status.Success,
        code: StatusCode.Success,
        data: ''
      }
      const findResult = await member.findAccount(args.data.account);
      console.log(findResult);
      if(findResult.length > 0)
      {
        response.status = Status.Error;
        response.code = StatusCode.repeatRegister;
      }else {
        const memberResult = await member.register(args.data.account , args.data.password);
        const tracingStockResult =  await tracingStock.createTracing(memberResult.ops[0]._id);
        // console.log(tracingStockResult);
      }

      return response;
    },
  }
};

export default MemberResolvers;