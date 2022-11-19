import {useState} from "react";

export const Component = () => {
	const [state] = useState(2);
	return <div>component {state}</div>
}