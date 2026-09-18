import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api/axios';

interface GalleryImage {
  _id: string;
  url: string;
  title: string;
}

export default function Gallery() {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  React.useEffect(() => {
    api.get('/images').then((res) => {
      setImages(res.data);
      setLoading(false);
    });
  }, []);

  const showPrev = React.useCallback(
    () => setCurrentIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const showNext = React.useCallback(
    () => setCurrentIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  // Escape to close the fullscreen view, arrow keys to page through —
  // works whether the lightbox is open or you're just browsing the
  // carousel on the page itself.
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showPrev, showNext]);

  // Prevent background scroll while the fullscreen lightbox is open
  React.useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  if (loading || images.length === 0) return null; // no hardcoded fallback content

  const current = images[currentIndex];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Our Solar Installations</h2>
        {images.length > 1 && (
          <p className="text-center text-sm text-gray-500 mb-10">
            {currentIndex + 1} / {images.length}
          </p>
        )}

        <div className="relative max-w-3xl mx-auto">
          <button
            onClick={() => setLightboxOpen(true)}
            className="block w-full rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <img
              src={current.url}
              alt={current.title || 'Solar installation'}
              className="w-full h-[420px] object-contain bg-white"
            />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-gray-700 hover:text-black transition"
              >
                <ChevronLeft className="h-10 w-10" strokeWidth={2.5} />
              </button>
              <button
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-700 hover:text-black transition"
              >
                <ChevronRight className="h-10 w-10" strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)} // click outside (the backdrop) closes
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
                aria-label="Next image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          {/* stopPropagation so clicking the image itself doesn't close the modal */}
          <img
            src={current.url}
            alt={current.title || 'Solar installation'}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
