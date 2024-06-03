# nested-obj

<p align="center" width="100%">
  <a href="https://github.com/pyramation/nested-obj/actions/workflows/run-tests.yaml">
    <img height="20" src="https://github.com/pyramation/nested-obj/actions/workflows/run-tests.yaml/badge.svg" />
  </a>
   <a href="https://github.com/pyramation/nested-obj/blob/main/LICENSE-MIT"><img height="20" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
   <a href="https://github.com/pyramation/nested-obj/blob/main/LICENSE-Apache"><img height="20" src="https://img.shields.io/badge/license-Apache-blue.svg"></a>
</p>

`nested-obj` is a simple and lightweight JavaScript utility library for safely accessing and modifying nested properties in objects using string paths.

## Features

- **Get**: Safely access nested properties in an object.
- **Set**: Set a value at a specific path in an object. Does not overwrite if the value is undefined.
- **Has**: Check if a specific path exists within an object.

## Installation

```bash
npm install nested-obj
```

## Usage

### Get

Retrieve a nested property value from an object.

```ts
import objectPath from 'nested-obj';

const obj = {
  user: {
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown'
    }
  }
};

const userName = objectPath.get(obj, 'user.name');
console.log(userName); // 'John Doe'
```

### Set

Set a value at a specific path in an object. If any part of the path does not exist, it will be created.

```ts
objectPath.set(obj, 'user.address.zip', '12345');
console.log(obj.user.address.zip); // '12345'
```

### Has

Check if a path exists within an object.

```ts
const hasCity = objectPath.has(obj, 'user.address.city');
console.log(hasCity); // true
```

## Running Tests

To run tests, execute the following command:

```sh
npm test
```

or for continuous

```sh
npm test:watch
```