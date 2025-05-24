import Header from "../components/Header";
import OffenderList from "../components/OffenderList";
import OffenderModal from "../components/OffenderModal";

import { useOffenders } from "../useOffenders";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { offenderForApprove, bustedOffender, closeApproveOffenderModal } =
    useOffenders();

  return (
    <div className={styles["home-page"]}>
      {offenderForApprove && (
        <OffenderModal
          offender={offenderForApprove}
          onApprove={() => bustedOffender(offenderForApprove)}
          onClose={() => closeApproveOffenderModal()}
        />
      )}
      <Header />
      <main className="container">
        <OffenderList />
      </main>
    </div>
  );
};

export default HomePage;
