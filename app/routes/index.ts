import { Router } from 'express'

import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (filename: string) => {
  return filename.split('.').shift()
}

readdirSync(PATH_ROUTER).filter(filename => {
  const cleanName = cleanFileName(filename)
  if (cleanName !== 'index') {
    console.log(cleanName)
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.default)
    })
  }
})

export default router