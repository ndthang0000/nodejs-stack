function celebrityID() {
  let celebrityID = 999
  // Ta đang trả về một object với các hàm bên trong.
  // Tất cả các hàm bên trong có thể truy cập đến biến của hàm ngoài (celebrityID).
  return {
    getID: function () {
      // Hàm này sẽ trả về celebrityID đã được cập nhật.
      // Nó sẽ trả về giá trị hiện tại của celebrityID, sau khi setID thay đổi nó.
      return celebrityID
    },
    setID: function (theNewID: number) {
      // Hàm này sẽ thay đổi biến của hàm ngoài khi gọi.
      celebrityID = theNewID
    }
  }
}

export default celebrityID
