### What is a component
component is a smallest unit of a webpage which can be configured, reused and nested.
component can be thought of as a functin that returns html elements

# How to design a component

configurable, nested, reuse

# what is a state
  each time a state value is updated, it triggers the page to render, 
  only the part of the component that is changed renders
  reactjs.org/docs/state

# class components
Each has a different life cycle

# Build a clock App

# Lifecycle Methods
component lifecycle from the time its mounted to unmounted, divided to lifecycle methods
1. componentDidMount : runs after first render
best place to make API calls
2. componentDidUpdate : runs after subsequent render, not first, provided prevState is fidderent to the newState
    if there is any setInterval, repetitive tasks (like setInterval)
3. component WillUnmount : runs towards end of component lifecycle
    clear any background task running for this component (like clearInterval)