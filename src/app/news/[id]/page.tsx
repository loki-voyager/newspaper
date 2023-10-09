import { OneNews } from "@/components/OneNews";
import { get_one_news } from "@/service/news";
import { Metadata } from "next";

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const post = await get_one_news(id);

  return {
    title: post.data.title,
  };
}

type Props = {
  params: {
    id: string;
  };
};

export default async function New({ params: { id } }: Props) {
  const news = await get_one_news(id);
  return (
    <>
      <div className="wrapper">
        <OneNews news={news.data} />
      </div>
    </>
  );
}
