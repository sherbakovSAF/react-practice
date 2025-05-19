import Header from "../components/Header";
import OffenderList from "../components/OffenderList";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["home-page"]}>
      <Header />
      <main>
        <OffenderList />
      </main>
    </div>
  );
};

export default HomePage;
