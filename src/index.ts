console.log('Server was restarted!')

// import './mutex/mutex';
//-------------------------DEMO: Decorator-------------------------
// import Singleton from './decorators/singleton-decorators';
// import './data-types/index';
// import './sanitized-html';
// import './stream-file';
// import './crc-32';
// @Singleton
// class User {
//   constructor(private name: string) { }

//   public sayName(): void {
//     console.log(`My name is ${this.name}`);
//   }
// }
// const newUser = new User('John Doe');
// const newUser2 = new User('John Doe2');
// console.log(newUser === newUser2); // true

// -------------------------DEMO CLOSURES-------------------------
// import celebrityID from './closures/closures';
// var mjID = celebrityID(); //Lúc này, celebrityID đã trả về
// mjID.getID(); // 999
// mjID.setID(567); // Thay đổi biến của hàm ngoài
// mjID.getID(); // 567: Tả về biến celebrityID đã được cập nhật.

import './graphql/server'
