export function getEumEntries<T>(value: T) {
  const tempObj: any = {};
  const keys = Object.keys(value).filter(key => typeof (value as any)[key] === 'string');
  const values = keys.map(key => {
    tempObj[key] = (value as any)[key];
  });

  return {
    refinedObj: tempObj,
  };
}

export function isProperty<T>(value: T, key: string) {
  return key in value;
}

export function getParamsString<T>(value: T, exceptionKeys?: string[]) {
  let params: string = '';

  Object.keys(value).map((key: string, index: number) => {
    if ((value as any)[key] === null || (value as any)[key] === undefined) {
      delete (value as any)[key];
    }

    if (exceptionKeys && exceptionKeys.indexOf(key) !== -1) {
      delete (value as any)[key];
    }
  });

  Object.keys(value).map((key: string, index: number) => {
    const currentParams = index === 0 ? `${key}=${(value as any)[key]}` : `&${key}=${(value as any)[key]}`;
    params += currentParams;
  });

  return params;
}
