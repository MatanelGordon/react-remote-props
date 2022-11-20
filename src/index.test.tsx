import { expect, it } from 'vitest';
import { FC } from 'react';
import { remoteProps } from './index';
import { render, screen } from '@testing-library/react';

interface TestProps {
	content: string;
}

const TestComponent: FC<TestProps> = ({ content }) => <button>{content}</button>;

it('should work when calling withProps()', () => {
	const content = 'noa';
	const [Wrapper, setProps] = remoteProps(TestComponent, {
		content: 'matanel',
	});

	render(<Wrapper />);

	setTimeout(() => {
		setProps({ content });

		expect(screen.getByText(content)).toBeDefined();
	}, 10);
});

it('should mount wrapper successfully', () => {
	const content = 'test';
	const [Wrapper] = remoteProps(TestComponent, { content });

	render(<Wrapper />);

	expect(screen.getByText(content)).toBeDefined();
});