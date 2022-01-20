import React, { useState, useContext, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom';
import API from '../API';
import Select from 'react-select'
import { jsPDF } from "jspdf";
// Components
import MDEditor from "@uiw/react-md-editor";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
// Styles
import { Wrapper, WrapperFile } from './Projects.styles';
import Web3 from 'web3';

import UserContext from '../User';
import LoadingButton from './LoadingButton';
import ToastBar from './Toast';

import Cookies from 'js-cookie'
import axios from "axios"
import { ethers } from 'ethers';
import MaestroABI from '../contracts_hardhat/artifacts/contracts/Maestro.sol/Maestro.json';
import CappedFCFS from '../contracts_hardhat/artifacts/contracts/CappedFCFSAuction.sol/CappedFCFSAuction.json';
import CappedParcelLimitFCFS from '../contracts_hardhat/artifacts/contracts/CappedParcelLimitFCFSAuction.sol/CappedParcelLimitFCFSAuction.json';
import CappedAuctionWRedistribution from '../contracts_hardhat/artifacts/contracts/CappedAuctionWRedistribution.sol/CappedAuctionWRedistribution.json';
import DutchAuction from '../contracts_hardhat/artifacts/contracts/DutchAuction.sol/DutchAuction.json';
import TokenABI from '../contracts_hardhat/artifacts/contracts/Token.sol/Token.json';

const options = [
    { value: 'fens', label: 'FENS' },
    { value: 'fass', label: 'FASS' },
    { value: 'fman', label: 'FMAN' }
]

const MaestroAddress = "0x589Fa7D96fE9305Bc95e866E1BCb28EeEE259A70";
const CappedFCFSAddress = "0x43f691a5D43Dd8edbDa222c6a0de967E52a23db2"
const Auctions = () => {
    const [var1, setVar1] = useState();
    const [var2, setVar2] = useState();
    const [var3, setVar3] = useState();
    const [var4, setVar4] = useState();
    const [var5, setVar5] = useState();

    const [toastShow, setToastshow] = useState(false);
    const [toastText, setToasttext] = useState();
    const [toastHeader, setToastheader] = useState();

    const action1 = async () => {
        try {
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            var Maestro = await new ethers.Contract(MaestroAddress, MaestroABI.abi, provider);

            var filter = await Maestro.filters.CreateAuctionEvent();

            var allCreateAuctionEvents = await Maestro.queryFilter(filter);
            var allAuctions = [];
            for (let index = 0; index < allCreateAuctionEvents.length; index++) {
                let aucAddress = allCreateAuctionEvents[index].args.auction;
                let fileHash = allCreateAuctionEvents[index].args.fileHash;
                let auctionType = allCreateAuctionEvents[index].args.auctionType;
                let creator = allCreateAuctionEvents[index].args.creator;
                let Project = await Maestro.projectTokens(fileHash);
                let tokenSC = await new ethers.Contract(Project.token, TokenABI.abi, provider);
                let tokenSymbol = await tokenSC.symbol();
                let tokenName = await tokenSC.name();
                let auctionSc = await new ethers.Contract(aucAddress, (auctionType == 'CappedFCFS' ? CappedFCFS.abi : (auctionType == 'CappedAuctionWRedistribution' ? CappedAuctionWRedistribution.abi : (auctionType == "CappedParcelLimitFCFSAuction" ? CappedParcelLimitFCFS.abi : (auctionType == "DutchAuction" ? DutchAuction : DutchAuction)))), provider);
                let isFinished = await auctionSc.isFinished();
                let isStarted = await auctionSc.isStarted();
                var status;
                if (isStarted && !isFinished) {
                    status = "Ongoing";
                }
                else if (isStarted && isFinished) {
                    status = "Finished";
                } else if (!isStarted) {
                    status = "notStarted";
                }

                allAuctions.push({ "auctionAddress": aucAddress, "fileHash": fileHash, "auctionType": auctionType, "creator": creator, "tokenSymbol": tokenSymbol, tokenName: tokenName, status: status, tokenAddress: Project.token });
            }
            console.log(allAuctions);
            /*var allTokenCreationEvents = await Maestro.filters.TokenCreation();
            console.log(allTokenCreationEvents);*/

        } catch (error) {
            setToastshow(true)
            setToastheader("Catched an error")
            setToasttext(error)
            return false;
        }
    }
    const action2 = () => {
        console.log(var2)
    }

    const handleInput = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'var1') setVar1(value);
        if (name === 'var2') setVar2(value);
        if (name === 'var3') setVar3(value);
        if (name === 'var4') setVar4(value);
        if (name === 'var5') setVar5(value);

    };

    return (
        <>
            <ToastBar toastText={toastText} toastHeader={toastHeader} toastShow={toastShow} setToastshow={setToastshow}></ToastBar>
            <Wrapper>
                <Container  >
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Var1">
                                <Form.Control onChange={handleInput} name="var1" type="text" />
                            </FloatingLabel>
                        </Col>
                    </Row >

                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Var2">
                                <Form.Control onChange={handleInput} name="var2" type="text" />
                            </FloatingLabel>
                        </Col>
                    </Row >


                    <br></br>
                    <Row style={{ paddingLeft: "10%" }}>
                        <Col style={{ justifyContent: "center", alignItems: "center" }}>
                            <Button variant="dark" onClick={() => { action1() }}> Action 1</Button>
                        </Col>
                        <Col style={{ justifyContent: "center", alignItems: "center" }}>
                            <Button variant="dark" onClick={() => { action2() }}> Action 2</Button>
                        </Col>
                    </Row>
                </Container>
            </Wrapper >

        </>
    );
};



export default Auctions;