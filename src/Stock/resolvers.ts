import 'apollo-cache-control';
import jwt from 'jsonwebtoken';
import TracingStock from '@/DataBase/TracingStock';

import MarketingStockRequest from '@/Request/marketingStock/MarketingStock';
import MarketingStockHistoryRequest from '@/Request/marketingStock/MarketingStockHistory';
import MarketingStockClassifierRequest from '@/Request/marketingStock/MarketingStockClassifier';
import MarketingMonthRevenueRequest from '@/Request/marketingStock/MarketingMonthRevenue';
import MarketingStockInvestMechanism from '@/Request/marketingStock/MarketingStockInvestMechanism';
import MarketingStockCapital from '@/Request/marketingStock/MarketingStockCapital';
import CabinetStockRequest from '@/Request/cabinetStock/CabinetStock';
import CabinetStockHistorRequest from '@/Request/cabinetStock/CabinetStockHistory';
import CabinetStockClassifier from '@/Request/cabinetStock/CabinetStockClassifier';

import MarketingStockBasic from '@/Stock/MarketingStock/MarketingStockBasic';
import MarketingStockHistory from '@/Stock/MarketingStock/MarketingStockHistory';
import MarketingStockRevenue from '@/Stock/MarketingStock/MarketingStockRevenue';
import MarketingStockInvestmentMechanism from '@/Stock/MarketingStock/MarketingStockInvestmentMechanism';
import MarketingStockVolumnGroup from '@/Stock/MarketingStock/MarketingStockVolumnGroup';
import CabinetStockBasic from '@/Stock/CabinetStock/CabinetStockBasic';
import CabinetStockHistory from '@/Stock/CabinetStock/CabinetStockHistory';

const marketingStock = new MarketingStockRequest();
const marketingStockClassifier = new MarketingStockClassifierRequest();
const marketingMonthRevenue = new MarketingMonthRevenueRequest();
const marketingStockInvestMechanism = new MarketingStockInvestMechanism();
const marketingStockCapital = new MarketingStockCapital();

const cabinetStock = new CabinetStockRequest();
const cabinetStockClassifier = new CabinetStockClassifier();


const tracingStock = new TracingStock('TracingStock')

const StockResolvers = {
  Query: {
    marketStockList: async (parent: any, args: any, context: any, info: any) => {

      marketingStockClassifier.resetCache(60);
      await marketingStockClassifier.getRequest();
      marketingStockClassifier.analysisData();

      marketingStock.resetCache(60);
      await marketingStock.getRequest();
      marketingStock.analysisData();

      marketingStockCapital.resetCache(3600);
      await marketingStockCapital.getRequest();
      marketingStockCapital.analysisData();

      const marketingStockBasic = new MarketingStockBasic({
        stockBasic: marketingStock.getData(),
        stockType: marketingStockClassifier.getData(),
        stockCapital: marketingStockCapital.getData()
      });

      marketingStockBasic.arrangeData();
      marketingStockBasic.addStockType();
      marketingStockBasic.addStockCapital();

      return {
        headers: {
          date: "20211101",
        },
        data: marketingStockBasic.getData()
      };
    },
    marketStock: async (parent: any, args: any, context: any, info: any) => {

      marketingStockClassifier.resetCache(60);
      await marketingStockClassifier.getRequest();
      marketingStockClassifier.analysisData();

      marketingStock.resetCache(60);
      await marketingStock.getRequest();
      marketingStock.analysisData();

      marketingStockCapital.resetCache(3600);
      await marketingStockCapital.getRequest();
      marketingStockCapital.analysisData();

      const marketingStockBasic = new MarketingStockBasic(
        {
          stockBasic: marketingStock.getData(),
          stockType: marketingStockClassifier.getData(),
          stockCapital: marketingStockCapital.getData()
        },
        {id: [args.id]}
      );

      marketingStockBasic.arrangeData();
      marketingStockBasic.addStockType();
      marketingStockBasic.addStockCapital();
      marketingStockBasic.filterStock()

      return {
        headers: {
          date: "20211101",
        },
        data: marketingStockBasic.getData()
      };
    },
    marketStockHistory:  async (parent: any, args: any, context: any, info: any) => {

     const marketingStockHistioryRequest = new MarketingStockHistoryRequest({id: args.id});
     marketingStockHistioryRequest.resetCache(0);
     await marketingStockHistioryRequest.getRequest();
     marketingStockHistioryRequest.analysisData();

     let marketStockHistory = new MarketingStockHistory({stockHistory: marketingStockHistioryRequest.getData()});
     marketStockHistory.arrangeData();

     return {
       data: marketStockHistory.getData()
     };
    },
    marketStockMonthRevenue: async (parent: any, args: any, context: any, info: any) => {
      marketingMonthRevenue.resetCache(1440);
      await marketingMonthRevenue.getRequest();
      marketingMonthRevenue.analysisData();

      let marketingStockRevenue = new MarketingStockRevenue(
        {stockRevenue: marketingMonthRevenue.getData()},
        {id: args.id});

      marketingStockRevenue.arrangeData();
      marketingStockRevenue.filterStock();
      
      return {
        data: marketingStockRevenue.getData()
      }
    },
    marketStockInvestmentMechanism: async (parent: any, args: any, context: any, info: any) => {

      marketingStockInvestMechanism.resetCache(1440);
      await marketingStockInvestMechanism.getRequest();
      marketingStockInvestMechanism.analysisData();
      
      let arg = {
        id: ''
      };

      arg = Object.assign(arg , args);

      let marketingStockInvestmentMechanism = new MarketingStockInvestmentMechanism(
        {stockInvestmentMechanism: marketingStockInvestMechanism.getData()},
        {id: arg.id}
      );

      marketingStockInvestmentMechanism.arrangeData();

      if(arg.id !== ''){
        marketingStockInvestmentMechanism.filterStock();
      }


      return {
        data: marketingStockInvestmentMechanism.getData()
      }
    },
    tracingStock: async (parent: any , args: any, context: any , info: any) => {

      let member: any = jwt.decode(context.token.substring(7));

      const result = await tracingStock.getTracingList(member._id);
      console.log(result[0].list);
      marketingStock.resetCache(60);
      await marketingStock.getRequest();
      marketingStock.analysisData();

      const marketingStockBasic = new MarketingStockBasic({
        stockBasic: marketingStock.getData(),
        stockType: marketingStockClassifier.getData(),
        stockCapital: marketingStockCapital.getData()
      },{id: result[0].list});

      marketingStockBasic.arrangeData();
      marketingStockBasic.filterStock()

      return {data: marketingStockBasic.getData()};
    },
    marketStockVolumnRank:  async (parent: any , args: any, context: any , info: any) => {

      marketingStockClassifier.resetCache(60);
      await marketingStockClassifier.getRequest();
      marketingStockClassifier.analysisData();

      marketingStock.resetCache(60);
      await marketingStock.getRequest();
      marketingStock.analysisData();


      const marketingStockVolumnGroup = new MarketingStockVolumnGroup({
        stockBasic: marketingStock.getData(),
        stockType: marketingStockClassifier.getData(),
      });

      marketingStockVolumnGroup.arrangeData();
      marketingStockVolumnGroup.groupData();

      return {
        status:'success',
        data: marketingStockVolumnGroup.getData()
      }
    },
    cabinetStockList: async (parent: any, args: any, context: any, info: any) => {
      cabinetStock.resetCache(60);
      await cabinetStock.getRequest();
      cabinetStock.analysisData();

      cabinetStockClassifier.resetCache(60);
      await cabinetStockClassifier.getRequest();
      cabinetStockClassifier.analysisData();

      const cabinetStockBasic = new CabinetStockBasic({
        cabinetBasic: cabinetStock.getData(),
        cabinetType: cabinetStockClassifier.getData(),
      });

      cabinetStockBasic.arrangeData();
      cabinetStockBasic.addStockType();
      return {
        headers: {
          date: "20211101",
        },
        data: cabinetStockBasic.getData()
      };;
    },
    cabinetStock: async (parent: any, args: any, context: any, info: any) => {
      cabinetStock.resetCache(60);
      await cabinetStock.getRequest();
      cabinetStock.analysisData();

      const cabinetStockBasic = new CabinetStockBasic({
        cabinetBasic: cabinetStock.getData(),
      }, {id: [args.id]});

      cabinetStockBasic.arrangeData();
      cabinetStockBasic.filterStock();

      return {
        data: cabinetStockBasic.getData()
      };;
    },
    cabinetStockHistory: async (parent: any, args: any, context: any, info: any) => {
      const cabinetStockHistoryRequest = new CabinetStockHistorRequest({id: args.id});

      cabinetStockHistoryRequest.resetCache(0);
      await cabinetStockHistoryRequest.getRequest();
      cabinetStockHistoryRequest.analysisData();
 
      let cabinetStockHistory = new CabinetStockHistory({stockHistory: cabinetStockHistoryRequest.getData()});
      cabinetStockHistory.arrangeData();
 
      return {
        data: cabinetStockHistory.getData()
      };
    }
  },
};

export default StockResolvers;