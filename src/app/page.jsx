"use client";
import React, { useState, useContext, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { app } from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

import News from "@/components/component/News";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import UserMenu from "@/components/component/UserMenu";
import Login from "@/components/component/Login";

export default function Component() {
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [adminArticle, setAdminArticle] = useState({
    date: "",
    heading: "",
    publisher: "",
    articleId: "",
    file: "",
  });

  const uploadFile = async (file, folderName) => {
    const storage = getStorage(app);
    const storageReference = storageRef(storage, `${folderName}/${file.name}`);
    try {
      await uploadBytes(storageReference, file);
      const downloadURL = await getDownloadURL(storageReference);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

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
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]; // Define allowed file types
  //   if (file && allowedTypes.includes(file.type)) {
  //     setAdminArticle((prev) => ({
  //       ...prev,
  //       file: file,
  //     }));
  //   } else {
  //     e.target.value = null; // Reset the file input
  //     alert("Please select a valid file type (jpg, png, or pdf).");
  //   }
  // };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let folderName = "";
    if (file.type.includes("image")) {
      folderName = "images";
    } else if (file.type.includes("pdf")) {
      folderName = "documents";
    } else {
      alert("Unsupported file type. Please upload an image or PDF file.");
      return;
    }

    const fileURL = await uploadFile(file, folderName);
    if (fileURL) {
      setAdminArticle((prev) => ({
        ...prev,
        file: fileURL,
      }));
    } else {
      alert("File upload failed. Please try again.");
    }
  };
  const handleAddArticleClick = () => {
    const database = getDatabase(app);

    push(ref(database, "articles"), adminArticle);
  };
  const handleClickAdd = () => {
    setShowAdminPortal(true);
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

  const handleLogoutClick = async () => {
    setLoginPage(false);
  };

  const handleLoginSuccess = () => {
    setLoginPage(false);
  }

  return (
    <>
      {loginPage ? (
        <Login onLoginSuccess={handleLoginSuccess}  />
      ) : (
        <div className=" relative grid min-h-screen items-center justify-center gap-6 px-6 lg:grid-cols-2 xl:gap-0 border border-yellow-500">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <Button onClick={handleLogoutClick}>Logout</Button>
          </div>
          {!showAdminPortal && (
            <div className="space-y-4 border border-red-500">
              <>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">
                    Search for news articles by date
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter a date and other optional parameters to search for
                    news articles.
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
                  onClick={handleClickAdd}
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
                    onChange={handleFileChange}
                    type="file"
                  />
                </div>
                <Button
                  className="justify-center w-full"
                  onClick={handleAddArticleClick}
                >
                  Add
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
          <News />
        </div>
      )}
    </>
  );
}
