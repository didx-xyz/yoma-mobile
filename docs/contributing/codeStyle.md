# Yoma Mobile :: Code Style

## Redux approach

- Content for review includes: 
  - Code style - over all code style should be followed. Ideally, a functional approach should be taken whereever possible.
  - Sane test coverage (we don't commit to a % test coverage, but all logic and code should at minimum have sufficient unit test coverage) 
  - Component Side Effects - Hooks and side-effects should be placed in a wrapper container, including Redux's dispatch and selectors.
  - Internal state management via hooks and useEffeect, etc is fine inside a given component.
  - Selectors should be in separate files and tested
  - The current middleware approach should be followed, with testing. 
  - Generally follow AirBNB approach (I think)
