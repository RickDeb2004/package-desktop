"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";

export default function Component() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showAddArticleFields, setShowAddArticleFields] = useState(false);

  const handleAddArticleClick = () => {
    setShowAdminForm(true);
    setShowAddArticleFields(true);
  };

  return (
    <div className="grid min-h-screen items-center justify-center gap-6 px-6 lg:grid-cols-2 xl:gap-0">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Search for news articles by date
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a date and other optional parameters to search for news
            articles.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" required type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heading">Heading</Label>
          <Input id="heading" placeholder="Enter the heading" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publisher">Publisher</Label>
          <Input id="publisher" placeholder="Enter the publisher" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="article-id">Article ID</Label>
          <Input id="article-id" placeholder="Enter the article ID" />
        </div>
        <Button className="justify-center w-full">Search</Button>
        <Button
          onClick={() => setShowAdminForm(!showAdminForm)}
          className="justify-center w-full"
        >
          {showAdminForm ? "Hide Admin Portal" : "Admin Portal"}
        </Button>
        {showAdminForm && (
          <Button
            onClick={handleAddArticleClick}
            className="justify-center w-full"
          >
            Add Article
          </Button>
        )}
      </div>
      {showAdminForm && (
        <div className="space-y-4">
          {showAddArticleFields && (
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                Admin Portal - Add New Article
              </h2>
              <div className="space-y-2">
                <Label htmlFor="admin-date">Date</Label>
                <Input id="admin-date" required type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-heading">Heading</Label>
                <Input id="admin-heading" placeholder="Enter the heading" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-publisher">Publisher</Label>
                <Input id="admin-publisher" placeholder="Enter the publisher" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-article-id">Article ID</Label>
                <Input
                  id="admin-article-id"
                  placeholder="Enter the article ID"
                />
              </div>
              <Button className="justify-center w-full">Add Article</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
