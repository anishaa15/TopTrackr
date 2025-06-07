
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";
import { toast } from "sonner";

interface SubmitGradeProps {
  studentName: string;
  onGradeSubmitted: (submission: any) => void;
}

const SubmitGrade = ({ studentName, onGradeSubmitted }: SubmitGradeProps) => {
  const [assignmentName, setAssignmentName] = useState("");
  const [gradeScore, setGradeScore] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignmentName || !gradeScore || !file) {
      toast.error("Please fill in all fields and upload a file");
      return;
    }

    const score = parseFloat(gradeScore);
    if (isNaN(score) || score < 0 || score > 100) {
      toast.error("Please enter a valid grade score between 0-100");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload and grade submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      const submission = {
        studentName,
        assignmentName,
        score,
        fileName: file.name,
        submittedAt: new Date().toISOString(),
      };

      onGradeSubmitted(submission);

      // Reset form
      setAssignmentName("");
      setGradeScore("");
      setFile(null);
      if (e.target) {
        (e.target as HTMLFormElement).reset();
      }

      toast.success(`Assignment "${assignmentName}" submitted successfully! Score: ${score}%`);
    } catch (error) {
      toast.error("Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          Submit Assignment
        </CardTitle>
        <CardDescription>
          Upload your completed assignment and receive your grade
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-name">Student Name</Label>
            <Input
              id="student-name"
              value={studentName}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment-name">Assignment Name</Label>
            <Input
              id="assignment-name"
              placeholder="e.g., Math Quiz #5, Science Project, History Essay"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade-score">Grade Score (%)</Label>
            <Input
              id="grade-score"
              type="number"
              min="0"
              max="100"
              placeholder="Enter your score (0-100)"
              value={gradeScore}
              onChange={(e) => setGradeScore(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment-file">Assignment File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="assignment-file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                required
                className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700"
              />
              {file && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <FileText className="w-4 h-4" />
                  {file.name}
                </div>
              )}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Submit Assignment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SubmitGrade;
