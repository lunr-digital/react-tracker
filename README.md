# react-tracker
Component level tracking using context

## Examples

```jsx
import {withTracker, useTracker} from '@lunrdigital/react-tracker';

const Component = () => {
    const { track } = useTracker();

    return (
        <button onClick={() => track('Button click')}>Track</button>
    );
};

const TrackedComponent = withTracker(Component, 'Default Category');

<TrackedComponent />

<TrackedComponent tracking-category="Overidden Category" />
```

```jsx
import {withTracker, useTracker} from '@lunrdigital/react-tracker';

const Nested = () => {
    const { track } = useTracker();

    return (
        <button onClick={() => track('Nested button click')}>Track</button>
    );
};

const Component = () => {
    const { track } = useTracker();

    return (
        <button onClick={() => track('Button click')}>Track</button>
    );
};

const TrackedComponent = withTracker(Component, 'Default Category');

<TrackedComponent />

<TrackedComponent tracking-category="Overidden Category" />
```
