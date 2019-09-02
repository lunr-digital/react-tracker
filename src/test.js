/* eslint-disable react/prop-types */
import React from 'react';
import ReactGA from 'react-ga';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import {
    TrackingContext,
    TrackingProvider,
    createTracker,
    useTracker,
    withTracker
} from '.';

jest.mock('react-ga');

beforeEach(() => {
    ReactGA.event.mockReset();
});

describe('createTracker', () => {
    it('should decorate ReactGA with a category', () => {
        const { track } = createTracker('Cat 1');

        expect(ReactGA.event).not.toHaveBeenCalled();

        track('clicked the thing');

        expect(ReactGA.event).toHaveBeenCalledWith({
            action: 'clicked the thing',
            category: 'Cat 1'
        });
    });
});

describe('useTracker', () => {
    it('should use the category from parent context', () => {
        const wrapper = ({ children }) => (
            <TrackingProvider category="Cat 2">{children}</TrackingProvider>
        );
        const { result } = renderHook(() => useTracker(), { wrapper });

        expect(ReactGA.event).not.toHaveBeenCalled();

        act(() => {
            result.current.track('did another thing');
        });

        expect(ReactGA.event).toHaveBeenCalledWith({
            action: 'did another thing',
            category: 'Cat 2'
        });
    });

    it('should support nesting', () => {
        const wrapper = ({ children }) => (
            <TrackingProvider category="Cat 1">
                <div>
                    <TrackingProvider category="Cat 2">
                        {children}
                    </TrackingProvider>
                </div>
            </TrackingProvider>
        );
        const { result } = renderHook(() => useTracker(), { wrapper });

        expect(ReactGA.event).not.toHaveBeenCalled();

        act(() => {
            result.current.track('did another thing');
        });

        expect(ReactGA.event).toHaveBeenCalledWith({
            action: 'did another thing',
            category: 'Cat 2'
        });
    });
});

describe('withTracker', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class ComponentWithTracking extends React.Component {
        render() {
            const { track } = this.context;

            return (
                <button type="button" onClick={() => track('Button click')}>
                    Track
                </button>
            );
        }
    }
    ComponentWithTracking.contextType = TrackingContext;

    it('should use default category', () => {
        const Component = withTracker(ComponentWithTracking, 'Component');
        const { getByText } = render(<Component />);

        expect(ReactGA.event).not.toHaveBeenCalled();

        fireEvent.click(getByText('Track'));

        expect(ReactGA.event).toHaveBeenCalledWith({
            action: 'Button click',
            category: 'Component'
        });
    });

    it('should use override category', () => {
        const Component = withTracker(ComponentWithTracking, 'Component');
        const { getByText } = render(
            <Component tracking-category="Override" />
        );

        expect(ReactGA.event).not.toHaveBeenCalled();

        fireEvent.click(getByText('Track'));

        expect(ReactGA.event).toHaveBeenCalledWith({
            action: 'Button click',
            category: 'Override'
        });
    });
});
