# Baki Akyol Portfolio

Next.js ve Sanity CMS ile oluşturulmuş modern portfolio sitesi.

## Özellikler

- 📱 **Responsive Design** - Tüm cihazlarda uyumlu
- 🎨 **Modern UI** - Framer Motion animasyonları
- 📝 **Sanity CMS** - Dinamik content yönetimi
- 🖼️ **Image Optimization** - Next.js Image component
- 🎯 **Smooth Scrolling** - Lenis scroll library
- 🌙 **Accessibility** - WCAG uyumlu

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **CMS**: Sanity
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Setup

### 1. Environment Variables

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Dependencies Yükleyin

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

`http://localhost:3000` açıp kontrol edin.

## Sanity CMS

### Studio Erişimi

```
http://localhost:3000/studio
```

### Veri Türleri

- **About** - Hakkımda (singleton)
- **Experience** - Deneyimler
- **Project** - Projeler (görseller dahil)
- **Certificate** - Sertifikalar

## Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Vercel Deploy

1. GitHub'a push edin
2. Vercel'e connect edin
3. Environment variables ayarlayın
4. Deploy!

### Production Ayarları

`src/sanity/lib/client.ts` dosyasında:

```typescript
useCdn: true // Production için CDN aktif
```

## File Structure

```
src/
├── app/                    # Next.js app directory
├── components/             # React components
├── sanity/
│   ├── lib/               # Sanity utilities
│   ├── schemaTypes/       # CMS schemas
│   └── structure.ts       # Studio structure
└── public/                # Static files
```

## License

© 2026 Baki Akyol. Tüm hakları saklıdır.
