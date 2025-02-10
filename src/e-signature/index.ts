import jwt from 'jsonwebtoken'


const sign = (payload: any, privateKey: string, options: jwt.SignOptions) => {
  const token = jwt.sign(payload, privateKey, options);
  return token;
}

const verify = (token: string, publicKey: string, options: jwt.VerifyOptions) => {
  // get kid in header and query it in DB to get Public Key
  const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

  console.log('Decoded Payload:', decoded);
  // if (new Date().getTime() - decoded.timestamp > 60 * 60 * 1000) {
  //     throw new Error('invalid timestamp')
  // }

  /* 
      redis.get(`none:${payload.none}`)
      if (none is existed) {
        throw new Error('invalid none')
      }
      else{
        redis.set(`none:${payload.none}`,payload.none)
      }
    */
}



