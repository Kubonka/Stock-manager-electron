import { Button } from '../components/ui/button'
import { createDummyDb, testIpc, migrateDB, writeToDB } from '../serverActions/developerActions'
function Developer() {
  return (
    <div className="flex flex-col gap-8">
      <Button className="w-96 h-24" onClick={() => createDummyDb()}>
        Crear DB
      </Button>
      <Button className="w-96 h-24" onClick={() => testIpc()}>
        Test
      </Button>
      <div className=" flex flex-row gap-2">
        <Button className="w-96 h-24" onClick={() => migrateDB()}>
          Migrar DB
        </Button>
        <Button className="w-96 h-24" onClick={() => writeToDB()}>
          Write DB
        </Button>
      </div>
    </div>
  )
}

export default Developer
