import 'apollo-cache-control';
import MarketDealRequest from '@/Request/marketing/MarketDeal';
import MarketingHistoryRequest from '@/Request/marketing/MarketingHistory';
import MarketRiseFallRequest from '@/Request/marketing/MarketRiseFall';
import MarketStatisticsRequest from '@/Request/marketing/MarketStatistics';
import MarketInvestMechanismRequest from '@/Request/marketing/MarketInvestMechanism';
import MarketDayTradingRequest from '@/Request/marketing/MarketDayTrading';

import MarketDeal from '@/Marketing/marketing/MarketDeal';
import MarketHistory from '@/Marketing/marketing/MarketHistory';
import MarketPrice from '@/Marketing/marketing/MarketPrice';
import MarketRiseFall from '@/Marketing/marketing/MarketRiseFall';
import MarketStatistics from '@/Marketing/marketing/MarketStatistics';
import MarketInvestmentMechanism from '@/Marketing/marketing/MarketInvestmentMechanism';
import MarketDayTrading from '@/Marketing/marketing/MarketDayTrading';

const marketDealRequest = new MarketDealRequest();
const marketHistoryRequest = new MarketingHistoryRequest();
const marketRiseFallRequest = new MarketRiseFallRequest();
const marketStatisticsRequest = new MarketStatisticsRequest();
const marketInvestMechanismRequest = new MarketInvestMechanismRequest();
const marketDayTradingRequest = new MarketDayTradingRequest();

const MarketingResolvers = {
  Query: {
    marketData: async (parent: any, args: any, context: any, info: any) => {
      
      marketDealRequest.resetCache(60);
      await marketDealRequest.getRequest();
      marketDealRequest.analysisData();

      marketHistoryRequest.resetCache(60);
      await marketHistoryRequest.getRequest();
      marketHistoryRequest.analysisData();

      marketRiseFallRequest.resetCache(60);
      await marketRiseFallRequest.getRequest();
      marketRiseFallRequest.analysisData();

      marketStatisticsRequest.resetCache(60);
      await marketStatisticsRequest.getRequest();
      marketStatisticsRequest.analysisData();

      const marketDeal = new MarketDeal({marketDeal: marketDealRequest.getData()});
      const marketHistory = new MarketHistory({marketHistory: marketHistoryRequest.getData()});
      const marketPrice = new MarketPrice({marketHistory: marketHistoryRequest.getData()});
      const marketRiseFall = new MarketRiseFall({marketRiseFall: marketRiseFallRequest.getData()});
      const marketStatistics = new MarketStatistics({marketStatistics: marketStatisticsRequest.getData()});
      
      marketDeal.arrangeData();
      marketHistory.arrangeData();
      marketPrice.arrangeData();
      marketRiseFall.arrangeData();
      marketStatistics.arrangeData();
       return {
        MarketPrice: marketPrice.getData(),
        MarketDeal: marketDeal.getData(),
        MarketHistory: marketHistory.getData(),
        MarketRiseFall:marketRiseFall.getData(),
        MarketStatistic: marketStatistics.getData()
     }
    },
    marketInvestmentMechanism: async (parent: any, args: any, context: any, info: any) => {

      marketInvestMechanismRequest.resetCache(60);
      await marketInvestMechanismRequest.getRequest();
      marketInvestMechanismRequest.analysisData()

      const marketInvestmentMechanism = new MarketInvestmentMechanism({marketInvestmentMechanism: marketInvestMechanismRequest.getData()});
      marketInvestmentMechanism.arrangeData();
      
      return {
        data: marketInvestmentMechanism.getData()
      }
    },
    marketDayTrading: async (parent: any, args: any, context: any, info: any) => {
      marketDayTradingRequest.resetCache(60);
      await marketDayTradingRequest.getRequest();
      marketDayTradingRequest.analysisData();

      const marketDayTrading = new MarketDayTrading({marketDayTrading: marketDayTradingRequest.getData()});
      marketDayTrading.arrangeData();

      return marketDayTrading.getData();
    }
  },
};

export default MarketingResolvers;