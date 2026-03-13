import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * Este componente escuta as mudanças de localização (rota) e garante que
 * a página seja rolada para o topo sempre que o usuário navegar.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola para o topo do documento
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
