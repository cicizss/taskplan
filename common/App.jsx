/**
 * Created by chenlizan on 2017/6/18.
 */

import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.query && this.props.location.query.token)
            if (typeof localStorage === 'object')
                localStorage.setItem('token', this.props.location.query.token);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
