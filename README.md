# 🍽️ NextLevel Food - Food Sharing Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/AWS_S3-Storage-orange?style=for-the-badge&logo=amazon-aws" alt="AWS S3" />
  <img src="https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite" alt="SQLite" />
</p>

<p align="center">
  <strong>A modern platform where food enthusiasts discover, share, and celebrate culinary creativity.</strong>
</p>

---

## 🌟 Overview

NextLevel Food is a web application built with Next.js that allows users to discover, share, and discuss delicious meal recipes. It's a platform for food enthusiasts to connect, explore new dishes, and share their culinary creations with a vibrant community.

### ✨ What Makes It Special

- **Recipe Sharing**: Easy-to-use interface for sharing your favorite recipes
- **Image Storage**: Secure cloud storage with AWS S3 integration
- **Responsive Design**: Beautiful experience across all devices
- **Server-Side Rendering**: Fast loading with Next.js optimization
- **Community Focus**: Built for food lovers to connect and share

---

## 🚀 Current Features

### 🔍 **Browse & Discover**
- Browse collection of meal recipes
- View detailed recipe information including ingredients and instructions
- Creator information for each recipe
- Dynamic image slideshow on homepage

### 📝 **Recipe Management**
- Share your own recipes through intuitive form
- Edit and delete your submitted meals
- Image upload with preview functionality
- Form validation for recipe submission

### 🎨 **User Experience**
- Loading states and error handling
- Toast notifications for user actions
- Responsive design optimized for mobile
- Clean, modern interface with CSS Modules

### 🔧 **Technical Features**
- Server-side rendering for optimal SEO
- API routes for backend functionality (CRUD operations)
- Secure image uploads to AWS S3
- Input sanitization for security

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js** - React framework with App Router
- **React** - Component library with hooks  
- **CSS Modules** - Scoped styling architecture

### **Backend**
- **Next.js API Routes** - Server-side logic
- **Node.js** - Runtime environment
- **better-sqlite3** - Embedded SQLite database
- **formidable** - File upload handling

### **External Services**
- **AWS S3** - Image storage and delivery

### **Utilities**
- **slugify** - URL-friendly slug generation
- **xss** - Input sanitization for security
- **react-toastify** - User notifications

---

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:
- **Node.js** 18.x or later
- **npm** or **yarn**
- **AWS Account** with S3 bucket access

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/nextlevel-food.git
cd nextlevel-food

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Configuration

Create a `.env.local` file in your project root:

```env
# AWS S3 Configuration
AWS_REGION=your-aws-s3-bucket-region
S3_BUCKET=your-s3-bucket-name

# Note: AWS credentials should be configured via AWS CLI, IAM roles, 
# or environment variables for security best practices
# AWS_ACCESS_KEY_ID=your-access-key (if needed for local development)
# AWS_SECRET_ACCESS_KEY=your-secret-key (if needed for local development)
```

**Important:** Configure your S3 bucket with:
- Public read access for recipe images
- Proper CORS settings if needed
- Write permissions for your application

### 3. Database Setup

```bash
# Initialize SQLite database with sample data
node initdb.js
```

This creates a `meals.db` file in your project root with sample recipes.

### 4. Launch Development Server

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 📂 Project Structure

```
nextlevel-food/
├── app/                    # Next.js App Router
│   ├── api/               # API route handlers
│   │   └── meals/         # Meal CRUD operations
│   ├── meals/             # Recipe-related pages
│   │   ├── [slug]/        # Dynamic recipe routes
│   │   │   ├── edit/      # Recipe editing page
│   │   │   └── page.js    # Recipe detail page
│   │   ├── share-meal/    # Recipe creation page
│   │   └── page.js        # Recipe listing page
│   ├── community/         # Community page
│   ├── layout.js          # Root layout
│   ├── page.js            # Homepage
│   ├── loading.js         # Loading UI components
│   ├── error.js           # Error boundaries
│   └── not-found.js       # 404 page
├── components/            # Reusable components
│   ├── main-header/       # Header and navigation
│   ├── meals/             # Recipe-related components
│   ├── images/            # Image components (slideshow)
│   └── shared/            # Common components
├── services/              # Business logic
│   ├── APImeals.js        # Database operations
│   └── actions.js         # Server actions
├── hooks/                 # Custom React hooks
│   └── useFetchMeal.js    # Meal fetching logic
├── utils/                 # Utility functions
│   ├── formValidator.js   # Form validation
│   ├── tostify.js         # Toast notifications
│   └── uploadImageToS3.js # S3 upload utilities
├── assets/                # Static assets
├── public/                # Public static files
└── initdb.js              # Database initialization
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server

# Database
node initdb.js           # Initialize SQLite database with sample data
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Vercel will automatically detect Next.js configuration

2. **Configure Environment Variables**
   Set these in your Vercel dashboard:
   - `AWS_REGION`
   - `S3_BUCKET`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

3. **Deploy**
   - Automatic deployment on push to main branch
   - Manual deployment via Vercel CLI: `vercel --prod`

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start

# Ensure your production environment has:
# - Node.js 18+ installed
# - Environment variables configured
# - Database file (meals.db) initialized
```

---

## 🔒 Security & Performance

### **Security Features**
- **XSS Protection**: Input sanitization with `xss` library
- **File Upload Security**: Image type and size validation
- **Environment Variables**: Secure credential management
- **Safe URLs**: `slugify` for URL generation

### **Performance Features**
- **Server-Side Rendering**: Fast initial page loads with Next.js
- **Image Optimization**: Automatic Next.js image optimization
- **Static Generation**: Pre-built pages where possible
- **CDN Integration**: Fast global image delivery via AWS S3

---

## 🔮 Future Enhancements

The following features could be added to enhance the platform:

### **User System**
- User authentication and profiles
- Recipe ownership and permissions
- User following and social features

### **Enhanced Discovery**
- Search functionality with filters
- Recipe categories and tags
- Rating and review system

### **Advanced Features**
- Recipe collections and meal planning
- Nutritional information display
- Recipe sharing to social media
- Mobile app development

### **Technical Improvements**
- Migration to TypeScript
- Comprehensive testing suite
- Advanced caching strategies
- Database migration to PostgreSQL

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Install dependencies**: `npm install`
4. **Make your changes** and test thoroughly
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style and structure
- Test your changes thoroughly
- Update documentation as needed
- Write clear, descriptive commit messages

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

If you have questions or need help:
- **Issues**: [GitHub Issues](https://github.com/yourusername/nextlevel-food/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/nextlevel-food/discussions)

---

<p align="center">
  <strong>Built with ❤️ by food enthusiasts, for food enthusiasts</strong>
</p>
