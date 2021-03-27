import { Component } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import loading from '../media/img/loading.gif'
import success from '../media/img/success.png'
import error from '../media/img/error.png'

class TxModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            img: loading,
            message: "Tx Hash: " + this.props.tx,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleOpen = () => {
        this.state["open"] = true;
    };

    handleClose = () => {
        if (this.props.status == "confirmation") {
            this.props.onClose();
        } else if (this.props.status == "error") {
            this.props.onClose();
        }
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.status !== this.props.status || prevProps.tx !== this.props.tx) {

            switch (this.props.status) {
                case "transactionHash":
                    console.log("switch tx hash")
                    this.setState({ img: loading, message: "Tx Hash: " + this.props.tx })
                    break;
                case "confirmation":
                    console.log("switch confirmation")
                    this.setState({ img: success, message: "Success :), Tx Hash: " + this.props.tx })
                    break;
                case "error":
                    console.log("switch error")
                    this.setState({ img: error, message: "Please try again or contact support. Error: 1023, Tx Hash: " + this.props.tx })
                    break;
                default:
            }
        }
    }

    render() {

        return (
            <div className="txModal">
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Please wait ...</DialogTitle>

                    <DialogContent>
                        <div>
                            <img src={this.state.img} alt="img" /> <br />
                            {this.state.message} <br />
                            <button onClick={this.handleClose}>close</button>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }
}

export default TxModal;