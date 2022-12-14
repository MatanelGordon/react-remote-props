import { ComponentType, FC, useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

export type PropsSetterParam<T> = Partial<T> | ((prev: T) => Partial<T>);
export type PropsSetter<T> = (value: PropsSetterParam<T>) => void;

/**
 * creates a wrapper around a component that allows to set props remotely
 * @param Component {ComponentType} the wanted component
 * @param initialProps {object} the props you want to inject
 * @returns array where the first value is the wrapped component and the second value is a function that setters the props.
 * @example ```
 * const [Wrapper, setProps] = withProps(Button);
 *
 * // as component
 * <Wrapper />
 *
 * // the setter
 * setProps({
 *     // props to change
 * })
 * ```
 */
export function remoteProps<T>(Component: ComponentType<T>, initialProps: Partial<T>): [FC, PropsSetter<T>] {
	const subject = new BehaviorSubject<T>({
		...Component.defaultProps,
		...initialProps,
	} as T);

	const setProps: PropsSetter<T> = (valueOrFunc) => {
		const nextProps = {
			...subject.value,
			...(typeof valueOrFunc === 'function' ? valueOrFunc(subject.value) : valueOrFunc),
		};

		subject.next(nextProps);
	};

	const Wrapper = () => {
		const [props, setProps] = useState(subject.value);

		useEffect(() => {
			const subscription = subject.subscribe(setProps);
			return () => subscription.unsubscribe();
		}, []);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return <Component {...props} />;
	};

	return [Wrapper, setProps];
}