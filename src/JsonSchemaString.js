export default class JsonSchema_string extends Component {
  onChange = (e) => {
    const value = this.props.schema["type"] === "file" ? e.target.files[0] : e.target.value
    this.props.onChange(value, this.props.keyName)
  }
  onEnumChange = (val) => this.props.onChange(val)
  render() {
    let { getComponent, value, schema, errors, required, description } = this.props
    let enumValue = schema["enum"]

    errors = errors.toJS ? errors.toJS() : []

    if ( enumValue ) {
      const Select = getComponent("Select")
      return (<Select className={ errors.length ? "invalid" : ""}
                      title={ errors.length ? errors : ""}
                      allowedValues={ enumValue }
                      value={ value }
                      allowEmptyValue={ !required }
                      onChange={ this.onEnumChange }/>)
    }

    const isDisabled = schema["in"] === "formData" && !("FormData" in window)
    const Input = getComponent("Input")
    if (schema["type"] === "file") {
      return (<Input type="file"
                     className={ errors.length ? "invalid" : ""}
                     title={ errors.length ? errors : ""}
                     onChange={ this.onChange }
                     disabled={isDisabled}/>)
    }
    else {
      return (<Input
                     type={ schema.format === "password" ? "password" : "text" }
                     className={ errors.length ? "invalid" : ""}
                     title={ errors.length ? errors : ""}
                     value={value}
                     minLength={0}
                     debounceTimeout={350}
                     placeholder={description}
                     onChange={ this.onChange }
                     disabled={isDisabled}/>)
    }
  }
}