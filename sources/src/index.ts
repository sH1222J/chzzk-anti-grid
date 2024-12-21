type unsafeWindow = typeof window
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const unsafeWindow: unsafeWindow

const Win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window

Win.Object.defineProperty = new Proxy(Win.Object.defineProperty, {
  apply(Target: typeof Win.Object.defineProperty, ThisArg: null, Args: [unknown, string | symbol, PropertyDescriptor]) {
    if (typeof Args[1] === 'string' && Args[1] === 'isSupportedPlatform') {
      return Reflect.apply(Target, ThisArg, [Args[0], Args[1], { value: () => false, writable: false, enumerable: true, configurable: true }])
    }
    return Reflect.apply(Target, ThisArg, Args)
  }
})