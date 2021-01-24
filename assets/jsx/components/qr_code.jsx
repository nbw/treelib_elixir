import React from 'react'
import QRCode from 'qrcode';

export default class QrCode extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ""
    };
  }

  componentDidMount(){
    this.generateCode();
  }

  generateCode() {
    const value = this.props.value;
    return QRCode.toDataURL(value, {width: 300})
    .then(url => {
      this.setState({ data: url });
    })
    .catch(err => {
      return err;
    });
  }

  render() {
    return (
      <div >
        <img src={this.state.data} />
      </div>
    );
  }
}
