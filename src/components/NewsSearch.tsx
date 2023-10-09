// "use client";

// import { FormEventHandler, useState } from "react";
// import { getPostsBySearch } from "./news";

// type Props = {
//   onSearch: (value: any[]) => void;
// };

// const NewsSearch = ({ onSearch }: Props) => {
//   const [search, setSearch] = useState("");

//   const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
//     event.preventDefault();
//     const news = await getPostsBySearch(search);
//     onSearch(news);
//   };

//   return (
//     <form className="search" onChange={handleSubmit}>
//       <input
//         type="search"
//         placeholder="search"
//         value={search}
//         onChange={(event) => setSearch(event.target.value)}
//       />
//     </form>
//   );
// };

// export { NewsSearch };
