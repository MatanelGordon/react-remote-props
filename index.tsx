import {useState} from "react";

export const Component = () => {
	const [state,setState] = useState(2);
	return <div>component {state}</div>
}