import OffenderCard from "../components/OffenderCard";
import styles from "./HomePage.module.scss";
import { clsx } from "clsx";

const HomePage = () => {
  return (
    <div className={styles["home-page"]}>
      <header></header>
      <main>
        <ul className={clsx(styles["home-page_list"], "container")}>
          <li>
            <OffenderCard
              offender={{
                createdAt: "2025-05-16T12:18:47.348Z",
                name: "Muriel Parker",
                avatar:
                  "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/77.jpg",
                age: 58,
                city: "College Station",
                fee: 72,
                isBusted: false,
                searchLvl: 5,
                id: 1,
              }}
              onBusted={() => console.log("Нажали я поймал")}
            />
          </li>
          <li>
            <OffenderCard
              offender={{
                createdAt: "2025-05-16T12:18:47.348Z",
                name: "Muriel Parker",
                avatar:
                  "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/77.jpg",
                age: 58,
                city: "College Station",
                fee: 72,
                isBusted: false,
                searchLvl: 5,
                id: 1,
              }}
              onBusted={() => console.log("Нажали я поймал")}
            />
          </li>
          <li>
            <OffenderCard
              offender={{
                createdAt: "2025-05-16T12:18:47.348Z",
                name: "Muriel Parker",
                avatar:
                  "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/77.jpg",
                age: 58,
                city: "College Station",
                fee: 72,
                isBusted: false,
                searchLvl: 5,
                id: 1,
              }}
              onBusted={() => console.log("Нажали я поймал")}
            />
          </li>
          <li>
            <OffenderCard
              offender={{
                createdAt: "2025-05-16T12:18:47.348Z",
                name: "Muriel Parker",
                avatar:
                  "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/77.jpg",
                age: 58,
                city: "College Station",
                fee: 72,
                isBusted: false,
                searchLvl: 5,
                id: 1,
              }}
              onBusted={() => console.log("Нажали я поймал")}
            />
          </li>
        </ul>
      </main>
      <footer></footer>
    </div>
  );
};

export default HomePage;
