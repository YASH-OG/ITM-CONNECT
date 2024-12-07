"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResourceStore } from "@/lib/store/resources";

export function ResourceForm() {
  const router = useRouter();
  const addResource = useResourceStore((state) => state.addResource);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    tags: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addResource({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      link: formData.link,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      author: {
        id: "demo-user",
        name: "Yash Lal",
        roll: "150096724047",
        points: 150
      }
    });

    router.push("/dashboard/resources?tab=browse");
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter resource title"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the resource"
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Input
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
          placeholder="e.g., Programming, Design, Marketing"
        />
      </div>

      <div className="space-y-2">
        <Label>Resource Link (Optional)</Label>
        <Input
          value={formData.link}
          onChange={(e) => handleChange("link", e.target.value)}
          placeholder="https://example.com/resource"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags (comma-separated)</Label>
        <Input
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          placeholder="e.g., web development, javascript, react"
        />
      </div>

      <Button type="submit" className="w-full">
        Share Resource
      </Button>
    </form>
  );
}