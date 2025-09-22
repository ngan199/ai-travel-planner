# AI Travel Planner
#### Video Demo: https://youtu.be/NGmHaOpy-ag?si=K-9RxTTf95OHTQlF
#### Description: AI Travel Planner is a web application that generates personalized trip itineraries using Gemini AI, allowing users to sign in with Google, create and manage trips, view interactive plans with Google Maps integration, and save or delete trip history.

## Overview
AI Travel Planner is my final project for CS50. The application demonstrates how artificial intelligence can make trip planning faster and more convenient. Instead of spending hours researching destinations, accommodations, and daily activities, a user can simply provide three inputs — **destination, budget, and duration** — and the system will generate a complete itinerary with personalized suggestions.  

The project combines **React + Vite** on the frontend with **Firebase** for authentication and database services. The AI functionality is powered by the **Gemini API**, which generates travel itineraries that adapt to user preferences.  

---

## Features
1. **Google Authentication**
   - Users can sign in and sign out securely using Google.  
   - Firebase Authentication handles user identity and session persistence.

2. **Light Mode / Dark Mode**
   - The entire interface supports theme switching for better user experience.  
   - Dark mode makes the application easy to use at night or in low light.

3. **Create a Trip**
   - Input: destination, budget, and trip duration.  
   - The app calls Gemini APIs to generate a **daily plan** with points of interest, hotels, and activities.

4. **Interactive Itinerary**
   - Each place in the itinerary can be clicked to open directly in **Google Maps**, making navigation effortless.

5. **Trip History**
   - Past trips are stored in Firestore.  
   - Users can revisit, view details, or delete saved trips.

6. **Delete Trips**
   - Trips can be removed permanently from history.  
   - The delete action uses optimistic UI updates for instant feedback.

7. **Responsive Design**
   - Built with React and Tailwind/utility classes to ensure smooth performance on desktop and mobile.

---

## File Structure and Explanation
- **`frontend/`**  
  Contains the React app built with Vite. Major components include:
  - **`Hero.jsx`**: Homepage hero section. Layout changes depending on whether the user is logged in or not.  
  - **`Header.jsx`**: Navigation bar with logo, dark mode toggle, sign in, sign out, and user menu.  
  - **`MyTrips.jsx`**: Displays a list of trips saved in Firestore with lazy loading and delete feature.  
  - **`UserTripCarditem.jsx`**: Reusable card component for displaying each trip’s summary.  
  - **`ViewTrip.jsx`**: Shows the details of a single itinerary with clickable Google Maps links.  

- **`service/firebaseConfig.js`**  
  Firebase configuration and initialization for Firestore and Authentication.

- **`service/sharedFunctions.js`**  
  Utility functions such as fetching images from Unsplash to enrich the UI.

- **`public/`**  
  Contains static assets (logo, images, etc.).

- **`README.md`**  
  Documentation of the project (this file).

---

## Design Choices
- **Frontend-first architecture**: I focused on React because the UI/UX is the most visible part of the project.  
- **Firebase for backend services**: Using Firebase allowed me to avoid setting up a full server during the course project, while still having authentication, cloud storage, and scalable hosting.  
- **AI integration**: Instead of hardcoding itineraries, Gemini API generates flexible, context-aware plans that are different for each trip.  
- **Authentication flow**: Google Sign-In was chosen for simplicity and security, reducing friction compared to traditional login forms.  
- **Optimistic UI**: When deleting trips, the UI updates immediately while the database call completes in the background. This makes the app feel fast and modern.  

---

## Challenges
- **Handling async API calls**: Fetching itineraries and images required careful use of async/await and React hooks.  
- **Synchronizing login state**: The app had to update UI in real-time when users log in or out, which I solved with localStorage + custom events.  
- **Data consistency**: Ensuring that trip IDs were stored properly in Firestore so links like `/view-trip/:id` always worked.  
- **UI/UX decisions**: Designing the Hero page so it looks different for signed-in and signed-out states.  

---

## Future Improvements
- **Backend expansion**: Add a FastAPI or Node.js backend for more advanced logic, including trip cost calculations.  
- **Collaboration features**: Allow multiple users to plan and share a trip together.  
- **Maps integration**: Embed interactive maps directly instead of linking out to Google Maps.  
- **Offline mode**: Cache itineraries so they can be viewed without an internet connection.  
- **Better error handling**: Display friendly messages if API calls fail.  

---

## Reflections
Working on this project allowed me to apply almost every topic covered in CS50:
- **Web development**: React and modern frontend practices.  
- **Databases**: Firestore queries, filtering, and document deletion.  
- **Authentication**: Secure login via OAuth.  
- **Asynchronous programming**: Managing API calls and user feedback without blocking the UI.  
- **Software engineering principles**: Modular components, reusable functions, and separation of concerns.  

I learned how to design an application that feels modern, responsive, and user-friendly. The process also taught me the importance of state management, handling async code, and integrating third-party APIs responsibly.  

Most importantly, this project gave me confidence to continue building full-stack applications and experimenting with AI integration in real-world use cases.  

---

## Acknowledgements
- Thanks to the CS50 staff and community for the resources and support.  
- Thanks to Firebase and Unsplash for providing free developer-friendly services.  
- Thanks to OpenAI Gemini for powering the AI itinerary generation.  

---

#### End
This is CS50.
