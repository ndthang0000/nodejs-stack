import NodeRSA from 'node-rsa';

export const generateRSAKey = () => {
  const key = new NodeRSA({ b: 512 });
  const privateKey = key.exportKey('private');
  const publicKey = key.exportKey('public');
  const kid='' //random distinct in DB

  console.log('Private Key:', privateKey);
  console.log('Public Key:', publicKey);
  return { privateKey, publicKey, kid };
}
