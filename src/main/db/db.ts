import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { app } from 'electron'
import log from 'electron-log'

/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined
}
/* eslint-enable no-var */

const isProduction = process.env.NODE_ENV === 'production'
//const isProduction = process.env.NODE_ENV === 'production2'

// Determine the database path
const dbPath = isProduction
  ? path.join(app.getPath('userData'), 'db/dev.db') // In production: writable location
  : path.join('file:/dev.db') // In development: source location
//: path.join('file:', __dirname, '../db/prisma/dev.db') // In development: source location
// Ensure the database file exists in production
if (isProduction) {
  try {
    // Copy database file if it doesn't exist
    fs.copyFileSync(
      path.join(process.resourcesPath, 'prisma/dev.db'),
      dbPath,
      fs.constants.COPYFILE_EXCL
    )
    log.info('New database file created')
  } catch (err: any) {
    if (err.code !== 'EEXIST') {
      log.info('Failed to create SQLite file.', err)
    } else {
      log.info('Database file detected')
    }
  }
}
if (isProduction) {
  process.env.DATABASE_URL = 'file:' + dbPath
} else {
  process.env.DATABASE_URL = 'file:dev.db'
}

// Set the Prisma client datasource URL
const prisma = globalThis.prisma || new PrismaClient()

if (!isProduction) globalThis.prisma = prisma

export default prisma
