
const Footer = () => {
  return (
    <footer className="bg-regal-700 text-white">

        {/* Ligne de séparation */}
        <div className="border-t border-white/10 my-16 p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <div>
              © {new Date().getFullYear()} ModeRegal. Tous droits réservés.
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
              <a href="#" className="hover:text-white transition-colors">Conditions Générales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Accessibilité</a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-christi-400">Made with</span>
              <span className="text-2xl">❤️</span>
              <span className="text-christi-400">au Bénin</span>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;