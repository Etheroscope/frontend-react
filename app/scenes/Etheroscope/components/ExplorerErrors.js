import React from 'react'
import styled from 'styled-components'

const Centered = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`

export const ErrorTypes = {
  NO_CONTRACT: {
    heading: 'Error downloading contract metadata',
    message: 'A bad response was received from the API server while retrieving information about the contract.'
  },
  NO_ABI: {
    heading: 'No ABI found for this contract',
    content: function NoABIMessage(address) {
      return (<div>
        <p>
          Etheroscope needs an ABI to see what variables a contract
          contains.
          <br />
          If you are the contract owner, you can upload the source code for your
          contract <a href={`https://etherscan.io/verifyContract?a=${address}`}>
          here</a>.
          <br />
          Please note it may take up to 24 hours for the ABI to become
          available after uploading.
        </p>
      </div>)
    }
  },
  NO_VARIABLES: {
    heading: 'No variables found in the ABI for this contract',
    message: 'Oops! It looks like this contract doesn\'t actually contain any persistent variables.'
  }
}

function ExplorerErrors({ error, address }) {
  return (
    <Centered>
      <h1>{error.heading}</h1>
      {(error.content && error.content(address)) || <p>{error.message}</p>}
    </Centered>
  )
}

export {ExplorerErrors}