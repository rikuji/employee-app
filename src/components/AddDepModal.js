import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';

export class AddDepModal extends Component {
  constructor () {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      snackbaropen: false, snackbarmsg: ''
    }
  }

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:49269/api/departments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: event.target.DepartmentName.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({ snackbaropen: true, snackbarmsg: result })
      },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: 'failed' })
        }
      )
  }

  render () {
    return (
      <div className="container">

        <SnackBar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Department
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">

              <Row>
                <Col sm={6}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="DepartmentName">
                      <Form.Label>DepartamentName</Form.Label>
                      <Form.Control
                        type="text"
                        name="DepartmentName"
                        required
                        placeholder="DepartmentName"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button variant="primary" type="submit">Add Department</Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}