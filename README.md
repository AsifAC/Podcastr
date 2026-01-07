# Podcastr

Generate your podcasts using AI. A modern podcast platform built with Next.js, Convex, and OpenAI.

## Features

- 🎙️ **AI-Powered Podcast Generation** - Create podcasts using OpenAI's text-to-speech
- 🎨 **Custom Thumbnails** - Generate podcast thumbnails with AI
- 🔍 **Discover & Search** - Browse and search through trending podcasts
- 👤 **User Profiles** - Create and manage your podcast profile
- 🎵 **Audio Player** - Built-in audio player with playback controls
- 🔐 **Authentication** - Secure authentication with Clerk
- 📱 **Responsive Design** - Beautiful UI that works on all devices

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Backend:** [Convex](https://www.convex.dev/)
- **Authentication:** [Clerk](https://clerk.com/)
- **AI:** [OpenAI](https://openai.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Carousel:** [Embla Carousel](https://www.embla-carousel.com/)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Convex account
- Clerk account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd podcastr
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOY_KEY=your_convex_deploy_key

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

OPENAI_API_KEY=your_openai_api_key
```

4. Set up Convex:
```bash
npx convex dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
podcastr/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/      # Sign in page
│   │   └── sign-up/      # Sign up page
│   ├── (root)/           # Main application routes
│   │   ├── create-podcast/  # Create podcast page
│   │   ├── discover/     # Discover podcasts page
│   │   ├── podcasts/     # Podcast detail pages
│   │   └── profile/      # User profile pages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Carousel.tsx     # Podcast carousel
│   ├── GeneratePodcast.tsx  # Podcast generation form
│   ├── PodcastCard.tsx  # Podcast card component
│   ├── PodcastPlayer.tsx # Audio player
│   └── ...              # Other feature components
├── convex/              # Convex backend
│   ├── podcasts.ts     # Podcast queries/mutations
│   ├── users.ts        # User queries/mutations
│   ├── openai.ts       # OpenAI integration
│   ├── files.ts        # File storage handling
│   └── schema.ts       # Database schema
├── lib/                 # Utility functions
│   ├── formatTime.ts  # Time formatting utilities
│   ├── useDebounce.ts # Debounce hook
│   └── utils.ts       # General utilities
├── providers/          # React context providers
│   ├── AudioProvider.tsx      # Audio player context
│   └── ConvexClerkProvider.tsx # Convex + Clerk integration
├── public/             # Static assets
│   ├── icons/         # SVG icons
│   └── images/        # Image assets
└── types/             # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Podcast Generation
- Create podcasts with custom titles and descriptions
- Choose from multiple AI voices (Alloy, Echo, Fable, Onyx, Nova, Shimmer)
- Generate custom thumbnails with AI image generation
- Upload and manage audio files with Convex storage

### Discovery
- Browse trending podcasts sorted by views
- Search by title, author, or description
- View podcast details and play episodes
- Responsive grid layout for podcast cards

### User Profiles
- Create and customize your profile
- View your podcast collection
- Track your podcast statistics and views

### Audio Player
- Play/pause controls
- Seek through audio
- Volume control
- Progress tracking
- Multiple podcast support

## Database Schema

The application uses Convex with the following main tables:

- **podcasts**: Stores podcast data including title, description, audio/image URLs, author info, and metadata
- **users**: Stores user information linked to Clerk authentication

## License

See (LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

