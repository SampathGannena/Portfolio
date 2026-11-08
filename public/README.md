# Public Assets Folder

This folder contains static assets that will be publicly accessible in your portfolio.

## 📸 Profile Image

**Add your professional photo here:**

1. Save your professional headshot as `profile.jpg` in this folder
2. **Recommended specifications:**
   - Size: 500x500 pixels (square)
   - Format: JPG or PNG
   - File size: < 500KB (optimized)
   - Professional lighting and background
   - High resolution for sharp display

**Path:** `c:\portfolio\public\profile.jpg`

Once added, the image will automatically display in the Executive Mode section.

## 📁 Other Assets You Can Add Here

- **Favicon:** `favicon.ico` - Your site icon
- **Resume:** `resume.pdf` - Downloadable resume
- **Project images:** Create subfolders like `projects/` for project screenshots
- **Company logos:** `logos/` folder for companies you've worked with
- **Certificates:** `certificates/` for achievement badges

## 🔍 How to Access

Files in the `public` folder are served from the root URL:
- `public/profile.jpg` → accessible at `/profile.jpg`
- `public/resume.pdf` → accessible at `/resume.pdf`

## 📝 Next Steps

1. Add your professional photo as `profile.jpg`
2. Uncomment the Image component in `components/modes/ExecutiveMode.tsx` (around line 233)
3. Remove or comment out the placeholder div
