import React, { Component } from "react";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import { connect } from "react-redux";
import BlockUI from "react-block-ui";
import { callApi } from "../../utils/index";

import "./Downloads.css";

class DownloadsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], count: null, blocking: true };
  }

  getFiles = () => {
    this.setState({
      ...this.state,
      blocking: true,
    })
    callApi("/getFiles")
      .then(({ fileCollection, count }) => {
        this.setState({ files: fileCollection, count, blocking: false });
      })
      .then(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getFiles();
  }

  render() {
    const { blocking, files } = this.state;
    return (
      <div className="page-container">
        <BlockUI blocking={blocking}>
          <Card>
            <div className="header">
              <CardHeader
                style={{
                  textAlign: "center",
                  backgroundColor: "#fff",
                  fontSize: "20px",
                  color: "#54688f"
                }}
              >
                Downloads
              </CardHeader>
            </div>
            <div className="body-container">
            <Card>
              <CardBody>
                {!files.length && blocking ? (
                  <h3> Searching </h3>
                ) : !files.length && !blocking ? (
                  <h3>No files uploaded yet</h3>
                ) : (
                  <Table bordered striped hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>File Name</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.files.map((downloadFile, index) => (
                        <tr key={downloadFile._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{downloadFile.fileName}</td>
                          <td>
                            <a
                              href={`/server/${
                                downloadFile.filePath
                              }`}
                            >
                              <i className="icon-download" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </CardBody>
            </Card>
            </div>
            <Button onClick={this.getFiles} outline > Refresh </Button>
          </Card>
        </BlockUI>
      </div>
    );
  }
}

export default connect()(DownloadsPage);
