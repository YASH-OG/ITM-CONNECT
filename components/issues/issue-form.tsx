"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import { useIssueStore } from "@/lib/store/issues";
import { useRouter } from "next/navigation";

const ISSUE_CATEGORIES = [
  "Infrastructure",
  "Academic",
  "Technical",
  "Administrative",
  "Other"
];

const demoUser = {
  name: "Yash Lal",
  roll: "150096724047",
  batch: "2024",
  division: "A"
};

export function IssueForm() {
  const router = useRouter();
  const addIssue = useIssueStore((state) => state.addIssue);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    addIssue({
      title: formData.title,
      category: formData.category || "Other",
      description: formData.description,
      status: "pending",
      priority: "medium",
      isPublic,
      createdBy: {
        name: demoUser.name,
        roll: demoUser.roll
      }
    });

    setLoading(false);
    router.push("/dashboard/issues?tab=public");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={demoUser.name} disabled />
        </div>
        <div className="space-y-2">
          <Label>Roll Number</Label>
          <Input value={demoUser.roll} disabled />
        </div>
        <div className="space-y-2">
          <Label>Batch</Label>
          <Input value={demoUser.batch} disabled />
        </div>
        <div className="space-y-2">
          <Label>Division</Label>
          <Input value={demoUser.division} disabled />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Issue Category</Label>
        <Select onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {ISSUE_CATEGORIES.map(category => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Issue Title</Label>
        <Input 
          placeholder="Enter a brief title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea 
          placeholder="Describe the issue in detail"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Date of Issue Onset</Label>
        <Input 
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch checked={isPublic} onCheckedChange={setIsPublic} />
        <Label>Make this issue public</Label>
      </div>

      <div className="space-y-2">
        <Label>Attachments</Label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop files here, or click to select files
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Issue"}
      </Button>
    </form>
  );
}