# :hamburger::hamburger::hamburger: React | Burger Builder App :hamburger::hamburger::hamburger:

_Fun little Hamburger Builder app using React, Redux, React Hooks, Lifecycle Hooks, React Router, and other goodies!_

</br>
<p>
  <img src="https://reactjs.org/logo-og.png" alt="React Logo" width="500">
  <img src="https://vignette.wikia.nocookie.net/ronaldmcdonald/images/0/0f/Imgres.jpeg/revision/latest?cb=20150625050506" alt="The Hamburgler" width="350">
</p>
</br>

## Technologies & Methodologies Used (not inclusive)

- JavaScript
- React.js
- JSX
- HTML (via JSX)
- React Hooks
- React Router
- React Redux
- Stateless & Stateful Components
- Class-based & Functional Components
- Containers
- HOC (Higher Order Components)
- HTTP Requests
- State Management
- Lifecycle Hooks
- CSS Modules
- CSS Animations
- Material-UI Library

## Tasks

**1. Plan out the React App**

- Develop the component tree & component structure
- Develop a plan for the application state, what data will be managed & how it will be sourced, how the state will be managed
- Develop a plan for what components & what containers are necessary

**2. Burger Builder UI/UX Plan**

- App Component (class-based, stateful or stateless)
  - Layout (wrapper component)
    - Toolbar
      - Drawer Toggle Button/Gesture
      - Logo
      - Navigation Items
    - Side Drawer
    - Backdrop Element
    - {props.children} _(will be used to wrap separate "pages" via React Router)_
      - Burger Builder (page, stateful component, container)
        - Builder Controls
          - Build Control
          - Build Control
          - Build Control
          - ...
          - Order Button
        - Burger Preview
          - Ingredients
          - Ingredients
          - Ingredients
          - ...
        - Modal Component (reusable)
          - {props.children}

**3. Burger Builder State Management Plan**

- State (Located within Burger Builder Component)
  - Ingredients
    - JS Object
    - {meat: number, cheese: number, lettuce: number, ...}
  - Customer's stage in purchase process
    - JS Object
    - {purchased: bool}
  - Pricing
    - JS Object
    - {totalPrice: number}
- _Additional states may be added to other components as necessary_
