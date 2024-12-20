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

Win.WebGLRenderingContext.prototype.getParameter = new Proxy(Win.WebGLRenderingContext.prototype.getParameter, {
  apply(Target: typeof WebGLRenderingContext.prototype.getParameter, ThisArg: unknown, Args: unknown[]) {
    const Result = Reflect.apply(Target, ThisArg, Args)
    if (new Error().stack.includes('main.')) {
      return ''
    }
    return Result
  }
})