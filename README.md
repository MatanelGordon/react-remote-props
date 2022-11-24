# react-remote-props
Control React Components' props remotely

![npm](https://img.shields.io/npm/v/react-remote-props)
![NPM](https://img.shields.io/npm/l/react-remote-props)

# Getting Started

## Installation

first, install the package by using

```shell
$ npm i react-remote-props
```

## Usage

to use react-remote-props, Here's an example:

```jsx
const [RemoteButton, setProps] = remoteProps(Button, {
    size: "lg",
	content: "Click Me"
});

export const App = () => {
    return <>
		<RemoteButton />
	</>
}
```

to create a remote component inside a react component, We recommend you use `useMemo` or `useRef`;

```jsx


export const App = () => {
	const [RemoteButton, setProps] = useMemo(remoteProps(Button, {
		size: "lg",
		content: "Click Me"
	}), []);
    
    return <>
		<RemoteButton />
	</>
}
```



