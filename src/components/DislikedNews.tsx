"use client";

import { disliked_list } from "@/service/news";
import { useUser } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

export const getListOfDisike = async (username: string | null) => {
  if (!username) return false;
  const res = await disliked_list(username);
  const data = res.data;

  return data;
};

const DislikedNews = () => {
  const { username } = useUser();

  if (!username) window.location.href = "/";

  const [dislike_list, setDislike_list] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [newsPerPage, setNewsPerPage] = useState(10);
  const [newsPerPageManually, setNewsPerPageManually] = useState(10);

  useEffect(() => {
    getListOfDisike(username).then((allNews) => {
      setDislike_list(allNews);
      setTotalPages(Math.ceil(allNews.length / newsPerPage));
    });
    if (!dislike_list) alert(`You have no news you don't like`);
  }, [dislike_list, newsPerPage, username]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setNewsPerPage(newsPerPageManually);
  };

  const paginatedNews = dislike_list.slice(
    (currentPage - 1) * newsPerPageManually,
    Math.min(currentPage * newsPerPageManually, dislike_list.length)
  );

  return !dislike_list ? (
    <div className="wrapper">
      <h1>Disliked News</h1>
    </div>
  ) : (
    <>
      <div className="news">
        <div className="listOfNews">
          <div>
            <h1>Disliked News</h1>
          </div>
          <div className="news-per-page">
            <div className="search">
              <button
                className="button"
                onClick={() => {
                  if (newsPerPageManually > 10) {
                    setNewsPerPageManually(newsPerPageManually - 10);
                  }
                }}
              >
                -
              </button>
              <input
                type="number"
                value={newsPerPageManually}
                onChange={(e) => {
                  setNewsPerPageManually(e.target.value as any);
                }}
              />
              <button
                className="button"
                onClick={() => {
                  setNewsPerPageManually(
                    Math.min(newsPerPageManually + 10, dislike_list.length)
                  );
                }}
              >
                +
              </button>
            </div>
          </div>
          <ul className="ul-c">
            {paginatedNews.map((oneNews: any) => (
              <Link
                className="button"
                href={`/news/${oneNews.id}`}
                key={oneNews.id}
              >
                {oneNews.title}
              </Link>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export { DislikedNews };
