
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const IndexContent = () => {
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Virtual Classroom
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A dynamic learning environment where students and teachers connect, 
            track progress, and celebrate achievements together.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
