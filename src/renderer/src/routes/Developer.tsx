import React from 'react'
import { createDummyDb } from '../serverActions/developerActions'
function Developer() {
  return (
    <div>
      Developer
      <div className="w-72 h-24 bg-red-300" onClick={() => createDummyDb()}>
        Crear DB
      </div>
    </div>
  )
}

export default Developer
