import Header from "../components/Header";
import OffenderList from "../components/OffenderList";
import OffenderModal from "../components/OffenderModal";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { OffenderSlice } from "../store/slices/offenderSlice";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  const { offenderForApprove } = useAppSelector((state) => state.offenderSlice);
  const { setOffenderForApprove } = OffenderSlice.actions;
  const dispatch = useAppDispatch();

  const handleApproveOffender = () => {
    dispatch(setOffenderForApprove(null));
  };

  return (
    <div className={styles["home-page"]}>
      {offenderForApprove && (
        <OffenderModal
          offender={offenderForApprove}
          onApprove={handleApproveOffender}
          onClose={() => dispatch(setOffenderForApprove(null))}
        />
      )}
      <Header />
      {JSON.stringify(offenderForApprove)}
      <main className="container">
        <OffenderList />
      </main>
    </div>
  );
};

export default HomePage;
