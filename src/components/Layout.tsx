import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Building2, CreditCard, LogOut, User as UserIcon } from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-gray-900">
                <CreditCard className="h-6 w-6 mr-2" />
                <span className="font-semibold">Business Card Manager</span>
              </Link>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link
                    to="/businesses"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Building2 className="h-5 w-5 inline mr-1" />
                    Businesses
                  </Link>
                )}
                <Link
                  to="/cards"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <CreditCard className="h-5 w-5 inline mr-1" />
                  Cards
                </Link>
                <div className="flex items-center space-x-2 text-gray-700">
                  <UserIcon className="h-5 w-5" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-900 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 inline mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}