import Header from "../components/Header";
import OffenderList from "../components/OffenderList";
import OffenderModal from "../components/OffenderModal";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["home-page"]}>
      <OffenderModal />
      <Header />
      <main className="container">
        <OffenderList />
      </main>
    </div>
  );
};

export default HomePage;
