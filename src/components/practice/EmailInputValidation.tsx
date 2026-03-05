import { useState } from 'react';

export default function EmailInputValidation() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  // Simple email validation regex
  const isValidEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValid = isValidEmail(email);
  const showError = touched && !isValid;

  const handleBlur = () => {
    setTouched(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      console.log('Submitted email:', email);
      // Handle form submission here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            showError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          placeholder="Enter your email"
        />
        {showError && (
          <p className="text-red-500 text-sm mt-2">
            Please enter a valid email address
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full px-4 py-2 rounded-lg font-medium transition ${
          isValid
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </form>
  );
}
