import React from 'react';
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
import Button from '@mui/material/Button';

import ButtonGroup from '@mui/material/ButtonGroup';


const ProjectInfo = ({ project, status }) => {



  const addWhitelist = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account)
    var web3 = new Web3(Web3.givenProvider);
    console.log(await web3.eth.getChainId());

    var carContractAddress = ProjectRegister.address;
    var carAbi = ProjectRegister.abi;
    var carContract = await new web3.eth.Contract(carAbi, carContractAddress);
  }

  return (
    <Wrapper backdrop={"#ccc"}>
      <Content>
        <Thumb
          image={
            //project.imageUrl == "" ? NoImage : project.imageUrl
            NoImage
          }
          clickable={false}
          alt='movie-thumb'
        />
        <Text>
          <h1>{project.projectName}</h1>
          <h3>About the Project</h3>
          <p>{project.projectDescription}</p>

          <div className='rating-directors'>
            <div>
              <h3>RATING</h3>
              <div className='score'>{project.rating}</div>
            </div>

          </div>
          <div style={{ padding: "60px 0px", marginLeft: "" }}>
            {status == "authority" ?
              <form onSubmit={addWhitelist}>
                <label>
                  Whitelist to Add:
                  <input type="text" name="name" />
                </label>
                <input type="submit" value="Submit" />
              </form>
              : <div></div>
            }
            {status == "owner" ?
              <div className='director'>
                <Button variant="contained">Edit Project</Button>
              </div>
              : <div></div>
            }
            {status == "whitelisted" ?

              <div className='director'>
                <a style={{ color: "#fff" }}
                  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  download
                >
                  Click to Download Project PDF
                </a>
                <h3>    Vote </h3>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button>Approve</Button>
                  <Button>Reject</Button>

                </ButtonGroup>
              </div>
              : <div></div>
            }
          </div>
        </Text>

      </Content>
    </Wrapper>
  );

}

ProjectInfo.propTypes = {
  project: PropTypes.object,
  status: PropTypes.string

}

export default ProjectInfo;
