import React, { Component } from "react";
import {
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";
import BlockUi from "react-block-ui";

import { connect } from "react-redux";
import ParticipantList from "../../components/ParticipantTable";
import { callApi } from "../../utils/index";
import { showError, showInfo } from "../../actions/feedback";

class ParticipantLists extends Component {
  constructor(props) {
    super(props);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      participantList: [],
      filteredProducts: [],
      selectedProduct: null,
      showDeletePrompt: false,
      showPremiumPrompt: false,
      searchKey: "",
      page: 1,
      count: 0,
      fetching: true,
      isFetching: false,
    };
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  deleteProduct() {
    console.log(this.state.selectedProduct);
    const id = this.state.selectedProduct._id;
    if (!id) {
      this.toggleDeletePrompt();
      return;
    }
    this.setState({
      ...this.state,
      isFetching: true
    });
    callApi(`/deleteProduct/${id}`, this.state.selectedProduct, "POST")
      .then(() => {
        this.clearIsFetching();
        this.props.dispatch(showInfo("Successfully Deleted"));
        this.getParticipants();
        this.toggleDeletePrompt();
        this.clearSelectedState();
      })
      .catch(() => {
        this.clearIsFetching();
        this.props.dispatch(showError("Error deleting, pls refresh the page"));
        this.toggleDeletePrompt();
        this.clearSelectedState();
      });
  }

  downloadList() {
    
  }

  clearSelectedState() {
    this.setState({
      ...this.state,
      selectedProduct: null
    });
  }

  clearIsFetching() {
    this.setState({
      ...this.state,
      isFetching: false
    });
  }

  getParticipants(id, searchKey = "") {
    callApi(`/getParticipants/${id}`, { searchKey: searchKey }, "POST").then(
      ({ participants, count }) => {
        this.setState({
          ...this.state,
          participantList: participants,
          count: count,
          fetching: false
        });
      }
    );
  }

  handleSearchChange(e) {
    const { value } = e.target;
    this.setState({
      ...this.state,
      searchKey: value
    });
    this.getParticipants(1, value);
  }

  loadMoreParticipants() {
    this.getParticipants(this.state.page + 1, this.state.searchKey);
  }

  componentWillMount() {
    this.getParticipants(1);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <InputGroup>
              <Input
                placeholder="Search Participants"
                onChange={e => this.handleSearchChange(e)}
              />
              <InputGroupAddon addonType="append">Search</InputGroupAddon>
            </InputGroup>
          </CardHeader>
          <CardBody>
            <Row>
              <BlockUi blocking={this.state.fetching}>
                {this.state.participantList.length ? (
                  <ParticipantList
                    data={this.state.participantList}
                    downloadList={() => this.downloadList()}
                  />
                ) : (
                  <CardBody> Ooops, No Results Found... </CardBody>
                )}
              </BlockUi>
            </Row>
          </CardBody>
          <CardFooter>
            Showing {this.state.participantList.length} of {this.state.count}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default connect()(ParticipantLists);
