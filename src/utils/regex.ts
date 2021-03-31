export const nameHasDigitsOrSymbols = (name: string) =>
  /[!@#$%\\/|^&*,.?(){}+=`~_:;"\\[\]]|\d/g.test(name);