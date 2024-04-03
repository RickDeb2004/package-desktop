"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { app } from "../firebase";
import { getDatabase, ref, push } from "firebase/database";
export default function Component() {
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [adminArticle, setAdminArticle] = useState({
    date: "",
    heading: "",
    publisher: "",
    articleId: "",
    file: "",
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAdminArticle((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };
  const handleHeadingChange = (e) => {
    const value = e.target.value;
    setAdminArticle((prev) => ({
      ...prev,
      heading: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAdminArticle((prev) => ({
      ...prev,
      file,
    }));
  };
  const handleAddArticleClick = () => {
    const database = getDatabase(app);
    setShowAdminPortal(true);
    push(ref(database, "articles"), adminArticle);
  };

  const handleBackButtonClick = () => {
    setShowAdminPortal(false); // Reset to initial state
  };
  const handleDateChange = (e) => {
    const value = e.target.value;
    setAdminArticle((prev) => ({
      ...prev,
      date: value,
    }));
  };
  const handlePublisherChange = (e) => {
    const value = e.target.value;
    setAdminArticle((prev) => ({
      ...prev,
      publisher: value,
    }));
  };
  const handleArticleIdChange = (e) => {
    const value = e.target.value;
    setAdminArticle((prev) => ({
      ...prev,
      articleId: value,
    }));
  };
  const handleLoginClick = () => {};
  return (
    <div className=" relative grid min-h-screen items-center justify-center gap-6 px-6 lg:grid-cols-2 xl:gap-0 border border-yellow-500">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <Button onClick={handleLoginClick}>Login</Button>
      </div>
      {!showAdminPortal && (
        <div className="space-y-4 border border-red-500">
          <>
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
              onClick={handleAddArticleClick}
              className="justify-center w-full"
            >
              Add Article
            </Button>
          </>
        </div>
      )}
      {showAdminPortal && (
        <div className="space-y-4">
          <div className="space-y-2 border border-white ">
            <h2 className="text-2xl font-semibold">
              Admin Portal - Add New Article
            </h2>
            <div className="space-y-2">
              <Label htmlFor="admin-date">Date</Label>
              <Input
                id="admin-date"
                value={adminArticle.date}
                onChange={handleDateChange}
                required
                type="date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-heading">Heading</Label>
              <Input
                id="admin-heading"
                value={adminArticle.heading}
                onChange={handleHeadingChange}
                placeholder="Enter the heading"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-publisher">Publisher</Label>
              <Input
                id="admin-publisher"
                value={adminArticle.publisher}
                onChange={handlePublisherChange}
                placeholder="Enter the publisher"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-article-id">Article ID</Label>
              <Input
                id="admin-article-id"
                value={adminArticle.articleId}
                onChange={handleArticleIdChange}
                placeholder="Enter the article ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-file-upload">Upload File</Label>
              <Input
                id="admin-file-upload"
                value={adminArticle.file}
                onChange={handleFileChange}
                type="file"
              />
            </div>
            <Button
              className="justify-center w-full"
              onClick={handleAddArticleClick}
            >
              Add Article
            </Button>
            <Button
              onClick={handleBackButtonClick}
              className="justify-center w-full"
            >
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
