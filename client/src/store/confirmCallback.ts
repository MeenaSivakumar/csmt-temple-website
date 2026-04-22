// Module-level ref for the confirm callback — kept outside Redux to avoid
// storing non-serializable functions in state.
let _callback: (() => void) | null = null

export const setConfirmCallback = (fn: (() => void) | null) => { _callback = fn }
export const getConfirmCallback = () => _callback
