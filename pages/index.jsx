import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
// import Search from "@/components/Search";
import CardSlider from "@/components/Card/CardSlider";
import Versus from "@/components/VersusCard/Versus";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://dnvapjddueuuhkttxpkf.supabase.co", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <main className={styles.main}>
        {/* <button className="bg-white" onClick={() => { router.push('/bets') }} > Hello World </button> */}
        <div className="mx-5">
          <div className="relative">
            <CardSlider />
          </div>
          {/* <h1>"Bet Smarter, Win Bigger with tribebet Betting!" </h1> */}
          <div className=" absoulte pt-4">
          </div>
          <div className="relative pb-2">
            <Versus />
          </div>

        </div>

      </main>
    </div>
  );
}
