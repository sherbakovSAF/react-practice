import AuthModal from "../components/AuthModal";
import Header from "../components/Header";
import OffenderList from "../components/OffenderList";
import OffenderModal from "../components/OffenderModal";
import { useOffenders } from "../hooks/useOffenders";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { authModalSlice } from "../store/slices/authModalSlice";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const isOpenAuthModal = useAppSelector(
    (state) => state.authModalSlice.isOpen
  );
  const { closeAuthModal } = authModalSlice.actions;
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
      {isOpenAuthModal && (
        <AuthModal onClose={() => dispatch(closeAuthModal())} />
      )}

      <Header />
      <main className="container">
        <OffenderList />
      </main>
    </div>
  );
};

export default HomePage;
