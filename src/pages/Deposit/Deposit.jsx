import "../../assets/css/depositWithdraw.css";

import { useState } from "react";
import AmountBox from "./AmountBox";
import PaymentMethods from "./PaymentMethods";
import UploadTransaction from "./UploadTransaction";
import DepositModal from "../../components/modals/DepositModal";

const Deposit = () => {
  const [amount, setAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(false);
  const [uploadTransaction, setUploadTransaction] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  return (
    <div id="page" role="page">
      <div className="mian-wrap">
        <div className="center-container">
          {!paymentMethods && !uploadTransaction && (
            <AmountBox
              amount={amount}
              setAmount={setAmount}
              setShowModal={setShowModal}
            />
          )}
          {uploadTransaction && (
            <UploadTransaction paymentId={paymentId} amount={amount} />
          )}
          {paymentMethods && (
            <PaymentMethods
              setUploadTransaction={setUploadTransaction}
              setPaymentMethods={setPaymentMethods}
              setPaymentId={setPaymentId}
              amount={amount}
            />
          )}
          {showModal && (
            <DepositModal
              amount={amount}
              setShowModal={setShowModal}
              setPaymentMethods={setPaymentMethods}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
