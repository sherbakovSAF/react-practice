import OffenderCard from "../components/OffenderCard";
import { clsx } from "clsx";
import styles from "./OffenderList.module.scss";

const OffenderList = () => {
  return (
    <ul className={clsx(styles["list"], "container")}>
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
  );
};

export default OffenderList;
