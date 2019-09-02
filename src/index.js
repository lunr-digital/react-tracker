import React, { useContext, useMemo } from 'react';
import ReactGA from 'react-ga';
import getDisplayName from 'react-display-name';
import { string, any } from 'prop-types';

export const TrackingContext = React.createContext();

export function createTracker(category) {
    return {
        track: action => {
            ReactGA.event({
                category,
                action
            });
        }
    };
}

export const useTracker = () => useContext(TrackingContext);
export const withTracker = (WrappedComponent, category) => {
    const Component = ({ 'tracking-category': categoryOverride, ...props }) => (
        <TrackingProvider category={categoryOverride || category}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <WrappedComponent {...props} />
        </TrackingProvider>
    );

    Component.displayName = `Tracker(${getDisplayName(WrappedComponent)})`;
    Component.propTypes = {
        'tracking-category': string
    };
    Component.defaultProps = {
        'tracking-category': undefined
    };

    return Component;
};

export const TrackingProvider = ({ category, children }) => {
    const tracker = useMemo(() => createTracker(category), [category]);

    return (
        <TrackingContext.Provider value={tracker}>
            {children}
        </TrackingContext.Provider>
    );
};

TrackingProvider.propTypes = {
    category: string,
    // eslint-disable-next-line react/forbid-prop-types
    children: any
};

TrackingProvider.defaultProps = {
    category: undefined,
    children: null
};
