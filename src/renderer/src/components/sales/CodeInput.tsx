import React, { useRef, useState, useEffect } from 'react'
import { Input } from '../ui/input'

type Props = {
  onSubmit: (cant: number, code: string) => void
  focusInputTrigger: boolean
  clearInputTrigger: boolean
  overrideInput: string
}

function CodeInput({ onSubmit, clearInputTrigger, focusInputTrigger, overrideInput }: Props) {
  const [barCode, setBarCode] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setBarCode('')
    inputRef.current?.focus()
  }, [clearInputTrigger])
  useEffect(() => {
    inputRef.current?.focus()
  }, [focusInputTrigger])

  useEffect(() => {
    if (overrideInput !== '') {
      setBarCode((p) => p + overrideInput)
      setTimeout(() => simulateEnterKeyPress(), 200)
    }
  }, [overrideInput])

  const simulateEnterKeyPress = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13,
      bubbles: true
    })
    inputRef.current?.dispatchEvent(event)
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let code = event.target.value
    if (/(\s|\*)$/.test(code)) {
      code = code.replace(/(\s|\*)$/, ' X ')
    }
    setBarCode(code)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const xPos = barCode.indexOf('X')
      let count = 0
      let code = ''
      if (xPos === -1) {
        count = 1
        code = barCode
      } else {
        count = parseInt(barCode.slice(0, xPos - 1), 10)
        code = barCode.slice(xPos + 2)
      }
      onSubmit(count, code)
    } else if (event.key === 'Backspace') {
      event.preventDefault()
      if (event.key === 'Backspace' && inputRef.current) {
        const { selectionStart, selectionEnd } = inputRef.current
        if (selectionStart !== selectionEnd) {
          console.log('Text is selected and Backspace is pressed!')
          // Perform your action here
          setBarCode(
            (prev) => prev.slice(0, selectionStart as number) + prev.slice(selectionEnd as number)
          )
        } else {
          setBarCode((prev) => prev.slice(0, -1))
        }
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setBarCode('')
    }
  }

  return (
    <Input
      ref={inputRef}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={barCode}
      className="w-full h-20 font-[30px] md:text-[30px] border-2 bg-slate-900 "
      autoFocus
    />
  )
}

export default CodeInput
