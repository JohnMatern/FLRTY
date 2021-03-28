import { Component } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

class MenuModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleOpen = () => {
        this.state["open"] = true;
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {

        return (
            <div className="txModal">
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Menu</DialogTitle>

                    <DialogContent>
                        <div>
                            Menu
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        );
    }
}

export default MenuModal;