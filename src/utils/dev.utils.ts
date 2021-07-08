export const devLog = (x: any) => {
  if (__DEV__) {
    console.log(x)
  }
}
