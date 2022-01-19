import React, { useState, useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import API from '../API';
import Select from 'react-select'
import { jsPDF } from "jspdf";
// Components
import MDEditor from "@uiw/react-md-editor";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ToastBar from './Toast';
// Styles
import { Wrapper, WrapperFile } from './Projects.styles';
import Web3 from 'web3';

import UserContext from '../User';
import LoadingButton from './LoadingButton';
import ProjectRegister from '../abi/project.json'
import Cookies from 'js-cookie'
import axios from "axios"
import abi from '../abi/project.json'
import { ethers } from 'ethers';
import wrapperTokenABI from '../contracts_hardhat/artifacts/contracts/WrapperToken.sol/WrapperToken.json';
import TokenABI from '../contracts_hardhat/artifacts/contracts/Token.sol/Token.json';

const wrapperTokenAddress = "0xa011037b3EF5EFd8e98D619e4E2fB8CB0a6acE9E";
const BiLiraAddress = "0xc8a80f82876C20903aa8eE1e55fa9782Aa9Ed3c3";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
const TokenSwap = () => {
    const [amount, setAmount] = useState();
    const [var2, setVar2] = useState();
    const [var3, setVar3] = useState();
    const [var4, setVar4] = useState();
    const [var5, setVar5] = useState();

    const [toastShow, setToastshow] = useState(false);
	const [toastText, setToasttext] = useState();
	const [toastHeader, setToastheader] = useState();


    const action1 = async () => {
        try{
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();

            var BiLiraContract = await new ethers.Contract(BiLiraAddress, TokenABI.abi, signer);
            var SUCoinContract = await new ethers.Contract(wrapperTokenAddress, wrapperTokenABI.abi, signer);

            setToastshow(true)
		    setToastheader("Signing the Transaction")
		    setToasttext("Please sign the transaction from your wallet.")            
            var approveTx = await BiLiraContract.approve(wrapperTokenAddress, amount);

            setToastshow(false)
			setToastshow(true)
			setToastheader("Pending Transaction")
			setToasttext("Waiting for transaction confirmation.")
            let receipt = await approveTx.wait(1);

            setToastshow(false)
            setToastshow(true)
		    setToastheader("Signing the Transaction");
		    setToasttext("Please sign the transaction from your wallet.");

            var buyTx = await SUCoinContract.depositFor(await signer.getAddress(), amount);

            setToastshow(false);
			setToastshow(true);
			setToastheader("Pending Transaction");
			setToasttext("Waiting for transaction confirmation.");

            receipt = await buyTx.wait(1);

            setToastshow(false)
			setToastshow(true)
			setToastheader("Success")
			setToasttext("Succesfuly bought %s SUCoin.", amount);

            sleep(1000);
            setToastshow(false);
        }catch (error) {
			setToastshow(true)
			setToastheader("Catched an error")
			setToasttext(error)
			return false;
		}

    }

    const action2 = async () => {
        try{
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();

            var SUCoinContract = await new ethers.Contract(wrapperTokenAddress, wrapperTokenABI.abi, signer);

            setToastshow(true)
		    setToastheader("Signing the Transaction")
		    setToasttext("Please sign the transaction from your wallet.")    

            var sellTx = await SUCoinContract.withdrawTo(await signer.getAddress(), amount);

            setToastshow(false)
			setToastshow(true)
			setToastheader("Pending Transaction")
			setToasttext("Waiting for transaction confirmation.")

            let receipt = await sellTx.wait(1);

            setToastshow(false)
			setToastshow(true)
			setToastheader("Success")
			setToasttext("Succesfuly swapped %s SUCoin to %s BiLira.", amount, amount);

            sleep(1000);
            setToastshow(false);
        }catch (error) {
			setToastshow(true)
			setToastheader("Catched an error")
			setToasttext(error)
			return false;
		}
    }

    const handleInput = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'amount') setAmount(value);
        if (name === 'var2') setVar2(value);
    };

    return (
        <>
            <Wrapper>
                <Container  >
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="SUCOIN">
                                <Form.Control onChange={handleInput} name="amount" type="text" />
                            </FloatingLabel>
                        </Col>
                    </Row >

                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="BiLira">
                                <Form.Control onChange={handleInput} name="var2" type="text" />
                            </FloatingLabel>
                        </Col>
                    </Row >

                    <br></br>
                    <Row style={{ paddingLeft: "10%" }}>
                        <Col style={{ justifyContent: "center", alignItems: "center" }}>
                            <Button variant="dark" onClick={() => { action1() }}> Buy SUCoin</Button>
                        </Col>
                        <Col style={{ justifyContent: "center", alignItems: "center" }}>
                            <Button variant="dark" onClick={() => { action2() }}> Sell SUCoin</Button>
                        </Col>
                    </Row>
                </Container>
            </Wrapper >

        </>
    );
};



export default TokenSwap;