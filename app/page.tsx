import Navbar from './components/Navbar';
import SearchHero from './components/SearchHero';
import FeaturedPropertyCard from './components/FeaturedPropertyCard';
import PropertyCard from './components/PropertyCard';
import Pagination from './components/Pagination';
import { getFeaturedEstates, getEstates, PAGE_SIZE } from './lib/estates';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt((pageParam as string) ?? '1', 10) || 1);

  const [featuredEstates, { data: estates, totalCount }] = await Promise.all([
    getFeaturedEstates(),
    getEstates(currentPage, PAGE_SIZE),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SearchHero />

        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark dark:text-white">Featured Collections</h2>
              <p className="text-nordic-muted mt-1 text-sm">Curated properties for the discerning eye.</p>
            </div>
            <a
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity"
              href="#"
            >
              View all <span className="material-icons text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEstates.map(estate => (
              <FeaturedPropertyCard key={estate.id} property={estate} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark dark:text-white">New in Market</h2>
              <p className="text-nordic-muted mt-1 text-sm">
                Fresh opportunities added this week.
                {totalCount > 0 && (
                  <span className="ml-2 text-mosque font-medium">
                    {totalCount} propert{totalCount === 1 ? 'y' : 'ies'}
                  </span>
                )}
              </p>
            </div>
            <div className="hidden md:flex bg-white dark:bg-white/5 p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
                All
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white">
                Buy
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white">
                Rent
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {estates.map((estate, index) => {
              const hiddenClass =
                index === 4 ? 'hidden xl:block h-full' : index === 5 ? 'hidden lg:block h-full' : 'h-full';
              return (
                <div key={estate.id} className={hiddenClass}>
                  <PropertyCard property={estate} />
                </div>
              );
            })}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      </main>
    </>
  );
}
