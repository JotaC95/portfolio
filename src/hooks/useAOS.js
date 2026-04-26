import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
      delay: 0,
    });

    // Refresh AOS on dynamic content changes
    return () => {
      AOS.refresh();
    };
  }, []);
};
