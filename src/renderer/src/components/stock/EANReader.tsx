import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Item } from '../../../../../types'

type Props = {
  visible: boolean
  items: Item[]
  onSubmit: (ean: string) => void
}

function EANReader({ visible, onSubmit }: Props) {
  //todo logica para que cuando el escanner lea un codigo y se interprete un ENTER y que automaticamente apriete BUSCAR
  const [eanInput, setEanInput] = useState('')
  function handleSearch() {
    onSubmit(eanInput)
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch()
    }
  }
  return (
    <div className={`${visible ? '' : 'hidden'}  flex flex-col gap-8 justify-between`}>
      <Label className="text-md text-foreground">Escanear o ingresar código manualmente </Label>
      <div className=" flex flex-row gap-4 pb-4">
        <Input
          value={eanInput}
          onChange={(e) => setEanInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          defaultValue={''}
        ></Input>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
    </div>
  )
}

export default EANReader
