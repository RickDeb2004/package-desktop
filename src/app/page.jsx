"use client";
import React, { useState, useContext, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  push,
  orderByChild,
  query,
  get,
  equalTo,
  remove,
} from "firebase/database";
import News from "@/components/component/News";
import Login from "@/components/component/Login";
import { addCategory, getCategories } from "@/helper/controller";

export default function Component() {
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [loginPage, setLoginPage] = useState(true);
  const [readMore, setReadMore] = useState(-1);
  const [adminArticle, setAdminArticle] = useState({
    date: "",
    heading: "",
    description: "",
    file: "",
    category: "",
  });

  const [searchCriteria, setSearchCriteria] = useState({
    date: "",
    heading: "",
    description: "",

    category: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  // const [categoryOptions, setCategoryOptions] = useState([
  //   "World News",
  //   "Accident",
  //   "Love",
  // ]);

  const [categoryOptions, setCategoryOptions] = useState([]);
  useEffect(() => {
    getCategories((data) => {
      if (data) {
        setCategoryOptions(Object.values(data));
      }
    });
  }, []);

  const [newCategory, setNewCategory] = useState("");
  const [pageresults, setPageResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  useEffect(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = Math.min(
      startIndex + articlesPerPage,
      searchResults.length
    );
    setPageResults(searchResults.slice(startIndex, endIndex));
    console.log("currentPage : ", currentPage);
  }, [currentPage, searchResults]);

  const totalPages = Math.ceil(searchResults.length / articlesPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    // Call handleSearch when the component mounts to fetch search results
    handleSearch();
  }, []);
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

  const handleSearch = async () => {
    let filteredQuery = ref(db, "articles");

    if (searchCriteria.date) {
      filteredQuery = query(
        filteredQuery,
        orderByChild("date"),
        equalTo(searchCriteria.date)
      );
    }

    // Execute the first query
    const snapshot = await get(filteredQuery);

    const articles = [];
    snapshot.forEach((childSnapshot) => {
      const article = childSnapshot.val();

      if (
        (!searchCriteria.heading ||
          article.heading
            .toLowerCase()
            .includes(searchCriteria.heading.toLowerCase())) &&
        (!searchCriteria.publisher ||
          article.publisher === searchCriteria.publisher) &&
        (!searchCriteria.category ||
          article.category === searchCriteria.category)
      ) {
        articles.push(article);
      }
    });

    // Update search results
    setSearchResults(articles);
    setCurrentPage(1);
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
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setAdminArticle((prev) => ({
      ...prev,
      description: value,
    }));
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
      setAdminArticle((prev) => ({
        ...prev,
        category: newCategory,
      }));
      console.log(newCategory);
      addCategory(newCategory);
      setNewCategory("");
    }
  };

  const deleteNews = (article) => async () => {
    const articlesRef = ref(db, "articles");
    const snapshot = await get(articlesRef);
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (
        childData.date === article.date &&
        childData.heading === article.heading &&
        childData.description === article.description &&
        childData.articleId === article.articleId &&
        childData.category === article.category
      ) {
        // realtime database
        remove(ref(db, `articles/${childSnapshot.key}`));
      }
    });
  };

  const handleReadMore = (index) => {
    console.log(searchResults[index]);
    setReadMore(index);
  };

  const handleLogout = () => {
    setLoginPage(true);
  };
  return (
    <>
      {loginPage ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div
          className=" relative flex flex-col h-auto min-h-screen items-center  gap-6 px-6 xl:gap-0 border border-yellow-500"
          style={{ background: "linear-gradient(135deg, #ECD06F, #fff3e0)" }}
        >
          <div className="relative top-0 left-[35rem] mt-4 mr-4 flex gap-4">
            <Button
              onClick={handleLogout}
              className="text-black font-mono font-semibold"
              style={{
                background: "linear-gradient(135deg, #ECD06F, #ffa500)",
              }}
            >
              Logout
            </Button>
            <Button
              onClick={handleClickAdd}
              className="w-auto text-black font-mono font-semibold"
              style={{
                background: "linear-gradient(135deg, #ECD06F, #ffa500)",
              }}
            >
              Add Article
            </Button>
          </div>
          {!showAdminPortal && readMore == -1 && (
            <div className="text-center lg:relative lg:top-0 lg:w-full lg:mt-[-32px] mb-9">
              <h1 className="text-3xl font-bold text-black">
                Search for news articles
              </h1>
              <p className="text-gray-500 dark:text-black-400">
                Enter criteria to filter articles
              </p>
            </div>
          )}
          {!showAdminPortal && readMore == -1 && (
            <div className="flex flex-col gap-20 w-[80vw] lg:flex-row lg:space-x-2  ">
              <div className="space-y-2  w-[550px] p-4 rounded-md shadow-sm">
                <div className="flex gap-2 ">
                  <Input
                    id="heading"
                    onChange={handleInputChange}
                    value={searchCriteria.heading}
                    placeholder="Enter the heading"
                    className="text-black placeholder-black rounded-md shadow-md"
                    style={{
                      background: "linear-gradient(-135deg, #F9EFAF, #F7A73E)",
                    }}
                  />
                  <div className="flex justify-center lg:mt-0 lg:w-1/3">
                    <Button
                      onClick={handleSearch}
                      className="w-full font-mono font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                      }}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2  p-4 rounded-md shadow-sm">
                <Input
                  id="date"
                  onChange={handleInputChange}
                  value={searchCriteria.date}
                  required
                  type="date"
                  style={{
                    background: "linear-gradient(-135deg, #F9EFAF, #F7A73E)",
                  }}
                  className="text-black rounded-md shadow-md"
                />
              </div>
              <div className="space-y-2  p-4  rounded-md shadow-sm">
                <select
                  id="category"
                  onChange={handleInputChange}
                  onClick={handleSearch}
                  value={searchCriteria.category}
                  className="text-black font-mono font-semibold p-2 rounded-md shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                  }}
                >
                  <option
                    value=""
                    style={{
                      background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                    }}
                  >
                    Select category
                  </option>
                  {categoryOptions.map((category, index) => (
                    <option
                      key={index}
                      value={category}
                      style={{
                        background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                      }}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Display selected News Page */}
          {readMore == -1 && (
            <div className="relative px-36 my-10 min-w-full">
              {searchResults.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pageresults.map((article, index) => (
                    <div
                      key={index}
                      className="border border-yellow-400 rounded p-4 w-80 shadow-xl"
                    >
                      {/* <img
                    alt="News Image"
                    src="https://sp.yimg.com/ib/th?&id=ODL.c450481298ead71f45bf4bdd14bda34a&w=200&h=107&c=4&dpr=2&rs=1"
                    className="w-full h-auto rounded"
                  /> */}
                      <div className="mt-4">
                        <div className="flex justify-between">
                          <span className="text-xs font-semibold text-gray-700">
                            {article.category}
                          </span>
                          <p className="text-xs font-semibold text-gray-700">
                            {article.date}
                          </p>
                        </div>
                        <h1 className="text-lg font-semibold text-black mt-2">
                          {article.heading}
                        </h1>
                        <p className="text-sm text-gray-700 mt-2">
                          We're excited to announce the launch of the new Vercel
                          platform, bringing a host of powerful features to our
                          users.
                        </p>
                        <div className="flex justify-between mt-4">
                          <Button
                            className="text-blue-500"
                            onClick={() => handleReadMore(index)}
                            style={{
                              background:
                                "linear-gradient(135deg, #ECD06F, #ffa500)",
                            }}
                          >
                            Read more
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={deleteNews(article)}
                          >
                            <TrashIcon className="w-4 h-4 via-gray-950" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-center mt-4">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => {
                      handlePageChange(pageNumber);
                    }}
                    className={`mx-2 px-3 py-1 rounded-full border text-black ${
                      pageNumber === currentPage
                        ? "bg-yellow-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showAdminPortal && readMore == -1 && (
            <div className="space-y-4 absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="space-y-2 max-w-md w-full  p-4">
                <h2 className="text-2xl text-center  text-black font-semibold">
                  Admin Portal - Add New Article
                </h2>
                <div className="space-y-2 w-full">
                  <Label htmlFor="admin-date" className="text-black ">
                    Date
                  </Label>
                  <Input
                    id="admin-date"
                    value={adminArticle.date}
                    onChange={handleDateChange}
                    required
                    type="date"
                    className="text-black rounded-md shadow-md"
                    style={{
                      background: "linear-gradient(-135deg, #F9EFAF, #F7A73E)",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-heading" className="text-black">
                    Heading
                  </Label>
                  <Input
                    id="admin-heading"
                    value={adminArticle.heading}
                    onChange={handleHeadingChange}
                    placeholder="Enter the heading"
                    className="text-black rounded-md shadow-md"
                    style={{
                      background: "linear-gradient(-135deg, #F9EFAF, #F7A73E)",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-description" className="text-black">
                    Description
                  </Label>
                  <Input
                    id="admin-description"
                    value={adminArticle.description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter the Description"
                    style={{
                      background: "linear-gradient(-135deg, #F9EFAF, #F7A73E)",
                    }}
                    className="text-black rounded-md shadow-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-black">
                    Category
                  </Label>
                  <select
                    id="category"
                    onChange={handleCategoryChange}
                    value={adminArticle.category}
                    className="text-black ml-2 rounded-md shadow-md"
                    style={{
                      background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                    }}
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((category, index) => (
                      <option
                        key={index}
                        value={category}
                        className="text-black"
                        style={{
                          background:
                            "linear-gradient(135deg, #ECD06F, #ffa500)",
                        }}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-category" className="text-black">
                    New Category
                  </Label>
                  <div className="flex">
                    <Input
                      id="new-category"
                      value={newCategory}
                      onChange={handleNewCategoryChange}
                      placeholder="Enter new category"
                      style={{
                        background:
                          "linear-gradient(-135deg, #F9EFAF, #F7A73E)",
                      }}
                      className="text-black rounded-md shadow-md"
                    />
                    <Button
                      onClick={handleAddNewCategory}
                      className="ml-2 font-mono font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  className="justify-center w-full font-mono font-semibold"
                  onClick={handleAddArticleClick}
                  style={{
                    background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                  }}
                >
                  Add
                </Button>
                <Button
                  onClick={handleBackButtonClick}
                  className="justify-center w-full font-mono font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* Display Read More  */}
          {readMore != -1 && (
            <div className="relative px-36 my-10 min-w-full">
              <News article={searchResults[readMore]} />
              <Button
                onClick={() => setReadMore(-1)}
                className="justify-center w-full font-mono font-semibold"
                style={{
                  background: "linear-gradient(135deg, #ECD06F, #ffa500)",
                }}
              >
                Back
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
