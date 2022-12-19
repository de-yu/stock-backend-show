
import _ from 'lodash';

export function getNumberInString(text: string): string[]
{
  let strArr: string[] = [];
  if(!_.isNull(text.match(/[0-9]+/g))) {
    strArr = text.match(/[0-9]+/g) as string[];
  }
  return strArr;
}

export function defaultNaN(num: number , defaultValue: number) {
  if(isNaN(num) || _.isNull(num)){
    return defaultValue;
  }else {
    return num;
  }
} 

export function defaultUndefined(value: any , defaultValue: string | number) {
  if(_.isUndefined(value) || _.isNull(value)){
    return defaultValue;
  }else {
    return value;
  }
}