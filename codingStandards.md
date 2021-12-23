## Coding Standards

> Please follow ES2020 Standards \*

#### Function()

- Name your function with Upper Case letter all the time.
  > Example:

```javascript
		function Button() {
			render <button>TEST</button>
		}
		ReactDOM.render(
				<Button />
				document.getElementById('nodeName')
		);
```

- Format Code
  > Example: (Dont)

```javascript
function Button() {
		const [counter, setCounter] = useState(0);
		render <button onClick={() => setCounter(counter+1)}>TEST-{counter}</button>
}
		ReactDOM.render(
				<Button />
				document.getElementById('nodeName')
		);
```

> Example: (Do)

```javascript
		function Button() {
		const [counter, setCounter] = useState(0);
			render (
				<button onClick={ () => setCounter(counter+1) }>
					TEST - {counter}
				</button>
			)
		}
		ReactDOM.render(
				<Button />
				document.getElementById('nodeName')
		);
```

- Do not use inline functions, instead use handler functions and pass reference
  > Example: (Dont)

```javascript
		function Button() {
		const [counter, setCounter] = useState(0);
			render (
				<button onClick={ () => setCounter(counter+1)}>
					TEST - {counter}
				</button>
			)
		}
		ReactDOM.render(
				<Button />
				document.getElementById('nodeName')
		);
```

> Example: (Do)

```javascript
		function Button() {
		const [counter, setCounter] = useState(0);
		const handleClick = () => setCounter(counter+1) ;
			render (
				<button onClick={ handleClick }>
					TEST - {counter}
				</button>
			)
		}
		ReactDOM.render(
				<Button />
				document.getElementById('nodeName')
		);
```

- Make sure you return it right.
  > Return a function - use "parentheses"

```javascript
	return (...);
```

> Return a Object - use "curly braces"

```javascript
	return {...};
```

#### Variables and Block Scopes

- Use "let" & "const" rather "var'
  > "let" will always with in the scope, where as "var" is not

```javascript
/* if assigned value might change use "let"*/
let answer2 = 42;
/*
	... some code here ...
	*/
answer2; /* might have changed*/
```

> "const" when the reference assign to a variable is ment to be a "constant". References assigned to "const" can not be changed ( Scalar one like string or integer) .

```javascript
const answer = 42;
const greeting = 'Hello';
```

```javascript
let answer2 = 42;
/*
	... some code here ...
	*/
answer2; /* is still 42*/
```

> But when we are using an [array] or {object} is diffenent story, "const will be guarantee that variable is pointing to same array or object but the contant of the value can be mutated."

```javascript
const numbers = [1, 2, 3];
const person = {
  firstName: 'Sharief',
  lastName: 'Mohatad'
};
```

#### Arrow Functions

> Regular functions give access to their "calling" environment while arrow functions give access to their "defining environment.

> The value of the "this" Keyboard inside a regular function depends on HOW the function was CALLED (the OBJECT that made the call)

> The Value of the "this" keyword inside an arrow function depends on WHERE the dunction was DEFINED (the SCOPE that defined the function).

```javascript
const x = function () {
  / * "this" here is the caller of x*/;
};
```

> Prefered\*

```javascript
	const y = () => {
		/* "this" here is NOT the caller of Y */
		/* It's the same "this" found in Y's scope	/
	};
```

> Example - Type below in editor and see results in developer console

```javascript
const test = {
  func1: function () {
    console.log('func1', this);
  },
  func2: () => {
    consle.log('func2', this);
  }
};
test.func1();
test.func2();
```

####Object Literals

> Objects are very popular in JS, They are used to manage and communicate data, and using these features will make the code a bit shorter and easier to read.

> Example

```javascript
const value = 'answer';
const InverseOfPI = 1 / Math.PI;
const obj = {
  p1: 10,
  p2: 20,
  f1() {},
  f2: () => {},
  [value]: 42,
  InverseOfPI
};
console.log(obj.answer);
```

> Details

```javascript
/*Properties*/
	p1: 10,
	p2: 20,
/*if you need an arrow function, you can still use this regular property syntax */
	f2: () => {},
/*Dynamic properties syntax, JS will evaluvate squre brackets and make the result of that new property name*/
	[value]: 42
//property name and the values that exits in the current scope
	InverseOfPI
/*Object that hold a function, you can use this short syntax with object liberals*/
	f1() {},
```

####Destructuring syntax

> Example (1) {Object Destructure}

```javascript
/*Dont*/
const PI = Math.PI;
const E = Math.E;
const SQRT2 = Math.SQRT2;
```

```javascript
/*Do's'*/
/*Destructing*/
const { PI, E, SQRT2 } = Math;
```

> Example (2) {Object Destructure}

```javascript
const data = {
  temp1: '001',
  temp2: '002',
  firstName: 'John',
  lastName: 'Doe'
};

const { temp1, temp1, ...person } = data;

const newObject = {
  ...person
};
```

> Example (1) {Array Destructure}

```javascript
const [first, second, , forth] = [10, 20, 30, 40];
```

> Example (2) {Array Destructure}

```javascript
/*Spliting an array*/
const [first, ...restOfItems] = [10, 20, 30, 40];
console.log(first);
console.log(restOfItems);

const newArray = [...restOfItems];
```

####Promises and Async/Await

> Example DONT

```javascript
const fetchData = () => {
  fetch('https://api/someDomain.com').then((resp) => {
    resp.json().then((data) => {
      console.log(data);
    });
  });
};

fetchData();
```

> Example DO's

```javascript
const fetchData = async () => {
  const resp = await fetch('https://api/someDomain.com');

  const data = await resp.json();

  console.log(data);
};

fetchData();
```

#### Forms

> Use event.preventDefault(); when working with OnSubmit events.
> Example:

```javascript
class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" required />
        <button> Enter </button>
      </form>
    );
  }
}
```

####Ajax Calls

> Use " axios.get " Instead of fetch()
> syntax

```javascript
	handleSubmit - async (event) => {
		const resp =
			axios.get(`http://api.domainName.com/users/${this.state.userName}`);
		console.log(resp.data);
	}
```

####FAM Resource Integration with UI

```
>
1) Create folder 'resources' and 'ResourceConfig.js' with below format

	const resourceConfig = {
	route: 'property',
	conifugartion: [
		{
		pageName: 'details', // DONT Use specical character
		resources: [
			{
			key: 'Property_Details_Header_CaseDefinition',
			display: 'Case Definition',
			description: 'Property_Details_Header_CaseDefinition'
			}
		]
		}
	]
	};
	export default resourceConfig;

2) Export 'ResourceConfig' to 'src\app\resources\index.js'
  	export { default as property } from 'app/main/property/resources/ResourceConfig';

3)  In each Route change, application will make FAM Policy evaluation API and store data in 'store' variable
	common.IAMResource.contextResources -> Resouces.
	common.IAMResource.contextLoadingResources -> for FAM Policy evalution API invoking status.
	
	eg:-
	const contextLoadingResources = useSelector(
		(state) => state.common.IAMResource.contextLoadingResources
	);

	const contextResources = useSelector(
		(state) => state.common.IAMResource.contextResources
	);
```

###End
