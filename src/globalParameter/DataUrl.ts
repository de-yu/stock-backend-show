
const URL = {
  MARKETING_STOCK: "http://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data",
  MARKET_STATISTICS: "http://www.twse.com.tw/exchangeReport/MI_INDEX?response=open_data",
  MARKET_RISE_FALL: "http://mopsfin.twse.com.tw/opendata/twtazu_od.csv",
  MARKET_NOTICE: "http://www.twse.com.tw/announcement/notice?response=open_data",
  MARKET_HISTORY: "https://query1.finance.yahoo.com/v7/finance/download/%5ETWII?period1=<%= startTime %>&period2=<%= endTime %>&interval=1d&events=history&includeAdjustedClose=true",
  MARKET_DEAL: "http://www.twse.com.tw/exchangeReport/FMTQIK?response=open_data",
  MARKET_DAY_TRADING: "https://www.twse.com.tw/exchangeReport/TWTB4U2?response=json&date=<%= date %>",  // 大盤當沖資訊
  STOCK_HISTORY: "https://query1.finance.yahoo.com/v7/finance/download/<%= id %>.TW?period1=<%= startTime %>&period2=<%= endTime %>&interval=1d&events=history&includeAdjustedClose=true",
  STOCK_CLASSIFIER: "http://isin.twse.com.tw/isin/class_main.jsp?owncode=&stockname=&isincode=&market=1&issuetype=1&industry_code=&Page=1&chklike=Y",  // 取得股票產業類別
  MARKET_INVESTMENT_MECHANISM: "https://www.twse.com.tw/fund/BFI82U?response=json&dayDate=<%= date %>&type=day",
  STOCK_MONTH_REVENUE: "http://mopsfin.twse.com.tw/opendata/t187ap05_L.csv",
  STOCK_INVESTMENT_MECHANISM : "https://www.twse.com.tw/fund/T86?response=json&date=<%= date %>&selectType=ALLBUT0999", // 個股三大法人買賣超
  STOCK_FOREIGN_RESERVE: "https://www.twse.com.tw/fund/MI_QFIIS?response=json&date=<%= date %>&selectType=ALLBUT0999", // 外資庫存 主要用來取得總股數
  CABINET_STOCK_BASIC: "https://www.tpex.org.tw/web/stock/aftertrading/otc_quotes_no1430/stk_wn1430_result.php?l=zh-tw&se=EW&o=data", // 上櫃股票
  CABINET_STOCK_HISTORY: "https://query1.finance.yahoo.com/v7/finance/download/<%= id %>.TWO?period1=<%= startTime %>&period2=<%= endTime %>&interval=1d&events=history&includeAdjustedClose=true",
  CABINET_STOCK_CLASSIFIER: "https://isin.twse.com.tw/isin/class_main.jsp?owncode=&stockname=&isincode=&market=2&issuetype=4&industry_code=&Page=1&chklike=Y"
};

export default URL;