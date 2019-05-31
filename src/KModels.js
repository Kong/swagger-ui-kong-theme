import React from "react"


export default class KModels extends React.Component {
  render(){
    const {
      getComponent
    } = this.props
    const Models = getComponent("Models", true)

    return (
      <div>
        <h1>LOLOLOOL</h1>
        <Models></Models>
      </div>
    )
  }
}