import { IListingsParams } from "@/firebase/firestore/getListings";
import { EmptyState } from "@/components";
import { getListings } from "@/app/actions";
import HomeClient from "./HomeClient";


interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <div className="m-10">
        <EmptyState showReset />
      </div>
    )
  }

  return (
    <HomeClient listings={listings}/>
  )
}

export default Home;