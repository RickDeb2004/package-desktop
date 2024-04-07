"use client";
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
  ]);
  const [newCategory, setNewCategory] = useState("");
  const db = getDatabase(app);
  useEffect(() => {
    if (showAdminPortal) {
      setSearchResults([]);
    }
  }, [showAdminPortal]);

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

  // const handleSearch = async () => {
  //   const articlesRef = ref(db, "articles");
  //   let filteredQuery = articlesRef;

  //   if (searchCriteria.date) {
  //     filteredQuery = query(
  //       filteredQuery,
  //       orderByChild("date"),
  //       equalTo(searchCriteria.date)
  //     );
  //   }
  //   if (searchCriteria.heading) {
  //     const searchTerm = searchCriteria.heading.toLowerCase();

  //     const snapshot = await get(filteredQuery);
  //     const articles = [];
  //     snapshot.forEach((childSnapshot) => {
  //       const article = childSnapshot.val();

  //       if (article.heading.toLowerCase().includes(searchTerm)) {
  //         articles.push(article);
  //       }
  //     });
  //     setSearchResults(articles);
  //     return;
  //   }
  //   if (searchCriteria.publisher) {
  //     filteredQuery = query(
  //       filteredQuery,
  //       orderByChild("publisher"),
  //       equalTo(searchCriteria.publisher)
  //     );
  //   }
  //   if (searchCriteria.articleId) {
  //     filteredQuery = query(
  //       filteredQuery,
  //       orderByChild("articleId"),
  //       equalTo(searchCriteria.articleId)
  //     );
  //   }
  //   if (searchCriteria.category) {
  //     filteredQuery = query(
  //       filteredQuery,
  //       orderByChild("category"),
  //       equalTo(searchCriteria.category)
  //     );
  //   }

  //   const snapshot = await get(filteredQuery);
  //   const articles = [];
  //   snapshot.forEach((childSnapshot) => {
  //     articles.push(childSnapshot.val());
  //   });
  //   setSearchResults(articles);
  // };
  const handleSearch = async () => {
    let filteredQuery = ref(db, "articles");
  
    // Apply each search criteria sequentially
    if (searchCriteria.date) {
      filteredQuery = query(
        filteredQuery,
        orderByChild("date"),
        equalTo(searchCriteria.date)
      );
    }
  
    // Execute the first query
    const snapshot = await get(filteredQuery);
  
    // Filter the results further based on other criteria
    const articles = [];
    snapshot.forEach((childSnapshot) => {
      const article = childSnapshot.val();
      // Apply additional filtering logic based on other search criteria
      if (
        (!searchCriteria.heading || article.heading.toLowerCase().includes(searchCriteria.heading.toLowerCase())) &&
        (!searchCriteria.publisher || article.publisher === searchCriteria.publisher) &&
        (!searchCriteria.articleId || article.articleId === searchCriteria.articleId) &&
        (!searchCriteria.category || article.category === searchCriteria.category)
      ) {
        articles.push(article);
      }
    });
  
    // Update search results
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

  const handleLogout = () => {
    setLoginPage(true);
  };
  return (
    <>
      {loginPage ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className=" relative grid min-h-screen items-center justify-center gap-6 px-6 lg:grid-cols-2 xl:gap-0 border border-yellow-500" style={{background: 'linear-gradient(135deg, #ECD06F, #fff3e0)'}}>
          <div className="absolute top-0 right-0 mt-4 mr-4 flex gap-4">
            <Button onClick={handleLogout} className="text-black font-mono font-semibold" style={{  backgroundColor: 'transparent' }}>Logout</Button>
            <Button onClick={handleClickAdd} className="w-auto text-black font-mono font-semibold" style={{ backgroundColor: 'transparent' }}>
              Add Article
            </Button>
          </div>
          {!showAdminPortal && (
            <div className="text-center lg:absolute lg:top-0 lg:w-full lg:mt-8">
              <h1 className="text-3xl font-bold text-black">Search for news articles</h1>
              <p className="text-gray-500 dark:text-black-400">
                Enter criteria to filter articles
              </p>
            </div>
          )}
          {!showAdminPortal && (
            <div className="flex flex-col gap-20 w-[150vw] lg:flex-row lg:space-x-2 mt-[-330px] ml-28">
              <div className="space-y-2 border-2  border-gray-300 w-[550px] p-4 rounded-md shadow-sm">
                <div className="flex gap-2 ">
                  <Input
                    id="heading"
                    onChange={handleInputChange}
                    value={searchCriteria.heading}
                    placeholder="Enter the heading"
                    className='text-black'
                    style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                  />
                  <div className="flex justify-center lg:mt-0 lg:w-1/3">
                    <Button onClick={handleSearch} className="w-full font-mono font-semibold" style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}} >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2 border-2 border-gray-300 p-4 rounded-md shadow-sm">
                <Input
                  id="date"
                  onChange={handleInputChange}
                  
                  value={searchCriteria.date}
                  required
                  type="date"
                  style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                  className='text-black'

                />
              </div>
              <div className="space-y-2 border-2 border-gray-300 p-4  rounded-md shadow-sm">
                <select
                  id="category"
                  onChange={handleInputChange}
                  onClick={handleSearch}
                  value={searchCriteria.category}
                  className="text-black font-mono font-semibold"
                  style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}
                >
                  <option value="" style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}>Select category</option>
                  {categoryOptions.map((category, index) => (
                    <option key={index} value={category}  style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Display Search Results */}
          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
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
            <div className="space-y-4 absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="space-y-2 max-w-md w-full  border border-white p-4">
                <h2 className="text-2xl text-center  text-black font-semibold">
                  Admin Portal - Add New Article
                </h2>
                <div className="space-y-2 w-full">
                  <Label htmlFor="admin-date" className='text-black'>Date</Label>
                  <Input
                    id="admin-date"
                    value={adminArticle.date}
                    onChange={handleDateChange}
                    required
                    type="date"
                    className='text-black'
                    style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-heading" className='text-black'>Heading</Label>
                  <Input
                    id="admin-heading"
                    value={adminArticle.heading}
                    onChange={handleHeadingChange}
                    placeholder="Enter the heading"
                    className='text-black'
                    style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-publisher" className='text-black'>Publisher</Label>
                  <Input
                    id="admin-publisher"
                    value={adminArticle.publisher}
                    onChange={handlePublisherChange}
                    placeholder="Enter the publisher"
                    style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                    className='text-black'
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-article-id" className='text-black'>Article ID</Label>
                  <Input
                    id="admin-article-id"
                    value={adminArticle.articleId}
                    onChange={handleArticleIdChange}
                    placeholder="Enter the article ID"
                    style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                    className='text-black'
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-black">Category</Label>
                  <select
                    id="category"
                    onChange={handleCategoryChange}
                    value={adminArticle.category}
                    className="text-black ml-2"
                    style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((category, index) => (
                      <option
                        key={index}
                        value={category}
                        className="text-black"
                        style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-file-upload" className='text-black'>Upload File</Label>
                  <Input
                    id="admin-file-upload"
                    onChange={handleFileChange}
                    type="file"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-category" className='text-black'>New Category</Label>
                  <div className="flex">
                    <Input
                      id="new-category"
                      value={newCategory}
                      onChange={handleNewCategoryChange}
                      placeholder="Enter new category"
                      style={{background: 'linear-gradient(-135deg, #F9EFAF, #F7A73E)'}}
                      className='text-black'
                      
                    />
                    <Button onClick={handleAddNewCategory} className="ml-2 font-mono font-semibold"style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}>+</Button>
                  </div>
                </div>
                <Button
                  className="justify-center w-full font-mono font-semibold"
                  onClick={handleAddArticleClick}
                  style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}
                >
                  Add
                </Button>
                <Button
                  onClick={handleBackButtonClick}
                  className="justify-center w-full font-mono font-semibold"
                  style={{background: 'linear-gradient(135deg, #ECD06F, #ffa500)'}}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
