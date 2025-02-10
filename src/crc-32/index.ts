// generate algorithm: crc-32
function crc32(str: string): number {
    const table = new Uint32Array(256).map((_, i) => {
        let c = i
        for (let k = 0; k < 8; k++) {
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
        }
        return c
    })

    let crc = 0xffffffff
    for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i)
        crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff]
    }

    return (crc ^ 0xffffffff) >>> 0
}

console.log(crc32('thang dep trai qua')) // 222957957
