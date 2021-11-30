export function getEumEntries<T>(value: T){
  const tempObj: any = {};
  const keys = Object.keys(value).filter(key => typeof (value as any)[key] === 'string');
  const values = keys.map(key => {
    tempObj[key] = (value as any)[key];
  })
  
  
  return {
    refinedObj: tempObj
  }
}

export function isProperty<T>(value: T, key: string) {
  return key in value
}

