Rocket League Tournaments Viewer is a React application that allows users to browse upcoming Rocket League tournaments by region.

The application consumes data from the Rocket League API available through RapidAPI. Due to strict rate limits and browser CORS restrictions, the project includes a mock data mode that mirrors the live API structure to ensure stable local development.

This project demonstrates component architecture, asynchronous data fetching, state management, caching strategies, and API abstraction.

⸻

Features
• Select tournament region (NA, EU, ASIA, SAM, OCE)
• Manual data fetching (prevents unnecessary API calls)
• Loading state handling
• Error state handling
• Empty data handling
• Region-based in-memory caching
• Component-based UI structure
• Environment-controlled mock vs live mode

⸻

Tech Stack
• React
• Vite
• JavaScript (ES Modules)
• RapidAPI (Rocket League API)
• CSS

⸻

Application Architecture

The application is structured with separation of concerns in mind:

App.jsx
• Manages application state
• Controls loading and error states
• Implements region-based caching
• Coordinates data flow between components

RegionSelector
• Handles user region selection
• Triggers manual data fetch

TournamentList
• Renders the list of tournaments

TournamentCard
• Displays individual tournament details

services/api.js
• Abstracts API logic from UI
• Handles mock and live modes
• Filters mock data by region
• Manages external API requests

⸻

API Used

Rocket League API via RapidAPI

Endpoint format:

```
GET https://rocket-league1.p.rapidapi.com/tournaments/{region}
```

Required headers:

```
X-RapidAPI-Key
X-RapidAPI-Host
```

### Rate Limits

The free tier allows only 5 requests per day.

To prevent exceeding the limit:

- Data fetching is manual (not automatic on render)
- Results are cached per region using `useRef`
- Mock mode is enabled by default

---

Mock Mode vs Live Mode

The application supports two execution modes controlled by environment variables.

### Default (Mock Mode )

```
VITE_USE_MOCK=true
```

- Uses local mock data
- No external API calls
- Fully functional and stable

### Live Mode (Optional)

Create a `.env.local` file in the project root:

```
VITE_USE_MOCK=false
VITE_RAPIDAPI_KEY=your_api_key_here
```

Restart the development server after changing environment variables:

```
npm run dev
```

Note: The live API cannot be called directly from the browser due to CORS restrictions. However, the API can be verified using curl or Postman.

Example verification via curl:

```
curl --request GET \
  --url https://rocket-league1.p.rapidapi.com/tournaments/NA \
  --header "X-RapidAPI-Key: YOUR_KEY" \
  --header "X-RapidAPI-Host: rocket-league1.p.rapidapi.com"
```

---

Installation

Clone the repository:

```
git clone <your-repo-url>
cd rl-tournaments
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

---

Design Decisions

- Manual fetch was chosen to prevent accidental API rate limit exhaustion.
- Region-based caching was implemented using `useRef` to persist data without triggering re-renders.
- Mock data mirrors the live API structure to maintain consistent UI behavior.
- API logic is isolated in a service layer to improve maintainability and testability.

---

Known Limitations

- The live API cannot be accessed directly from the browser due to CORS policy restrictions.
- The free API tier has strict daily request limits.
- No pagination is implemented.
- No backend proxy server is included.

---

Future Improvements

- Implement a backend proxy to fully enable live API browser calls.
- Add pagination or filtering options.
- Improve responsive styling.
- Add unit testing.
- Deploy the application.
