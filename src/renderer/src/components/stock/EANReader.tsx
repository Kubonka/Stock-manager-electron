import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

type Props = {
  visible: boolean
  items: Item[]
  onSubmit: (ean: string) => void
}

function EANReader({ visible, onSubmit, items }: Props) {
  //todo logica para que cuando el escanner lea un codigo y se interprete un ENTER y que automaticamente apriete BUSCAR
  const [eanInput, setEanInput] = useState('')
  function handleSearch() {
    onSubmit(eanInput)
  }
  return (
    <div className={`${visible ? '' : 'hidden'}  flex flex-col gap-4`}>
      <Label className="text-md">Escanear o ingresar código manualmente </Label>
      <div className=" flex flex-row gap-4">
        <Input
          value={eanInput}
          onChange={(e) => setEanInput(e.target.value)}
          defaultValue={''}
        ></Input>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
    </div>
  )
}

export default EANReader
