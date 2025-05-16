import OffenderCard from "../components/OffenderCard";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["home-page"]}>
      <ul>
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
          />
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
