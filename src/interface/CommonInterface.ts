
declare interface RequestResponse
{
  status: string;
  data: any;
}

declare interface RequestResponseList
{
  [key: string]: RequestResponse;
}

declare interface RequestList
{
  [key: string]: any;
}

interface CommonObject {
  [key: string]: any;
}

declare interface QueryResponse
{
  status: string;
  data: any;
}