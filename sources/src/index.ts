type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.String.prototype.toLowerCase = new Proxy(Win.String.prototype.toLowerCase, {
  apply(Target: typeof String.prototype.toLowerCase, ThisArg: string, Args) {
    const Result = Reflect.apply(Target, ThisArg, Args)
    if (Result === 'windows') {
      return ''
    }
    return Result
  }
})

Win.Function.prototype.call = new Proxy(Win.Function.prototype.call, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  apply(Target: typeof Function.prototype.call, ThisArg: Function, Args: unknown[]) {
    if (Args.toString() === 'includes' && Args.every((Arg) => typeof Arg === 'string')
      && ['Direct3D', '(WDDM)', 'Microsoft Basic Render Driver'].some((Str) => Args[1].includes(Str))) {
      return false
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})