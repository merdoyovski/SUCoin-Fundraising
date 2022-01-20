import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import Thumb from '../Thumb';
import Rate from '../Rate';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
// Image
import NoImage from '../../images/no_image.jpg';
// Styles
import { Wrapper, Content, Text } from './ProjectInfo.styles';
import Web3 from 'web3';

import ProjectRegister from '../../abi/project.json'
import Button from 'react-bootstrap/Button'

import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios'
import Cookies from 'js-cookie'

import { ethers } from 'ethers';
import ethersAbi from '../../contracts_hardhat/artifacts/contracts/ProjectRegister.sol/ProjectRegister.json'
import abi from '../../abi/project.json'
import { useEffect } from 'react';

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Col'

const AuctionInfo = ({ auction, projectId }) => {

  const [approveVotes, setApprove] = useState()
  const [rejectVotes, setReject] = useState()
  const [hash, setHash] = useState()
  const [votesNeeded, setVotesneeded] = useState()
  const [isEditing, setEditing] = useState(false)

  const [projectName, setName] = useState('');
  const [projectDescription, setDescription] = useState('');
  const [projectImg, setImg] = useState('');



  useEffect(async () => {/*
    const CryptoJS = require('crypto-js');

    const hash = "0x" + await CryptoJS.SHA256(project.fileHex).toString()

    setHash(hash)

    const provider = await new ethers.providers.Web3Provider(window.ethereum)

    const signer = await provider.getSigner()

    var registerContract = await new ethers.Contract(abi.address, ethersAbi.abi, signer)
    var threshold = await registerContract.threshold()
    var wlCount = await registerContract.whitelistedCount()
    const votes = await registerContract.projectsRegistered(hash)

    setApprove(await votes.approved.toString())
    setReject(await votes.rejected.toString())
    console.log("YOOO", votes.finalized, votes.decision)
    console.log("YOOO", votes.approved.toString(), votes.rejected.toString())
    console.log("YOOO", Math.ceil(wlCount.toString() * threshold.toString() / 100))
    setVotesneeded(Math.ceil(wlCount.toString() * threshold.toString() / 100))
    //changeProjectStatus()*/
  })







  const handleInput = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (name === 'name') setName(value);
    if (name === 'description') setDescription(value);
    if (name === 'imgUrl') setImg(value);

  };

  return (
    <Wrapper backdrop={"#ccc"}>
      <Content>
        <Thumb style={{ alignItems: "center" }}
          image={
            //project.imageUrl == "" ? NoImage : project.imageUrl
            NoImage
          }
          clickable={false}
          alt='movie-thumb'
        />

        <Text>
          {
            isEditing ?

              <div>


                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Project Name</Form.Label>
                    <Form.Control name="name" onChange={handleInput} type="email" placeholder={"eproject.projectNam"} />
                  </Form.Group>
                </Form>


                <Form>
                  <Form.Group className="mb-3" controlId="floatingTextarea2">
                    <Form.Label>Enter Project Description</Form.Label>
                    <Form.Control onChange={handleInput} type="email" placeholder={"project.projectDescription"}
                      name="description"
                      as="textarea"
                      placeholder="Enter Project Desription Here"
                      style={{ height: '150px' }} />
                  </Form.Group>
                </Form>

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Project Image URL</Form.Label>
                    <Form.Control onChange={handleInput} name="imgUrl" type="email" placeholder={"project.imageUrl"} />
                  </Form.Group>
                </Form>

              </div>
              :
              <div>
                <div>
                  <h1>{"project.projectName"}</h1>
                  <h3>About the Project</h3>

                  <p>{"project.projectDescription"}</p>
                </div>




                <div className='rating-directors'>
                  <div className='rating-directors'>
                    <h3>Approve Votes</h3>
                    <div className='score'>{approveVotes}/{votesNeeded}</div>
                  </div>

                  <div className='rating-directors'>
                    <h3>Reject Votes</h3>
                    <div className='score'>{rejectVotes}/{votesNeeded}</div>
                  </div>
                </div>

                {0 ?
                  <div >
                    <h3>    Vote </h3>



                  </div>
                  : <div></div>
                }
                <div style={{ padding: "60px 0px", marginLeft: "" }}>
                  {0 ?
                    <form  >
                      <label>
                        Whitelist to Add:
                        <input type="text" name="name" />
                      </label>
                      <input type="submit" value="Submit" />
                    </form>
                    : <div></div>
                  }
                  {0 ?
                    <div >

                    </div>
                    : <div></div>
                  }

                </div>


              </div>

          }

        </Text>

      </Content>
    </Wrapper>
  );

}

AuctionInfo.propTypes = {
  project: PropTypes.object,
  status: PropTypes.string

}

export default AuctionInfo;
