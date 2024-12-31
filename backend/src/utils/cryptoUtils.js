import crypto from 'crypto'

const algorithm = 'aes-256-ctr'
const secretKey = crypto
  .createHash('sha256')
  .update(process.env.SECRET_KEY || 'default_secret_key')
  .digest('base64')
  .substr(0, 32)

const encrypt = (text) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

const decrypt = (hash) => {
  const [ivHex, encryptedText] = hash.split(':')
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivHex, 'hex')
  )
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, 'hex')),
    decipher.final(),
  ])

  return decrypted.toString()
}

const deriveKey = (folderId) => {
  return crypto
    .createHmac('sha256', process.env.MASTER_KEY)
    .update(folderId)
    .digest('hex')
}

export { encrypt, decrypt, deriveKey }
