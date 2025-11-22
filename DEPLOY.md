# Netlify Deployment Guide

## Quick Setup

1. **Connect your repository to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider (GitHub, GitLab, etc.)

2. **Build Settings** (should auto-detect from `netlify.toml`)
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
   - Base directory: Leave empty (root)

3. **Important: Disable Submodules**
   - In Netlify dashboard: Site settings → Build & deploy → Environment
   - Add environment variable: `NETLIFY_IGNORE_SUBMODULES` = `true`
   - OR in Build settings, uncheck "Checkout submodules"

4. **Deploy!**
   - Netlify will automatically deploy when you push to your main branch

## Manual Configuration (if auto-detect doesn't work)

If Netlify doesn't auto-detect the settings, manually configure:

- **Base directory**: Leave empty (root)
- **Build command**: `cd frontend && npm install && npm run build`
- **Publish directory**: `frontend/dist`
- **Node version**: 18 (set in environment variables)

## Troubleshooting

### Issue: "No url found for submodule path 'frontend' in .gitmodules"

This error occurs when Netlify tries to check out submodules. To fix:

**Option 1: Disable submodules in Netlify (Recommended)**
1. Go to Site settings → Build & deploy → Environment
2. Add environment variable: `NETLIFY_IGNORE_SUBMODULES` = `true`
3. Or in Build settings, uncheck "Checkout submodules"

**Option 2: Remove submodule references (if they exist)**
```bash
# Check if frontend is tracked as submodule
git ls-files --stage frontend

# If it shows mode 160000, it's a submodule. Remove it:
git rm --cached frontend
git add frontend
git commit -m "Remove frontend submodule reference"
```

**Option 3: Restructure (if above doesn't work)**
Move all frontend files to root:
```bash
# Move frontend files to root
mv frontend/* .
mv frontend/.* . 2>/dev/null || true
rmdir frontend
# Update netlify.toml to remove "cd frontend" from command
```

### Issue: Build fails

1. Make sure Node.js version is set to 18 or higher in Netlify
2. Check build logs for specific errors
3. Ensure all dependencies are in `frontend/package.json`
4. Verify the build command works locally: `cd frontend && npm install && npm run build`

### Issue: Routes not working (404 errors)

The `netlify.toml` file includes redirect rules for SPA routing. If routes still don't work:
- Check that `netlify.toml` is in the root directory
- Verify the redirect rules are correct
- Make sure the `_redirects` file is in `frontend/dist` (Vite should handle this)

## Environment Variables

If you need to set environment variables:
1. Go to Site settings → Environment variables
2. Add your variables (e.g., `VITE_API_URL` for API endpoint)
3. Prefix with `VITE_` for Vite to expose them to the frontend

## Custom Domain

1. Go to Domain settings
2. Add your custom domain
3. Follow Netlify's DNS configuration instructions
