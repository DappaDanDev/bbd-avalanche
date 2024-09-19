import { useState } from "react";
import { Card, FlexBoxCol, FlexBoxRow, Input } from "./styled/styled";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { prepareTransaction, toWei } from "thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import { client } from "../App";
import { Calendar } from "./Calendar";

export function TransferAvax() {

  const [avaxAmount, setAvaxAmount] = useState("0.01");
  const [avaxRecipient, setAvaxRecipient] = useState(
    "0x24bF6580ED276b6ff33269DD361eE00FE3a2c912"
  );
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer Fuji AVAX</h3>
        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={avaxAmount}
            onChange={(e) => setAvaxAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          {/* <Input
            style={{ marginRight: 8 }}
            value={avaxRecipient}
            onChange={(e) => setAvaxRecipient(e.target.value)}
          ></Input> */}
        </FlexBoxRow>
        <TransactionButton
            transaction={() => {
              const transaction = prepareTransaction({
                to: avaxRecipient,
                chain: avalancheFuji,
                client: client,
                value: toWei(avaxAmount),
            });
            return transaction;
            }}
            onTransactionConfirmed={() => {
              console.log("Transaction confirmed");
              setShowCalendar(true); // Show the Calendar when transaction is confirmed
            }}
            onError={() => { console.log("Transaction error") }}
          >
            Confirm Transaction
        </TransactionButton>
        {showCalendar && <Calendar />} {/* Render Calendar when showCalendar is true */}
      </FlexBoxCol>
    </Card>
  );
}
