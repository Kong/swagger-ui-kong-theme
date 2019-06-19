import React from 'react'

export default class SidebarList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      specName: window._kong.spec.name,
      spec: window._kong.spec,
      sidebarData: [],
      activeTags: [],
      activeId: null,
      isLoading: true
    }
  }

  componentDidMount() {
    console.log('props', this.props)
    const spec = this.props.specSelectors.specJson().toJS()
    console.log('spec', spec)
    const builtSpec = this.buildSidebar(spec)
    console.log('built', builtSpec)
    this.setState({sidebarData: builtSpec})

  }


  buildSidebar(parsedSpec) {
    // If specFile contains array of errors return early
    if (window.helpers.isObject(parsedSpec) === false || !parsedSpec.paths) return; // Build object of sidebar data from the parsedSpec

    var acc = {}; // Set up accumulator object

    Object.keys(parsedSpec.paths).forEach(function(path) {
      var operationPath = parsedSpec.paths[path];
      Object.keys(operationPath).forEach(function(method) {
        // If the parsedSpec does not have any tags group everything under default
        var tags = operationPath[method].tags ? operationPath[method].tags : ['default'];
        tags.forEach(function(tag) {
          var operationTag = acc[tag] = acc[tag] || {};
          var operationMethod = operationTag[path] = operationTag[path] || {};
          var operationDetails = operationMethod[method] = operationMethod[method] || {};
          operationDetails.id = operationPath[method].operationId || Object.getOwnPropertyNames(operationMethod)[0] + '_' + buildSidebarURL(Object.getOwnPropertyNames(operationTag).slice(-1)[0]);
          operationDetails.summary = operationPath[method].summary || operationPath[method].description || 'summary undefined';
        });
      });
    }); // Transform acc object to an array and sort items to match rendered spec

    var sidebarArray = Object.keys(acc).map(function(tag) {
      return {
        tag: tag,
        paths: Object.keys(acc[tag]).map(function(path) {
          return {
            path: path,
            methods: Object.keys(acc[tag][path]).map(function(method) {
              return {
                method: method,
                id: acc[tag][path][method].id,
                summary: acc[tag][path][method].summary
              };
            })
          };
        })
      };
    }).sort(function(a, b) {
      return window.helpers.sortAlphabetical(a.tag, b.tag);
    });
    return sidebarArray;
  };
  /*
   * Lookup spec file to render from data attribute on page
   */


  // retrieveParsedSpec(name, spec) {
  //   if (!spec) {
  //     throw new Error("<p>Oops! Looks like we had trouble finding the spec: '".concat(name, "'</p>"));
  //   }

  //   var contents = spec.contents;
  //   var parsedSpec = parseSpec(contents); // If parseSpec returns array of errors then map them to DOM

  //   if (window.helpers.isObject(parsedSpec) === false) {
  //     throw new Error("<p>Oops! Something went wrong while parsing the spec: '".concat(name, "'</p>"));
  //   }

  //   return parsedSpec;
  // };
  moveToAnchor (destination) {
    window.scrollTo(0, destination.offsetTop - 120)
  }

  isIdActive (id) {
    return this.state.activeId === id
  }

  isTagActive (tag) {
    return this.state.activeTags.includes(tag)
  }

  ifActive(bool) {
    return bool? "active": ""
  }

  sidebarAnchorClicked (sidebarItem, method) {
    this.setState({activeTags: [ ...this.state.activeTags, sidebarItem.tag] })
    this.setState({activeId: method.id})
    let anchorPath = `operations-${sidebarItem.tag}-${method.id}`
    window.location.hash = anchorPath
    let anchor = document.querySelector(`#${anchorPath}`)
    this.moveToAnchor(anchor)
  }

  subMenuClicked (sidebarItem) {
    if (this.isTagActive(sidebarItem.tag)) {
      this.setState({activeTags: this.state.activeTags.filter(activeTag => activeTag !== sidebarItem.tag) })
      return
    }
    this.setState({ activeTags: [ ...this.state.activeTags, sidebarItem.tag ] })
  }

  //
  render() {
    return (
      <div className="spec sidebar-list" id="spec-sidebar-list">
      <ul>
        <li className="list-title">Resources</li>

        { this.state.sidebarData.map( sidebarItem =>
          <li className={ "submenu " + this.ifActive(this.isTagActive(sidebarItem.tag)) } >
          <span className="submenu-title" onClick={() => this.subMenuClicked(sidebarItem)}>{sidebarItem.tag}</span>
          <ul className="submenu-items">

            { sidebarItem.paths.map( path =>
              <div>

                { path.methods.map(method =>
                  <div>
                    <li className={ "method " + this.ifActive(this.isIdActive(method.id)) } >
                      <a onClick={() => this.sidebarAnchorClicked(sidebarItem, method)} className={"method-"+ method.method}>
                       {"  " +  method.summary}
                      </a>
                    </li>
                  </div> )}

              </div> )}

          </ul>
        </li> )}

      </ul>
    </div>
    )
  }
}