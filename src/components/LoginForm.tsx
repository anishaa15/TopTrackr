
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LoginForm = () => {
  const [teacherCredentials, setTeacherCredentials] = useState({ username: '', password: '' });
  const [studentCredentials, setStudentCredentials] = useState({ username: '', password: '' });
  const { login } = useAuth();

  const handleLogin = (role: 'teacher' | 'student') => {
    const credentials = role === 'teacher' ? teacherCredentials : studentCredentials;
    
    if (!credentials.username || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = login(credentials.username, credentials.password, role);
    
    if (success) {
      toast.success(`Welcome back, ${role}!`);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="student" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Student
          </TabsTrigger>
          <TabsTrigger value="teacher" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Teacher
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Student Login</CardTitle>
              <CardDescription className="text-gray-600">
                Access your virtual classroom and track your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-username">Username</Label>
                <Input
                  id="student-username"
                  type="text"
                  placeholder="Enter your username"
                  value={studentCredentials.username}
                  onChange={(e) => setStudentCredentials({...studentCredentials, username: e.target.value})}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-password">Password</Label>
                <Input
                  id="student-password"
                  type="password"
                  placeholder="Enter your password"
                  value={studentCredentials.password}
                  onChange={(e) => setStudentCredentials({...studentCredentials, password: e.target.value})}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                onClick={() => handleLogin('student')} 
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In as Student
              </Button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Demo: username: <strong>student1</strong>, password: <strong>password</strong>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teacher">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-800">Teacher Login</CardTitle>
              <CardDescription className="text-gray-600">
                Manage your classroom and monitor student progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacher-username">Username</Label>
                <Input
                  id="teacher-username"
                  type="text"
                  placeholder="Enter your username"
                  value={teacherCredentials.username}
                  onChange={(e) => setTeacherCredentials({...teacherCredentials, username: e.target.value})}
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher-password">Password</Label>
                <Input
                  id="teacher-password"
                  type="password"
                  placeholder="Enter your password"
                  value={teacherCredentials.password}
                  onChange={(e) => setTeacherCredentials({...teacherCredentials, password: e.target.value})}
                  className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <Button 
                onClick={() => handleLogin('teacher')} 
                className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-200"
              >
                Sign In as Teacher
              </Button>
              <p className="text-sm text-gray-500 text-center mt-4">
                Demo: username: <strong>teacher1</strong>, password: <strong>password</strong>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="text-sm">Join thousands of students and teachers worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
