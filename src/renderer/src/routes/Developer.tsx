import { createDummyDb, testIpc } from '../serverActions/developerActions'
function Developer() {
  return (
    <div>
      Developer
      <div className="w-72 h-24 bg-red-300" onClick={() => createDummyDb()}>
        Crear DB
      </div>
      <div className="w-72 h-24 bg-blue-800" onClick={() => testIpc()}>
        Test
      </div>
    </div>
  )
}

export default Developer
