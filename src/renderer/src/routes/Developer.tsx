import BannerAnim from '../components/testAnims/BannerAnim'
import BounceAnim from '../components/testAnims/BounceAnim'
import DecodeAnim from '../components/testAnims/DecodeAnim'
import Matrix from '../components/testAnims/Matrix'
import SplitFlap from '../components/testAnims/SplitFlap'
import SplitFlapPanel from '../components/testAnims/SplitFlapPanel'
import { Button } from '../components/ui/button'
import { createDummyDb, testIpc, migrateDB, writeToDB } from '../serverActions/developerActions'
function Developer() {
  const spool = [
    ' ',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  return (
    <div className="flex flex-col gap-8 ">
      {/* <Button className="w-96 h-24" onClick={() => createDummyDb()}>
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
      </div> */}
      {/* <Matrix data="Me agarro coronavirus y me sangran los ojitos" increment={50} mutation={0.07} /> */}
      {/* <DecodeAnim data="ALBERTO MARTINEZ" duration={10} /> */}
      {/* <BounceAnim data="ALBERTO" /> */}
      {/* <BannerAnim data={['BETO', 'TEST', 'PITO']} /> */}
      <SplitFlapPanel rows={4} cols={10} />
      {/* <SplitFlap letter="A" spool={spool} /> */}
    </div>
  )
}

export default Developer
