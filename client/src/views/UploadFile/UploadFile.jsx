import React, { Component } from "react";
import { connect } from "react-redux";
import { showError, showInfo } from "../../actions/feedback";
import { fileUpload } from "../../utils/index";
import "./UploadFile.css";
import BlockUI from "react-block-ui";

import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  InputGroup,
  Row,
  Form,
  Label,
  FormGroup
} from "reactstrap";

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      fileName: "",
      file: null
    };
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  handleFileInputChange = ({ target }) => {
    const { files } = target;
    this.setState({
      ...this.state,
      file: files[0]
    });
  };

  submit() {
    let { fileName, file } = this.state;
    if (!fileName) {
      return this.props.dispatch(showError("Provide a name for file"));
    }
    if (!file) {
      return this.props.dispatch(showError("Select a file"));
    }
    this.setState({
      blocking: true
    })
    fileUpload({ fileName, file })
      .then(res => {
        this.setState({
          blocking: false,
          fileName: "",
          file: null
        })
        this.props.dispatch(showInfo('Uploaded Successfully'))
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { fileName, blocking } = this.state;
    return (
      <div className="login-container">
        <Col md="8">
          <BlockUI blocking={blocking}>
            <Card className="p-4">
              <CardBody>
                <p className="text-muted">File Upload</p>
                <InputGroup className="mb-3">
                  <Input
                    type="text"
                    placeholder="File Name"
                    name="fileName"
                    onChange={e => this.handleInputChange(e)}
                    value={fileName}
                  />
                </InputGroup>
                <Form>
                  <FormGroup>
                    <Label for="exampleFile">Select File</Label>
                    <Input
                      type="file"
                      name="file"
                      id="exampleFile"
                      accept="audio/*"
                      onChange={this.handleFileInputChange}
                    />
                  </FormGroup>
                </Form>
                <Row>
                  <Col xs="6">
                    <Button
                      color="primary"
                      className="px-4"
                      onClick={() => this.submit()}
                    >
                      Upload
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </BlockUI>
        </Col>
      </div>
    );
  }
}

export default connect()(UploadFile);
