import React from 'react'

const Wrapper = (Children) => {
  return () => <>
    <p>wrapper</p>
    <Children />
    <p>wrapper</p>
  </>
}

export default Wrapper