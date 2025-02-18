//give me an example about bind, call, apply
interface Person {
  name: string;
}

function greet(this: Person, greeting: string, punctuation: string) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Alice' };

// Using call
greet.call(person, 'Hello', '!'); // Output: Hello, Alice!

// Using apply
greet.apply(person, ['Hi', '.']); // Output: Hi, Alice.

// Using bind
const greetPerson = greet.bind(person);
greetPerson('Hey', '!!'); // Output: Hey, Alice!!