import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import BlockUi from "react-block-ui";

import { connect } from "react-redux";
import TestimonyList from "../../components/TestimonyList.jsx";
import { callApi, downloadFile } from "../../utils/index";
import { showError } from "../../actions/feedback";

class RegisterLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      testimonyList: [],
      searchKey: "",
      page: 1,
      count: 0,
      fetching: true,
    };
  }

  downloadList() {
    this.setState({
      fetching: true,
    })
    downloadFile("downloadTestimonyList", 'Testimony List.xlsx').then(data => {
      this.setState({
        fetching: false,
      })
    }).catch(err => {
      this.props.dispatch(showError('Error downloading'))
      this.setState({
        fetching: false,
      })
    })
  }

  getTestimonies(id, searchKey = "") {
    callApi(`/getTestimonies/${id}`, { searchKey: searchKey }, "POST").then(
      ({ testimonies, count }) => {
        this.setState({
          ...this.state,
          testimonyList: testimonies,
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
      searchKey: value,
      page: 1
    });
    this.getTestimonies(1, value);
  }

  componentWillMount() {
    this.getTestimonies(1);
  }

  paginationChange = (e) => {
    const page = Number(e.target.id)
    this.setState({
      ...this.state,
      fetching: true,
      page: page + 1
    })
    this.getTestimonies(page + 1, this.state.searchKey)
  }

  render() {
    return (
      <div className="animated fadeIn body-page-container">
        <Card>
          <CardHeader>
            <InputGroup>
              <Input
                placeholder="Search Testimonies"
                onChange={e => this.handleSearchChange(e)}
              />
              <InputGroupAddon addonType="append">Search</InputGroupAddon>
            </InputGroup>
          </CardHeader>
          <CardBody>
            <BlockUi blocking={this.state.fetching}>
              {this.state.testimonyList.length ? (
                  <TestimonyList
                    data={this.state.testimonyList}
                    downloadList={() => this.downloadList()}
                    dataLength = {this.state.count}
                    paginationChange={(event) => this.paginationChange(event)}
                    page={this.state.page}
                  />
              ) : (
                  <CardBody> Ooops, No Results Found... </CardBody>
                )}
            </BlockUi>
          </CardBody>
          <CardFooter>
            Showing {this.state.testimonyList.length} of {this.state.count}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default connect()(RegisterLists);
