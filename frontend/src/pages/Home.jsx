import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Green background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-green-900 opacity-70"></div>
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Green nature background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-16 sm:py-24 lg:py-32">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
          Welcome to Task Zero
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-green-100 mb-10">
          Organize your tasks efficiently and boost your productivity with our
          intuitive task management system.
        </p>

        {/* Login Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 -mr-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
