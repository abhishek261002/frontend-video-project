# frontend-video-project

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/abhishek261002/frontend-video-project/pulls)

Elevator pitch
- A React + Vite frontend for a video platform — upload, stream, manage videos and playlists, comment, like/dislike, and subscribe to channels. Built with modern React patterns, Redux Toolkit, Tailwind CSS and integrations for cloud/video handling and speech recognition to accelerate building a YouTube-like experience.

Architecture & Tech Stack
- Framework: React 18 (Vite + @vitejs/plugin-react)
- Styling: Tailwind CSS + PostCSS, custom CSS
- State Management: Redux Toolkit + redux-persist
- HTTP & APIs: axios
- Media & Cloud: Cloudinary, cloudinary-video-player
- UI primitives: Radix UI primitives, Mantine components
- Speech & AI: @speechly speech polyfill, react-speech-recognition, OpenAI (present in deps)
- Routing: react-router-dom
- Tooling: ESLint, Vite, PostCSS, Tailwind CSS

High-level architecture
```mermaid
flowchart LR
  Browser --> ViteDevServer["Vite Dev Server"]
  ViteDevServer --> ReactApp["React (src/)"]
  ReactApp -->|API calls (axios)| Backend["Backend API (BASE_URL)"]
  ReactApp -->|Auth state| Redux["Redux Toolkit Store"]
  ReactApp -->|Cloud uploads| Cloudinary["Cloudinary"]
  ReactApp -->|Video player| CloudinaryPlayer["cloudinary-video-player"]
  ReactApp -->|Speech| SpeechLib["Speechly / react-speech-recognition"]
  subgraph Frontend
    ReactApp
    Redux
    CloudinaryPlayer
  end
  Backend --> Database["Database / Media Storage"]
```

Core features
- Browse and search all videos with server-side search support.
- Upload videos with metadata (title, description, thumbnail) and track upload progress.
- Stream videos (backend-powered streaming endpoint).
- Channel pages showing videos for a specific username.
- Create, edit and manage playlists and playlist items.
- Like / dislike, subscribe to channels, and comment on videos.
- Watch history tracking (push to history).
- Video summary generation endpoint integration (transcript summary).
- Authentication flows: signup, login, logout and persistent auth state.
- Responsive layout with header, footer, and reusable UI primitives/components.

Installation & Setup

Prerequisites
- Node.js 18+ and npm (or yarn)
- Optional: Cloudinary account for media hosting and a running backend API matching the BASE_URL in src/conf/conf.js

Clone, install, run (bash)
```bash
# Clone the repository
git clone https://github.com/abhishek261002/frontend-video-project.git
cd frontend-video-project

# Install dependencies
npm install
# or
# yarn

# Start development server
npm run dev
# Open http://localhost:5173 (or the port Vite reports)
```

Build and preview
```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

Configuration
- Default API base URL is set in src/conf/conf.js:
```js
export const BASE_URL = "https://backendproject-1-avm7.onrender.com/api/v1";
```
- If you need to target a different backend, edit src/conf/conf.js or inject environment-based configuration in your preferred way.
- Cloudinary / upload credentials are expected to be handled by the backend or environment-specific config depending on your deployment.

Usage examples

Start dev server
```bash
npm run dev
```

Typical flows available in UI
- Sign up or log in to create/upload videos, like, comment and subscribe.
- Navigate to "Upload" to submit a video file, thumbnail and metadata — progress is shown in console/logs.
- Visit a channel page to view all videos for that user.
- Use the search input in header to filter videos by title (query forwarded to backend).

Project structure (selected)
- src/
  - main.jsx — app entry
  - App.jsx — routing and top-level layout
  - components/ — small reusable UI pieces and domain components (video player, upload, playlist, header, footer, dialogs)
  - pages/ — route-level pages (AllVideos, Channel, VideoUpload, Login, Signup, etc.)
  - services/ — API wrappers (auth.service.js, video.service.js, playlist.service.js, comment.service.js, like.service.js, subscription.service.js)
  - store/ — Redux Toolkit slices and store setup
  - conf/conf.js — API endpoint configuration
  - lib/utils.js — shared helper functions

Development notes
- The project uses FormData for media uploads and configures axios to send credentials for auth-protected endpoints.
- Redux state is persisted via redux-persist; review src/store/store.js and authSlice/videoSlice for persisted keys.
- UI primitives use Radix UI and a custom set of UI components inside src/components/ui.

Contributing
- Contributions, issues and feature requests are welcome.
- Please open a PR with a clear description and tests or manual verification steps where applicable.
- Keep code style consistent with the existing patterns (React functional components, hooks, and Redux Toolkit usage).

License
- MIT License. See the LICENSE file or https://opensource.org/licenses/MIT.
