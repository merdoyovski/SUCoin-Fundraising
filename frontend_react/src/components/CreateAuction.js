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


const CreateAuction = () => {
    const [isLoading, setLoading] = useState(false)
    const [auctionTypes, setAuctiontypes] = useState([
        {
            name: "Dutch",
            description: "DUTCH MUTCH"
        },
        {
            name: "FCFS",
            description: "First come first served"
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

    const deployAuction = async () => {

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


                                            <LoadingButton show={isLoading} text={"Submit to Chain"} variant="dark" func={deployAuction}> </LoadingButton>
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