import crypto from 'crypto'

export const generateString = () => crypto.randomBytes(20).toString('hex')
