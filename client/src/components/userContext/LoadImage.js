import React, { Component } from 'react'; 
class LoadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }


    componentDidMount() {

        fetch('../upload/photo.png')
        .then(res=>{return res.blob()})
        .then(blob=>{
          var img = URL.createObjectURL(blob);
            this.setState({
                Photo:blob
            })
            console.log(blob)
          // Do whatever with the img
          //ReactDOM.render(<App />, document.getElementById('root'));
          //ReactDOM.render(<LoadImage/>, document.getElementById('img').setAttribute('src', img));
        })
        
    }

    render() {
    return (
        <div>
            
        </div>
    )
    
    }


}

export default LoadImage;
