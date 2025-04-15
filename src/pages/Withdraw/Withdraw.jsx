import "../../assets/css/depositWithdraw.css";

import { useEffect, useState } from "react";
import SelectAmount from "./SelectAmount";
import BankAccounts from "./BankAccounts";
import WithdrawConfirm from "./WithdrawConfirm";

import { useBankAccount } from "../../hooks/bankAccount";
import AddBank from "../../components/modals/AddBank";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [bank, setBank] = useState("");
  const [addBank, setAddBank] = useState();
  const payload = {
    type: "getBankAccounts",
    status: "1",
  };
  const { data: bankData, refetch: refetchBankData } = useBankAccount(payload);

  useEffect(() => {
    setShowBankAccount(false);
    setConfirmWithdraw(false);
  }, []);

  useEffect(() => {
    if (showBankAccount && bankData?.length < 1) {
      setShowBankAccount(false);
      setAddBank(true);
    }
  }, [bankData, setAddBank, showBankAccount]);

  return (
    <div id="page" role="page">
      <div className="mian-wrap">
        <div className="center-container">
          {!showBankAccount && !confirmWithdraw && (
            <SelectAmount
              setShowBankAccount={setShowBankAccount}
              setAmount={setAmount}
              amount={amount}
            />
          )}
          {showBankAccount && bankData?.length > 0 && (
            <BankAccounts
              refetchBankData={refetchBankData}
              setAmount={setAmount}
              bankData={bankData}
              setConfirmWithdraw={setConfirmWithdraw}
              setShowBankAccount={setShowBankAccount}
              bank={bank}
              setBank={setBank}
              addBank={addBank}
              setAddBank={setAddBank}
            />
          )}
          {addBank && bankData?.length < 1 && (
            <AddBank
              setAddBank={setAddBank}
              refetchBankData={refetchBankData}
            />
          )}
          {confirmWithdraw && (
            <WithdrawConfirm
              amount={amount}
              bank={bank}
              setAmount={setAmount}
              setShowBankAccount={setShowBankAccount}
              setConfirmWithdraw={setConfirmWithdraw}
              setBank={setBank}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
