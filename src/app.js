import React from 'react';

import MainNavbar from './components/mainNavbar';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* Print the navbar */}
                <MainNavbar/>
            </div>
        );
    }
}

export default App;