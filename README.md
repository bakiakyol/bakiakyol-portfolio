# Portfolio

A modern portfolio website built with Next.js and Sanity CMS.

## Features

- Responsive design with Tailwind CSS
- Content management with Sanity CMS
- Smooth animations with Framer Motion
- Optimized image handling
- TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **CMS**: Sanity
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Sanity Studio

Access the studio at [http://localhost:3000/studio](http://localhost:3000/studio)

### Content Types

- **About** - About me section (singleton)
- **Experience** - Work experience
- **Project** - Portfolio projects with images
- **Certificate** - Certifications

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/             # React components
├── sanity/
│   ├── lib/               # Sanity client & utilities
│   ├── schemaTypes/       # Content schemas
│   └── structure.ts       # Studio customization
└── public/                # Static assets
```

## License

MIT
