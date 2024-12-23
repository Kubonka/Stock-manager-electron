'use client'
import React, { useEffect, useState } from 'react'
import { DataTable } from './DataTable.tsx'
import { columns } from './columns.tsx'
import { getAllItems } from '../../serverActions/stockActions.ts'

function AllBudgets() {
  const [itemsTableData, setItemsTableData] = useState<Item[]>([] as Item[])
  async function loadBudgets() {
    const res: Item[] | null = await getAllItems()
    if (res) setItemsTableData(res)
    else setItemsTableData([])
  }
  useEffect(() => {
    loadBudgets()
  }, [])
  //note  MARKUP
  return (
    <div className="h-full w-full">
      <DataTable columns={columns} data={itemsTableData} refresh={() => loadBudgets()} />
    </div>
  )
}

export default AllBudgets
