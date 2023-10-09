"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { NewsSearch } from "./NewsSearch";
import { get_all_news } from "@/service/news";
import { Pagination } from "./Pagination";

const News = () => {
  const router = useRouter();

  const [news, setNews] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [newsPerPage, setNewsPerPage] = useState(10);
  const [newsPerPageManually, setNewsPerPageManually] = useState(10);

  useEffect(() => {
    console.log("xD");
    get_all_news().then((allNews) => {
      setNews(allNews);
      setTotalPages(Math.ceil(allNews.length / newsPerPage));
    });
  }, [newsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setNewsPerPage(newsPerPageManually);
    console.log("newsPerPage:", newsPerPage);
  };

  const paginatedNews = news.slice(
    (currentPage - 1) * newsPerPageManually,
    Math.min(currentPage * newsPerPageManually, news.length)
  );

  return !news ? (
    <div className="wrapper">
      <h3>Loading... </h3>
    </div>
  ) : (
    <>
      {/* <NewsSearch onSearch={setNews} /> */}
      <div className="news">
        <button
          className="button add"
          onClick={() => {
            router.push("/news/new");
          }}
        >
          Add news
        </button>
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
                  Math.min(newsPerPageManually + 10, news.length)
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
    </>
  );
};

export { News };
