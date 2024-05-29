import { getMovies } from "@/actions/movies";
import Category from "@/components/category";

const HomePage = async () => {
  const listMovies = await getMovies();
  const newReleases = await getMovies({ sort_by: "year" });
  const recentlyAdded = await getMovies({ sort_by: "date_added" });
  const topRated = await getMovies({ sort_by: "rating" });
  const topLikes = await getMovies({ sort_by: "like_count" });
  const topDownloads = await getMovies({ sort_by: "download_count" });

  return (
    <section className="mx-auto w-[80%] space-y-10 py-10">
      <Category
        title="All movies"
        data={listMovies.data.movies}
        seeMoreUrl="/movies"
      />
      <Category
        title="New releases"
        data={newReleases.data.movies}
        seeMoreUrl="/movies?sort_by=year"
      />
      <Category
        title="Recently Added"
        data={recentlyAdded.data.movies}
        seeMoreUrl="/movies?sort_by=date_added"
      />
      <Category
        title="Top Rated"
        data={topRated.data.movies}
        seeMoreUrl="/movies?sort_by=rating"
      />
      <Category
        title="Top Likes"
        data={topLikes.data.movies}
        seeMoreUrl="/movies?sort_by=like_count"
      />
      <Category
        title="Top Downloads"
        data={topDownloads.data.movies}
        seeMoreUrl="/movies?sort_by=download_count"
      />
    </section>
  );
};

export default HomePage;
