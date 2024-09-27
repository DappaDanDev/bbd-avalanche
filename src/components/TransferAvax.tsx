import { useState } from "react";
import { Card, FlexBoxCol, FlexBoxRow, Input } from "./styled/styled";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { prepareTransaction, toWei } from "thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import { client } from "../App";
import { Calendar } from "./Calendar";

export function TransferAvax() {
  const [avaxAmount, setAvaxAmount] = useState("0.015");
  const [avaxRecipient, setAvaxRecipient] = useState(
    "0x24bF6580ED276b6ff33269DD361eE00FE3a2c912"
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedButton, setSelectedButton] = useState("0.0015");
  const [calendarUrl, setCalendarUrl] = useState("");

  const handleButtonClick = (amount: string) => {
    setAvaxAmount(amount);
    setSelectedButton(amount);
    let url = "";
    switch(amount) {
      case "0.0015":
        url = "https://calendly.com/dappadandev/15-minute-meeting";
        break;
      case "0.0030":
        url = "https://calendly.com/dappadandev/30min";
        break;
      case "0.0060":
        url = "https://calendly.com/dappadandev/60-minutes-in-heaven"
    }
    setCalendarUrl(url);
    // Remove this line: setShowCalendar(true);
  };

  return (
    <Card>
      <FlexBoxCol>
        <h3 className="text-3xl font-bold text-center">DappaDan's Time is Money</h3>
        <FlexBoxRow className="space-x-2">
          <button 
            onClick={() => handleButtonClick("0.0015")}
            className={`px-4 py-2 rounded-lg font-bold transition-colors
              ${selectedButton === "0.0015" 
                ? 'bg-[#ff0000] text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            15 mins / 0.0015 AVAX
          </button>
          <button 
            onClick={() => handleButtonClick("0.0030")}
            className={`px-4 py-2 rounded-lg font-bold transition-colors
              ${selectedButton === "0.0030" 
                ? 'bg-[#ff0000] text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            30 mins / 0.0030 AVAX
          </button>
          <button 
            onClick={() => handleButtonClick("0.0060")}
            className={`px-4 py-2 rounded-lg font-bold transition-colors
              ${selectedButton === "0.0060" 
                ? 'bg-[#ff0000] text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            60 mins / 0.0060 AVAX
          </button>
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
              setShowCalendar(true); // Only show Calendar when transaction is confirmed
            }}
            onError={() => { console.log("Transaction error") }}
          >
            Confirm Transaction
        </TransactionButton>
        {showCalendar && <Calendar url={calendarUrl} />}
      </FlexBoxCol>
    </Card>
  );
}
