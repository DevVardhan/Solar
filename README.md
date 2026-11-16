# ☀️ SandhyaSolar

Fullstack web application for **SandhyaSolar** featuring a modern React frontend and an Express/Node.js CMS backend with authentication, blog management, and image library.

---

## 🏗️ Architecture

- **Frontend (`/`)**: React 18, Vite, TypeScript, Tailwind CSS, React Router, Lucide icons, Axios.
- **Backend (`/server`)**: Node.js, Express, MongoDB (Mongoose), JWT authentication in HTTP-only cookies, Cloudinary image storage, Helmet & CORS protection.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI
- Cloudinary account for media uploads

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MONGO_URI, JWT_SECRET, Cloudinary credentials, and CLIENT_ORIGIN
npm run dev
```

To initialize your first Super Admin account:
```bash
# In server directory, configure SUPER_ADMIN_NAME, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD in .env
npm run create-super-admin
```

### 3. Frontend Setup
```bash
# In the root directory:
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm run dev
```

The frontend will run at `http://localhost:5173`.

---

## 🌐 Production Hosting Guide

### Deploying Frontend (Vercel / Netlify)
1. **Connect Repository**: Import the repository in Vercel or Netlify.
2. **Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_URL`: Your deployed backend API URL (e.g. `https://your-backend.onrender.com/api`)
4. **SPA Routing**:
   - Pre-configured via `vercel.json` and `public/_redirects` so all client-side routes (`/blogs`, `/admin`, `/super-admin`, etc.) work without 404s.

---

### Deploying Backend (Render / Railway)
1. **New Web Service**: Connect your GitHub repository.
2. **Root Directory**: `server`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or leave default assigned by platform)
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A long, secure random secret key
   - `JWT_EXPIRES_IN`: `7d`
   - `CLIENT_ORIGIN`: Your deployed frontend URL, e.g. `https://sandhyasolar.vercel.app` (comma-separated if multiple)
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API Key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret
6. **Create Super Admin**:
   - In Render/Railway shell or locally with production `MONGO_URI`:
     ```bash
     npm run create-super-admin
     ```

---

## 🔐 Admin Routes
- **Public Blog**: `/blogs`, `/blogs/:slug`
- **Content Admin Login**: `/admin/login`
- **Content Admin Dashboard**: `/admin`
- **Super Admin Login**: `/super-admin/login`
- **Super Admin Dashboard**: `/super-admin`
- **Manage Admins**: `/super-admin/content-admins`
