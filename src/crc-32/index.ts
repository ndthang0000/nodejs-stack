// generate algorithm: crc-32
function crc32(str: string): number {
  const table = new Uint32Array(256).map((_, i) => {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    return c;
  });

  let crc = 0xFFFFFFFF;
  for (let i = 0; i < str.length; i++) {
    const byte = str.charCodeAt(i);
    crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xFF];
  }

  return (crc ^ 0xFFFFFFFF) >>> 0;
}

console.log(crc32('thang dep trai qua')); // 222957957