import { useEffect, type RefObject } from 'react'

/** Keep keyboard focus in the topmost dialog and return it to its trigger. */
export function useDialogFocus(ref: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const dialog: HTMLDivElement = element
    const previous = document.activeElement
    const selector = 'button, a[href], input, select, textarea, video[controls], [tabindex]'
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(selector))
      .filter((element) => element.tabIndex >= 0 && !element.matches(':disabled') && element.getClientRects().length > 0)
    const isTopmost = () => {
      const dialogs = document.querySelectorAll('[role="dialog"][aria-modal="true"]')
      return dialogs.item(dialogs.length - 1) === dialog
    }

    ;(focusable()[0] ?? dialog).focus({ preventScroll: true })

    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !isTopmost()) return
      const elements = focusable()
      const first = elements[0] ?? dialog
      const last = elements[elements.length - 1] ?? dialog
      if (!dialog.contains(document.activeElement) || elements.length === 0) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }

    function onFocus(event: FocusEvent) {
      if (isTopmost() && event.target instanceof Node && !dialog.contains(event.target)) {
        ;(focusable()[0] ?? dialog).focus({ preventScroll: true })
      }
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocus)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocus)
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true })
    }
  }, [ref])
}
