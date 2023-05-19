import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const MainContainer = styled.div`
  max-width: 37em;
  margin: 0 auto;
  padding: 1em 1.5em;
  h3 {
    padding: 0.5em 0;
    &#view {
      text-align: center;
      text-decoration: underline;
    }
  }
  hr {
    margin: 0.5em 0;
  }
`;
const TeamContainer = styled.div`
  margin: auto;
  max-width: 29em;
  .groupMember {
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: underline;
    }
  }
`;

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainContainer>
        <a
          href="https://github.com/dexters-lab-fsa-2208/umami-meats"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 id="view">View this project on Github</h3>
        </a>
        <hr />
        <TeamContainer>
          <h3>Contributors to this project</h3>
          <div className="groupMember">
            <p>Jake Lohman</p>
            <p>
              <a
                href="https://github.com/l-ohman"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              {" | "}
              <a
                href="https://www.linkedin.com/in/jake-lohman/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="groupMember">
            <p>Danny Margolin</p>
            <p>
              <a
                href="https://github.com/DannyMExe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              {" | "}
              <a
                href="https://www.linkedin.com/in/danny-margolin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="groupMember">
            <p>Brandon Yoon</p>
            <p>
              <a
                href="https://github.com/byoon97"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              {" | "}
              <a
                href="https://www.linkedin.com/in/byoon888/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </TeamContainer>
      </MainContainer>
    </motion.div>
  );
}
