"use client";

import React, { useState, useEffect } from "react";

import React, { useState, useContext, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  push,
  orderByChild,
  query,
  get,
  equalTo,
} from "firebase/database";

import News from "@/components/component/News";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { AuthContext } from "../helper/authProvider";
import UserMenu from "@/components/component/UserMenu";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

export default function Component() {
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [adminArticle, setAdminArticle] = useState({
    date: "",
    heading: "",
    publisher: "",
    articleId: "",
    file: "",
    category: "",
  });

  const [searchCriteria, setSearchCriteria] = useState({
    date: "",
    heading: "",
    publisher: "",
    articleId: "",
    criteria: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([
    "World News",
    "Accident",
    "Love",
    // Add more categories here
  ]);
  const [newCategory, setNewCategory] = useState("");
  const db = getDatabase(app);
  useEffect(() => {
    if (showAdminPortal) {
      setSearchResults([]); // Reset search results when switching to admin portal
    }
  }, [showAdminPortal]);


  const { user } = useContext(AuthContext);
  const auth = getAuth(app);



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

  //
  const handleSearch = async () => {
    const articlesRef = ref(db, "articles");
    let filteredQuery = articlesRef;

    // Apply search criteria
    if (searchCriteria.date) {
      filteredQuery = query(
        filteredQuery,
        orderByChild("date"),
        equalTo(searchCriteria.date)
      );
    }
    if (searchCriteria.heading) {
      // Convert the searchCriteria.heading to lowercase for case-insensitive search
      const searchTerm = searchCriteria.heading.toLowerCase();
      // Firebase Realtime Database doesn't support native full-text search
      // So, you need to fetch all articles and then filter them in JavaScript
      const snapshot = await get(filteredQuery);
      const articles = [];
      snapshot.forEach((childSnapshot) => {
        const article = childSnapshot.val();
        // Perform partial match search for heading
        if (article.heading.toLowerCase().includes(searchTerm)) {
          articles.push(article);
        }
      });
      setSearchResults(articles);
      return; // Exit the function early to prevent further execution
    }
    if (searchCriteria.publisher) {
      filteredQuery = query(
        filteredQuery,
        orderByChild("publisher"),
        equalTo(searchCriteria.publisher)
      );
    }
    if (searchCriteria.articleId) {
      filteredQuery = query(
        filteredQuery,
        orderByChild("articleId"),
        equalTo(searchCriteria.articleId)
      );
    }
    if (searchCriteria.category) {
      filteredQuery = query(
        filteredQuery,
        orderByChild("category"),
        equalTo(searchCriteria.category)
      );
    }
    // Fetch the filtered articles
    const snapshot = await get(filteredQuery);
    const articles = [];
    snapshot.forEach((childSnapshot) => {
      articles.push(childSnapshot.val());
    });
    setSearchResults(articles);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSearchCriteria((prev) => {
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

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setAdminArticle((prev) => ({
      ...prev,
      category: value,
    }));
    setSearchCriteria((prev) => ({
      ...prev,
      category: value,
    }));
  };
  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim() !== "") {
      setCategoryOptions((prevOptions) => [...prevOptions, newCategory]);
      setAdminArticle((prev) => ({
        ...prev,
        category: newCategory,
      }));
      setNewCategory("");
    }
  };
  const handleLoginClick = () => {};
=======
  const handleLoginClick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Popup authentication was cancelled by the user.");
      } else {
        console.error("Error signing in with Google:", error);
      }
    }
  };

  return (
    <div className=" relative grid min-h-screen items-center justify-center gap-6 px-6 lg:grid-cols-2 xl:gap-0 border border-yellow-500">
      <div className="absolute top-0 right-0 mt-4 mr-4">
       {Object.keys(user).length === 0 ? (
        <Button onClick={handleLoginClick}>Login</Button>
      ) : (
        <UserMenu />
      )}
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
              <Input
                id="date"
                onChange={handleInputChange}
                value={searchCriteria.date}
                required
                type="date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                onChange={handleInputChange}
                value={searchCriteria.heading}
                placeholder="Enter the heading"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                onChange={handleInputChange}
                value={searchCriteria.publisher}
                placeholder="Enter the publisher"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="article-id">Article ID</Label>
              <Input
                id="article-id"
                onChange={handleInputChange}
                value={searchCriteria.articleId}
                placeholder="Enter the article ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                onChange={handleInputChange}
                value={searchCriteria.category}
                className="text-black"
              >
                <option value="">Select category</option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <Button className="justify-center w-full" onClick={handleSearch}>
              Search
            </Button>
            <Button onClick={handleClickAdd} className="justify-center w-full">
              Add Article
            </Button>
          </>
        </div>
      )}
      {/* Display Search Results */}
      {/* {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          {searchResults.map((article, index) => (
            <Card key={index}>
              <CardHeader>{article.heading}</CardHeader>
              <CardContent>
                <News />
              </CardContent>
            </Card>
          ))}
        </div>
      )} */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          {searchResults.map((article, index) => (
            <Card key={index}>
              <CardHeader>{article.heading}</CardHeader>
              <CardContent>
                <p>Date: {article.date}</p>
                <p>Publisher: {article.publisher}</p>
                <p>Article ID: {article.articleId}</p>
                <p>Category: {article.category}</p>
                {/* Render file if available */}
                {article.file && (
                  <a
                    href={article.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
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
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                onChange={handleCategoryChange}
                value={adminArticle.category}
                className="text-black"
              >
                <option value="">Select category</option>
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category} className="text-black">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-file-upload">Upload File</Label>
              <Input
                id="admin-file-upload"
                onChange={handleFileChange}
                type="file"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-category">New Category</Label>
              <div className="flex">
                <Input
                  id="new-category"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                  placeholder="Enter new category"
                />
                <Button onClick={handleAddNewCategory}>+</Button>
              </div>
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
    </div>
  );
}
