import jwt from 'jsonwebtoken'
import ESignature from '../mongo-module/models/ESignature'
import { generateRSAKey } from './generate-rsa-key';
import randomString from '../utils/random-string';
import { redisClient } from '../redis/redis'

const getESignatureByKid = async (kid: string) => {
  const eSignature = await redisClient.get(`kid:${kid}`);
  if (eSignature) {
    return JSON.parse(eSignature);
  }
  let findESignature = await ESignature.findOne({ kid });
  if (!findESignature) {
    throw new Error('Invalid kid');
  }
  await redisClient.set(`kid:${kid}`, JSON.stringify(findESignature), 'EX', 60 * 60 * 24 * 30);
  return findESignature;
}

const verifySignature = async (eSignature: string) => {
  try {
    const data = await jwt.decode(eSignature, { complete: true })
    if (!data) {
      throw new Error('Invalid Token');
    }
    const payload = data.payload as jwt.JwtPayload;
    const header = data.header as jwt.JwtHeader;
    if (!header.kid) {
      throw new Error('Invalid kid in E-Signature');
    }

    const eSignatureData = await getESignatureByKid(header.kid);
    if (!eSignatureData) {
      throw new Error('Not found kid');
    }

    if (!payload.nonce) {
      throw new Error('Invalid nonce');
    }
    if (new Date().getTime() - payload.timestamp > 60 * 60 * 1000) {
      throw new Error('invalid timestamp')
    }
    const nonce = await redisClient.get(payload.nonce);
    if (nonce) {
      throw new Error('This signature has been used');
    }
    await redisClient.set(payload.nonce, 'used', 'EX', 60 * 5);

    const publicKey: string = eSignatureData.publicKey;
    const verify = jwt.verify(eSignature, publicKey, { algorithms: ['RS256'] });
    console.log('🆗: Signature valid', { payload: verify })
  } catch (error) {
    console.log(error)
  }
}

const main = async () => {
  const { privateKey, publicKey } = generateRSAKey(2048);
  const kid = randomString(20);
  await ESignature.create({ privateKey, publicKey, kid });
  const nonce = randomString(16);
  const payload = { name: 'John Doe', email: 'ndthang0000@gmail.com', timestamp: new Date().getTime(), nonce };
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '24H', header: { alg: 'RS256', kid } });
  console.log('Generated Token:', token);
  return token;
}

main()
  .then(verifySignature)
  .catch(console.error);

