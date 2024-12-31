import { encrypt, decrypt } from '../utils/cryptoUtils'

const testCrypto = () => {
  const originalText = 'Este es un mensaje de prueba.'
  console.log('Texto original:', originalText)

  const encryptedText = encrypt(originalText)
  console.log('Texto cifrado:', encryptedText)

  const decryptedText = decrypt(encryptedText)
  console.log('Texto descifrado:', decryptedText)

  console.log('Es iguaaaaaaaaaaal', originalText === decryptedText)
}

testCrypto()
