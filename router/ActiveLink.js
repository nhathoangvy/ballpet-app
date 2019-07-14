import React from 'react'
import { Link } from 'react-router'

class Active extends React.Component{
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
}

export default Active