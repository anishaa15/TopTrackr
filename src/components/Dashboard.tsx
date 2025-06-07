
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Trophy, BookOpen, Users, BarChart3, Star, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const studentData = [
    { rank: 1, name: "Alex Chen", score: 95, trend: "up" },
    { rank: 2, name: "Maria Rodriguez", score: 92, trend: "up" },
    { rank: 3, name: "James Wilson", score: 88, trend: "down" },
    { rank: 4, name: "Emma Thompson", score: 85, trend: "up" },
    { rank: 5, name: "David Kim", score: 82, trend: "stable" },
  ];

  const recentActivities = [
    { student: "Alex Chen", activity: "Submitted Math Quiz #5", score: 98, time: "2 hours ago" },
    { student: "Maria Rodriguez", activity: "Completed Science Project", score: 94, time: "4 hours ago" },
    { student: "James Wilson", activity: "Submitted History Essay", score: 87, time: "6 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Virtual Classroom</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={user?.role === 'teacher' ? 'default' : 'secondary'}>
                {user?.role === 'teacher' ? 'Teacher' : 'Student'}
              </Badge>
              <Button variant="outline" onClick={logout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {user?.role === 'teacher' ? (
          // Teacher Dashboard
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.5%</div>
                  <p className="text-xs text-muted-foreground">+3.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">3 pending review</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Class Leaderboard
                  </CardTitle>
                  <CardDescription>Top performing students this semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentData.map((student) => (
                      <div key={student.rank} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                            student.rank === 2 ? 'bg-gray-100 text-gray-700' :
                            student.rank === 3 ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {student.rank}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{student.score}%</span>
                          {student.rank <= 3 && <Star className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest student submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex flex-col space-y-1 p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{activity.student}</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{activity.activity}</span>
                          <Badge variant={activity.score >= 90 ? 'default' : 'secondary'}>
                            {activity.score}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Student Dashboard
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#1</div>
                  <p className="text-xs text-muted-foreground">🎉 You're doing amazing!</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Average</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-xs text-muted-foreground">+2% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8/10</div>
                  <p className="text-xs text-muted-foreground">2 pending</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Class Leaderboard
                </CardTitle>
                <CardDescription>See how you rank among your classmates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.map((student) => (
                    <div key={student.rank} className={`flex items-center justify-between p-3 rounded-lg ${
                      student.name === 'Alex Chen' ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                          student.rank === 2 ? 'bg-gray-100 text-gray-700' :
                          student.rank === 3 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {student.rank}
                        </div>
                        <span className={`font-medium ${student.name === 'Alex Chen' ? 'text-blue-700' : ''}`}>
                          {student.name} {student.name === 'Alex Chen' && '(You)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{student.score}%</span>
                        {student.rank <= 3 && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
