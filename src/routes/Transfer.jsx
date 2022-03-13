import styled from "styled-components";
import { useCallback, useState, useEffect } from "react";
import { Info } from "../components";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

const Main = styled.main`
  width: 100%;
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* from https://uigradients.com/#Hydrogen */
  background: #667db6; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #667db6,
    #0082c8,
    #0082c8,
    #667db6
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Container = styled.form`
  width: 750px;
  height: 50vh;
  background-color: #fff;
  border-radius: 15px;
  display: grid;
  grid-template-rows: 10vh 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  align-items: center;
  justify-items: center;
  position: fixed;
  top: 15vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SummaryText = styled.span`
  padding-top: 1rem;
  font-size: 3rem;
  text-transform: uppercase;
  color: #0082c8;
`;

const InputField = styled.input`
  padding: 4px 8px;
  height: 20px;
  border-radius: 5px;
  border: 2px solid #667db690;
`;

const DataText = styled.label`
  font-size: 1rem;
  text-transform: uppercase;
  color: #0082c8;
`;

const SendButton = styled.input`
  padding: 4px 8px;
  width: 100px;

  padding: 4px 8px;
  text-transform: uppercase;

  height: 30px;
  background-color: #0082c8;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 15px;
  border: 2px solid #fff;

  &:hover {
    box-shadow: 2px 2px rgba(180, 180, 180, 0.85);
    background-color: #0082c8;
  }

  &:disabled {
    background-color: #cccc;

    &:hover {
      box-shadow: none;
      background-color: #c8c8c8cc;
    }
  }
`;

const Transfer = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [currency, setCurrency] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiversList, setReceiversList] = useState([]);
  const [infoArray, setInfoArray] = useState([]);
  const [color, setColor] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const navigate = useNavigate();

  const currencyOptions = [
    { value: "BTC", label: "BTC" },
    { value: "DOGE", label: "DOGE" },
    { value: "ETH", label: "ETH" },
  ];

  useEffect(() => {
    const getContacts = () => {
      const config = {
        headers: { Authorization: localStorage.getItem("token") },
      };
      axios
        .get(
          "https://belvo-wallet-challenge-api.herokuapp.com/contacts",
          config
        )
        .then((response) => {
          let options = [];
          response.data.map((_receiver) => {
            return options.push({
              value: _receiver.email,
              label: _receiver.name,
            });
          });

          setReceiversList(options);
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        });
    };

    getContacts();
  }, [navigate]);

  const postTransfer = useCallback(() => {
    setColor("#42ba96");
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const payload = {
      description,
      amount: value,
      currency,
      receiver,
    };

    axios
      .post(
        "https://belvo-wallet-challenge-api.herokuapp.com/wallet/send",
        payload,
        config
      )
      .then((response) => {
        setInfoArray([
          {
            msg: `Transference ${response.data.status} to ${response.data.receiver}`,
          },
        ]);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setColor(null);
          setInfoArray(error.response.data.detail);
          return;
        }
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }
      });
  }, [currency, description, navigate, receiver, setInfoArray, value]);

  useEffect(() => {
    setDisableButton(
      isEmpty(description) ||
        isEmpty(value) ||
        isEmpty(currency) ||
        isEmpty(receiver)
    );
  }, [description, value, currency, receiver]);

  const fieldUpdate = useCallback((e, type) => {
    setInfoArray([]);
    switch (type) {
      case "description":
        setDescription(e.currentTarget.value);
        break;
      case "value":
        setValue(e.currentTarget.value);
        break;
      case "currency":
        setCurrency(e.value);
        break;
      case "receiver":
        setReceiver(e.value);
        break;
      default:
        break;
    }
  }, []);

  return (
    <Main>
      {!isEmpty(infoArray) && <Info data={infoArray} color={color} />}
      <Container>
        <SummaryText>transfer</SummaryText>
        <Wrapper>
          <DataText htmlFor="description">
            enter transaction description
          </DataText>
          <InputField
            type="text"
            name="description"
            id="description"
            onChange={(e) => fieldUpdate(e, "description")}
          />
        </Wrapper>
        <Wrapper>
          <DataText htmlFor="value">enter transaction value</DataText>
          <InputField
            type="text"
            name="value"
            id="value"
            onChange={(e) => fieldUpdate(e, "value")}
          />
        </Wrapper>
        <Wrapper>
          <DataText htmlFor="currency">select currency</DataText>
          <Select
            defaultValue={currency}
            onChange={(e) => fieldUpdate(e, "currency")}
            options={currencyOptions}
          />
        </Wrapper>
        <Wrapper>
          <DataText htmlFor="receiver">select receiver</DataText>
          {!isEmpty(receiversList) && (
            <Select
              defaultValue={receiver}
              onChange={(e) => fieldUpdate(e, "receiver")}
              options={receiversList}
            />
          )}
        </Wrapper>
        <SendButton
          disabled={disableButton}
          type="button"
          value="send"
          onClick={() => postTransfer()}
        />
      </Container>
    </Main>
  );
};

export default Transfer;
