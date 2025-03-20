This is a frontend app built with the specifications and API provided by the Fetch FE Take-Home exercise. The tech stack is React, Tailwind, and TypeScript. 

- The app features a fully responsive UI made up of a login page, a search page, and a favorites page where navigation is handled by React Router. React Context API is used to handle global state to pass favorited dogs to multiple components as needed.

- Login Page handles calls to the login endpoint and navigates the user to Search Page upon successful endpoint access.

- Search Page handles rendering all the child components including: Header, Pagination (footer), Main, and Filter, which are made up of smaller components such as DogCards.

- The favorites page uses the favorited dogs global state and handles calls to the match endpoint to generate a match for the user.

- Most of the server calls are handled in the Main.tsx and Filter.tsx components.

- Most of the server call methods are abstracted into a singleton class for use across the app to improve reusability, modularity, and promote a cleaner codebase. 

- Google Places API was implemented for autocomplete in the filter section.


To do: 

- Implement Age Range filter functionality with a slider for the UI.
- Populate cards with data from the Location filter input.  
