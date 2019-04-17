import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";
import states from "../utils/States";

import classnames from "classnames";

export default ({
  data,
  handleInputChange,
  submit,
  handleNumberInputChange,
  fetching
}) => (
  <Form>
    <FormGroup>
      <Label for="exampleEmail">Full Name</Label>
      <Input
        type="text"
        name="fullName"
        id="exampleEmail"
        placeholder="Full Name"
        value={data.fullName}
        onChange={e => handleInputChange(e)}
      />
      <FormText color="muted">Surname first</FormText>
    </FormGroup>
    <Row>
      <Col>
        <FormGroup>
          <Label for="exampleText">Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            id="exampleText"
            placeholder="08012345678"
            value={data.phoneNumber}
            onChange={e => handleNumberInputChange(e)}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label for="exampleText">Gender</Label>
          <Input
            type="select"
            name="gender"
            id="exampleText"
            value={data.gender}
            onChange={e => handleInputChange(e)}
          >
            <option value="" disabled>
              Select One
            </option>
            <option value="M"> Male </option>
            <option value="F"> Female </option>
          </Input>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs="12">
        <FormGroup>
          <Label for="exampleEmail">Denomination</Label>
          <Input
            type="text"
            name="denomination"
            id="exampleEmail"
            placeholder="Denomination"
            value={data.denomination}
            onChange={e => handleInputChange(e)}
          />
          <FormText color="muted">E.g. DLCF, NCCF, RCCG</FormText>
        </FormGroup>
      </Col>
    </Row>
    <FormGroup>
      <Label for="exampleEmail">Languages Spoken</Label>
      <Input
        type="text"
        name="languagesSpoken"
        id="exampleEmail"
        placeholder="Languages Spoken"
        value={data.languagesSpoken}
        onChange={e => handleInputChange(e)}
      />
      <FormText color="muted">Please separate with a comma</FormText>
    </FormGroup>
    <Button
      onClick={() => submit()}
      className={"pull-right"}
      disabled={fetching}
      block
    >
      Submit
    </Button>
  </Form>
);
