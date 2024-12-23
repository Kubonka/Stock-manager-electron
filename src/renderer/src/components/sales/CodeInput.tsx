import React, { useRef, useState, useEffect } from 'react'

type Props = {
  onSubmit: (cant: number, code: string) => void
  clearInputTrigger: boolean
}

function CodeInput({ onSubmit, clearInputTrigger }: Props) {
  const [barCode, setBarCode] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setBarCode('')
  }, [clearInputTrigger])

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
      console.log('count', count)
      console.log('code', code)
      onSubmit(count, code)
    } else if (event.key === 'Backspace') {
      event.preventDefault()
      setBarCode((prev) => prev.slice(0, -1))
    }
  }

  return (
    <div>
      CodeInput
      <input
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={barCode}
      />
    </div>
  )
}

export default CodeInput
