import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';

export class AddEmpModal extends Component {
  constructor (props) {
    super(props);
    this.state = { deps: [], snackbaropen: false, snackbarmsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    fetch('http://localhost:49269/api/departments')
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }

  snackbarClose = () => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit (event) {
    console.log(event.target.DepartmentId.value);
    event.preventDefault();
    fetch('http://localhost:49269/api/employees', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: event.target.EmployeeName.value,
        DepartmentId: event.target.DepartmentId.value,
        Email: event.target.Email.value,
        DOJ: event.target.DOJ.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        this.setState({ snackbaropen: true, snackbarmsg: result });
      },
        (error) => {
          this.setState({ snackbaropen: true, snackbarmsg: 'failed' });
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
              Add Employee
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">

              <Row>
                <Col sm={6}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="EmployeeName">
                      <Form.Label>EmployeeName</Form.Label>
                      <Form.Control
                        type="text"
                        name="EmployeeName"
                        required
                        placeholder="EmployeeName"
                      />
                    </Form.Group>

                    <Form.Group controlId="DepartmentId">
                      <Form.Label>Department</Form.Label>
                      <Form.Control as="select">
                        {this.state.deps.map(dep =>
                          < option key={dep.id} value={dep.id}> {dep.name}</option>
                        )}
                      </Form.Control>

                    </Form.Group>



                    <Form.Group controlId="Email">
                      <Form.Label>EmployeeName</Form.Label>
                      <Form.Control
                        type="text"
                        name="Email"
                        required
                        placeholder="Email"
                      />
                    </Form.Group>

                    <Form.Group controlId="DOJ">
                      <Form.Label>DOJ</Form.Label>
                      <Form.Control
                        type="date"
                        name="DOJ"
                        required
                        placeholder="DOJ"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button variant="primary" type="submit">Add Employee</Button>
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
      </div >
    );
  }
}