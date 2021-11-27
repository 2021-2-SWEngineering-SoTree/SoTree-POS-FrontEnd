import React from 'react'
import styled from 'styled-components'

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`

const ModalInner = styled.div`
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #FAF7F7;
  border-radius: 10px;
  width: 47rem;
  height : 47rem;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`

function Modal({visible, children }) {
    return (
      <>
        <ModalOverlay visible={visible} />
        <ModalWrapper tabIndex="-1" visible={visible}>
          <ModalInner tabIndex="0">
            {children}
          </ModalInner>
        </ModalWrapper>
      </>
    )
}


export default Modal