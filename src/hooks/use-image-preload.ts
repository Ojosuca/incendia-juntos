/**
 * Hook para pré-carregar imagens críticas
 * Melhora o LCP (Largest Contentful Paint) carregando imagens importantes antes
 */

import { useEffect } from "react";

export const useImagePreload = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });

    // Cleanup
    return () => {
      imageUrls.forEach((url) => {
        const links = document.querySelectorAll(`link[href="${url}"]`);
        links.forEach((link) => link.remove());
      });
    };
  }, [imageUrls]);
};
