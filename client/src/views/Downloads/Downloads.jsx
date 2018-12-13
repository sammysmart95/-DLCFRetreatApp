import React, { Component } from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { connect } from "react-redux";
import BlockUI from "react-block-ui";

import { callApi, downloadFile } from "../../utils/index";

import "./Downloads.css";

class DownloadsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { files: [], count: null, blocking: true };
  }

  getFiles = () => {
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

  downloadFile = (fileId, originalName) => {
    this.setState({
      blocking: true
    });
    downloadFile(fileId, originalName)
      .then(data => {
        this.setState({
          blocking: false
        });
      })
      .catch(err => {
        this.setState({
          blocking: false
        });
      });
  };

  render() {
    const { blocking, files, count } = this.state;
    return (
      <div className="page-container">
        <BlockUI blocking={blocking}>
          <Card>
            <CardHeader> Downloads Page </CardHeader>
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
                        <td
                          onClick={e =>
                            this.downloadFile(
                              downloadFile._id,
                              `${downloadFile.originalName}`
                            )
                          }
                        >
                          <i className="icon-download" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </BlockUI>
      </div>
    );
  }
}

export default connect()(DownloadsPage);
