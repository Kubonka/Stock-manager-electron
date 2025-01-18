import React, { useRef, useState, useEffect } from 'react'
import { Input } from '../ui/input'

type Props = {
  onSubmit: (cant: number, code: string) => void
  focusInputTrigger: boolean
  clearInputTrigger: boolean
}

function CodeInput({ onSubmit, clearInputTrigger, focusInputTrigger }: Props) {
  const [barCode, setBarCode] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setBarCode('')
  }, [clearInputTrigger])
  useEffect(() => {
    inputRef.current?.focus()
  }, [focusInputTrigger])

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
      setBarCode((prev) => prev.slice(0, -1))
    }
  }

  return (
    <Input
      ref={inputRef}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={barCode}
      className="w-full h-20 font-[30px] md:text-[30px] border-2 bg-slate-900 -ml-2"
      autoFocus
    />
  )
}

export default CodeInput
