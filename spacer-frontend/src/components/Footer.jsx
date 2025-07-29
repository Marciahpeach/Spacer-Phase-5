function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Spacer. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
            Terms of Service
          </a>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
