import _objectWithoutProperties from '/Users/work/Projects/react-tracker/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties';
import React, { useContext, useMemo } from 'react';
import ReactGA from 'react-ga';
import getDisplayName from 'react-display-name';

export var TrackingContext = React.createContext();
export function createTracker(category) {
    return {
        track: function track(action) {
            ReactGA.event({
                category,
                action
            });
        }
    };
}
export var useTracker = function useTracker() {
    return useContext(TrackingContext);
};
export var withTracker = function withTracker(WrappedComponent, category) {
    const Component = function Component(_ref) {
        const categoryOverride = _ref['tracking-category'];
        const props = _objectWithoutProperties(_ref, ['tracking-category']);

        return React.createElement(
            TrackingProvider,
            {
                category: categoryOverride || category
            },
            React.createElement(WrappedComponent, props)
        );
    };

    Component.displayName = 'Tracker('.concat(
        getDisplayName(WrappedComponent),
        ')'
    );
    Component.defaultProps = {
        'tracking-category': undefined
    };
    return Component;
};
export var TrackingProvider = function TrackingProvider(_ref2) {
    const { category } = _ref2;
    const { children } = _ref2;
    const tracker = useMemo(() => createTracker(category), [category]);
    return React.createElement(
        TrackingContext.Provider,
        {
            value: tracker
        },
        children
    );
};
TrackingProvider.defaultProps = {
    category: undefined,
    children: null
};
