import { expect, it } from 'vitest';
import { FC } from 'react';
import {withProps} from "./index";

interface TestProps {
	content: string;
}

const TestComponent: FC<TestProps> = ({ content }) => <button>{content}</button>;

it('should work', () => {
	const [Wrapper, setProps] = withProps(TestComponent, {
		content: "matanel"
	})
});