import Banner from "@/components/Banner";
import CategoryFilter from "@/components/CategoryFilter";
import Collection from "@/components/Collection";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { getAllPublicEvents } from "@/lib/actions/event.actions";
import Image from "next/image";

export default async function Home( date: "desc", price: string, search: string ) {

  const results = await getAllPublicEvents( date, price, search )

  const events = results?.events

  return (
    <main>
      <div>
        <div className="bg-primary w-full overflow-hidden pb-24">
          <div className="flex justify-center items-start bg-primary">
            <div className="xl:max-w-[1580px] w-full">
              <Hero />
            </div>
          </div>

          <section className="bg-white bg-dotted-pattern bg-contain py-5 md:py-10 mb-12 border-y-4 border-secondary">
            <div className="max-w-7xl lg:mx-auto p-5 lg:p-10 w-full grid grid-cols-1 md:grid-cols-2">
              <Banner />

              <Image 
                src="/wed_party.jpg"
                alt="hero"
                width={1000}
                height={1000}
                className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
              />
            </div>
          </section> 
          
          <div className="text-center py-6">
            <h2 className="text-3xl text-secondary font-semibold">Public Events</h2>
            <p className="text-[20px] font-normal leading-[30px] tracking-[2%] md:font-normal md:text-[24px] md:leading-[36px] text-white">Come and check out one of our event&apos;s hosted by DJ Vybe.</p>
          </div>

          <div className="flex flex-col justify-center items-center bg-primary-gradient shadow-lg shadow-secondary sm:px-16 mx-10 px-6 rounded-xl">
            <div id="products" className="flex items-center justify-between text-secondary border-b p-2 border-secondary sticky top-[144px] z-10 w-[90%] mx-auto">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                {events.length} result{events?.length == 1 ? "" : "s"}
              </h1>
            </div>

            <section aria-labelledby="products-heading" className="w-full my-8 flex flex-col gap-8 md:gap-12">
              <div className='col-span-3'>
                <div className="flex items-center w-full flex-col gap-5 md:flex-row mb-12">
                  <Search />
                  <CategoryFilter />
                </div>
                <Collection 
                  data={events}
                  emptyTitle="No Events Found"
                  emptyStateSubtext="Come back later"
                />
                </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}