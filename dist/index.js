import _objectWithoutProperties from "/Users/work/Projects/react-tracker/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useContext, useMemo } from 'react';
import ReactGA from 'react-ga';
import getDisplayName from 'react-display-name';
export var TrackingContext = React.createContext();
export function createTracker(category) {
  return {
    track: function track(action) {
      ReactGA.event({
        category: category,
        action: action
      });
    }
  };
}
export var useTracker = function useTracker() {
  return useContext(TrackingContext);
};
export var withTracker = function withTracker(WrappedComponent, category) {
  var Component = function Component(_ref) {
    var categoryOverride = _ref['tracking-category'],
        props = _objectWithoutProperties(_ref, ["tracking-category"]);

    return React.createElement(TrackingProvider, {
      category: categoryOverride || category
    }, React.createElement(WrappedComponent, props));
  };

  Component.displayName = "Tracker(".concat(getDisplayName(WrappedComponent), ")");
  Component.defaultProps = {
    'tracking-category': undefined
  };
  return Component;
};
export var TrackingProvider = function TrackingProvider(_ref2) {
  var category = _ref2.category,
      children = _ref2.children;
  var tracker = useMemo(function () {
    return createTracker(category);
  }, [category]);
  return React.createElement(TrackingContext.Provider, {
    value: tracker
  }, children);
};
TrackingProvider.defaultProps = {
  category: undefined,
  children: null
};