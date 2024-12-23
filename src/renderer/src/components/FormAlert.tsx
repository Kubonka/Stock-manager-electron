'use client'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './ui/alert'

type FormAlertProps = { className: string }
export function FormAlert({ className }: FormAlertProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Es necesario completar todos los campos.</AlertDescription>
    </Alert>
  )
}
export default FormAlert
