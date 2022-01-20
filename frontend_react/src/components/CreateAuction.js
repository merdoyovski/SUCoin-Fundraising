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
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Card from 'react-bootstrap/Card'

// Styles
import { Wrapper, WrapperFile } from './Projects.styles';
import Web3 from 'web3';

import UserContext from '../User';
import LoadingButton from './LoadingButton';
import ToastBar from './Toast';
import ProjectRegister from '../abi/project.json'
import Cookies from 'js-cookie'
import axios from "axios"
import abi from '../abi/project.json'
import { ethers } from 'ethers';
import ethersAbi from '../contracts_hardhat/artifacts/contracts/ProjectRegister.sol/ProjectRegister.json'

import MaestroABI from '../contracts_hardhat/artifacts/contracts/Maestro.sol/Maestro.json';
import CappedFCFS from '../contracts_hardhat/artifacts/contracts/CappedFCFSAuction.sol/CappedFCFSAuction.json';
import CappedParcelLimitFCFS from '../contracts_hardhat/artifacts/contracts/CappedParcelLimitFCFSAuction.sol/CappedParcelLimitFCFSAuction.json';
import CappedAuctionWRedistribution from '../contracts_hardhat/artifacts/contracts/CappedAuctionWRedistribution.sol/CappedAuctionWRedistribution.json';
import DutchAuction from '../contracts_hardhat/artifacts/contracts/DutchAuction.sol/DutchAuction.json';
import TokenABI from '../contracts_hardhat/artifacts/contracts/Token.sol/Token.json';


const BiLiraAddress = "0xc8a80f82876C20903aa8eE1e55fa9782Aa9Ed3c3";

const maestro = { address: "0x589Fa7D96fE9305Bc95e866E1BCb28EeEE259A70" }
const SUCoin = { address: "0xa011037b3EF5EFd8e98D619e4E2fB8CB0a6acE9E" }

const CreateAuction = () => {
    const [isLoading, setLoading] = useState(false)
    const [auctionTypes, setAuctiontypes] = useState([
        {
            id: 0,
            name: "Dutch Auction",
            description: "this is DUTCH Auction"
        },
        {
            id: 1,
            name: "First Come First Served",
            description: "This is First come first served"
        }
        ,
        {
            id: 2,
            name: "Weighted",
            description: "this Weighted"
        }
        ,
        {
            id: 3,
            name: "Parcel Limit",
            description: "this is Parcel Limit"
        }
    ]);

    const [auction, setAuction] = useState("")
    const [var2, setVar2] = useState();
    const [var1, setVar1] = useState();



    const action1 = () => {
        console.log(var1)
    }

    const action2 = () => {
        console.log(var2)
    }

    const handleInput = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        if (name === 'var1') setVar1(value);


    };

    const deployAuction = async (id) => {

        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        /*
                if (id == 0) {
                    const DutchAuction = new ethers.getContractFactory(DutchAuction.abi, DutchAuction.bytecode, signer);
                    let auction = await DutchAuction.deploy(10, 1, ProjectToken.address, 1000, SUCoin.address, 2, maestro.address, fileHash);
                    await auction.deployed();
                }
                else if (id == 1) {
                    const CappedFixedPriceAuction = new ethers.ContractFactory(CappedFCFSAuction.abi, CappedFCFSAuction.bytecode, signer);
                    let auction = await CappedFixedPriceAuction.deploy(1, ProjectToken.address, SUCoin.address, 10000, maestro.address, fileHash);
                    await auction.deployed();
                }
                else if (id == 2) {
                    const CappedFixedPriceProportionalAuction = new ethers.ContractFactory(CappedAuctionWRedistribution.abi, CappedAuctionWRedistribution.bytecode, signer);
                    let auction = await CappedFixedPriceProportionalAuction.deploy(1, ProjectToken.address, SUCoin.address, 10000, maestro.address, fileHash);
                    await auction.deployed();
                }
                else if (id == 3) {
                    const CappedParcelLimitFCFSAuction = new ethers.ContractFactory(CappedParcelLimitFCFSAuction.abi, CappedParcelLimitFCFSAuction.bytecode, signer);
                    let auction = await CappedParcelLimitFCFSAuction.deploy(1, ProjectToken.address, SUCoin.address, 3000, 1000, maestro.address, fileHash);
                    await auction.deployed();
                }*/
    }

    return (
        <>
            <Wrapper>


                <Container  >

                    {

                        auctionTypes.map((type, index) => (
                            <Col>
                                <Accordion defaultActiveKey="0" >
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header> {type.name}        </Accordion.Header>
                                        <Accordion.Body>
                                            {type.description}


                                            <LoadingButton show={isLoading} text={"Submit to Chain"} variant="dark" onClick={(x) => console.log(x)}> </LoadingButton>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                        ))


                    }

                </Container>
            </Wrapper >

        </>
    );
};


/*

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

                */
export default CreateAuction;