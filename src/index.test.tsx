import { expect, it } from 'vitest';
import { FC } from 'react';
import { renderWithProps, remoteProps } from './index';
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

it('should work when calling renderWithProps()', () => {
	const content = {
		before: 'test',
		after: 'test2',
	};
	const setProps = renderWithProps(TestComponent, {
		content: content.before,
	});

	setTimeout(() => {
		setProps({
			content: content.after,
		});

		expect(screen.getByText(content.before)).not.toBeDefined();
		expect(screen.getByText(content.after)).toBeDefined();
	}, 10);
});

it('should mount component when calling renderWithProps()', () => {
	const content = 'test';
	renderWithProps(TestComponent, { content });

	expect(screen.getByText(content)).toBeDefined();
});