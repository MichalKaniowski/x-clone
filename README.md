# Thread Based Social App

This is a full-stack, feature-rich thread based social app inspired by X (formerly Twitter) built with modern web technologies. It replicates many of the core functionalities of the platform, providing a complete user experience from authentication and posting to user interaction and notifications.

## Features

- **Authentication**:

  - Email & password signup and login using Lucia Auth.
  - OAuth 2.0 integration with Google.
  - Password reset functionality via email (SendGrid & React Email).

- **Core Social Functionality**:

  - "For You" and "Following" feeds on the main page.
  - Create posts with text, hashtags, and @mentions.
  - Attach up to 5 media files (images/videos) to posts, handled by UploadThing.
  - Like, comment on, and bookmark posts.
  - View post detail pages with their full comment threads.
  - Infinite scrolling for seamless content discovery.

- **User Profiles & Interaction**:

  - Displaying user profiles: avatar, banner, bio, and stats.
  - Follow and unfollow other users.
  - Edit your own profile, including an image cropper for avatars and banners.

- **Discovery & Notifications**:

  - Notifications for new likes, comments, and follows.
  - An unread notification indicator in the main menu.
  - Full-text search for posts and users.
  - "Who to Follow" and "Trending Topics" sidebars for content discovery.

- **UI/UX**:
  - Responsive design for both desktop and mobile devices.
  - Switch between Light and Dark themes.
  - Modern UI built with Tailwind CSS and Shadcn/UI.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Lucia Auth
- **Styling**: Tailwind CSS & Shadcn/UI
- **Data Fetching & State**: TanStack Query (React Query)
- **File Uploads**: UploadThing
- **Forms**: React Hook Form with Zod for validation
- **Email**: SendGrid & React Email

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- Node.js (v20 or later)
- npm, yarn, or pnpm
- A running PostgreSQL database instance

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MichalKaniowski/Thread-Based-Social-App.git
    cd Thread-Based-Social-App
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables.

    ```dotenv
    # Your PostgreSQL connection string
    DATABASE_URL=""

    # Google OAuth Credentials
    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""

    # Base URL of your application, in case of local development use http://localhost:3000
    NEXT_PUBLIC_BASE_URL="http://localhost:3000"

    # UploadThing Credentials
    UPLOADTHING_TOKEN=""
    UPLOADTHING_SECRET=""

    # SendGrid API Key (for password reset emails)
    SENDGRID_API_KEY=""
    ```

4.  **Sync your database:**

    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
