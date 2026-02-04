
import { MediaItem } from '../types';

const MEDIA_KEY = 'rh_media_library';
const MASCOT_IMAGE_URL = "https://i.ibb.co/Lzr9P8P/reptile-house-mascot.jpg";

export const mediaService = {
  getImages: (): MediaItem[] => {
    const data = localStorage.getItem(MEDIA_KEY);
    const images = data ? JSON.parse(data) : [];
    
    // Seed initial mascot image if library is empty
    if (images.length === 0) {
        const seedImage: MediaItem = {
            id: 'mascot-default',
            url: MASCOT_IMAGE_URL,
            name: 'Reptile House Logo.jpg',
            size: '1.2 MB',
            date: new Date().toLocaleDateString('ar-SY')
        };
        localStorage.setItem(MEDIA_KEY, JSON.stringify([seedImage]));
        return [seedImage];
    }
    
    return images;
  },

  uploadImage: (file: File): Promise<MediaItem> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const newImage: MediaItem = {
          id: `img-${Date.now()}`,
          url: base64,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          date: new Date().toLocaleDateString('ar-SY'),
        };

        const images = mediaService.getImages();
        localStorage.setItem(MEDIA_KEY, JSON.stringify([newImage, ...images]));
        resolve(newImage);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  deleteImage: (id: string) => {
    const images = mediaService.getImages().filter(img => img.id !== id);
    localStorage.setItem(MEDIA_KEY, JSON.stringify(images));
    return images;
  }
};
