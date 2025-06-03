# Blog Admin UI

A modern blog administration interface built with Next.js 15, TypeScript, and ShadCN UI components.

## Features

- **Admin Authentication**: Simple frontend-only login system
- **Blog Creation**: Rich form for creating blog posts with validation
- **Blog Management**: View and manage existing blog posts
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Built with ShadCN UI components

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
# Edit .env.local with your API base URL
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

- Username: `admin`
- Password: `password`

## API Integration

The application expects a REST API with the following endpoints:

- `POST /blogs` - Create a new blog post
- `GET /blogs?page=1&perPage=15` - Fetch blog posts with pagination

## Environment Variables

- `NEXT_PUBLIC_BASE_URL` - Base URL for your API (default: http://localhost:3001)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- ShadCN UI Components
- Tailwind CSS
- Zod (Form Validation)
- Lucide React (Icons)
