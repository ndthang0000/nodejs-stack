import NodeRSA from 'node-rsa';

export const generateRSAKey = (size: number) => {
  const key = new NodeRSA({ b: size });
  const privateKey = key.exportKey('private');
  const publicKey = key.exportKey('public');

  //console.log('Private Key:', privateKey);
  //console.log('Public Key:', publicKey);
  return { privateKey, publicKey };
}
