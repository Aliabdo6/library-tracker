# Personal Library Tracker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

**Personal Library Tracker** is a web application designed to help users catalog and track their personal book collection. Whether it's books you own, have read, or plan to read in the future, this app makes it easy to organize your library. Users can categorize books, mark them as read, and even write reviews.

## Features

- **User Authentication**: Secure user authentication implemented using Clerk.
- **CRUD Operations**: Create, read, update, and delete entries for books in your library.
- **Categorization and Tagging**: Organize your books by categories and add tags for easy filtering.
- **Rating and Review System**: Rate the books you've read and leave detailed reviews.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aliabdo6/library-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd library-tracker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables for MongoDB and Clerk by creating a `.env.local` file:
   ```bash
   NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API>
   MONGODB_URI=<Your MongoDB URI>
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

### Building for Production

To build the app for production, run:

```bash
npm run build
```

Then, start the production server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, feel free to reach out via the GitHub issues page or contact me directly.
