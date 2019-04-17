import React from "react";
import { Card, CardBody, Table, CardFooter, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default ({ data, downloadList, dataLength, paginationChange, page }) => {
  let paginationCount = Math.round((dataLength / 25)+ 0.5)
  let pagination = []
  for (var i = 0; i < paginationCount; i++) {
    pagination.push(
      <PaginationItem key={i + 'pagination'} active={page - 1 === i }>
        <PaginationLink onClick={(e) => paginationChange(e)} id={i} >
          {i + 1}
          </PaginationLink>
      </PaginationItem>
    )
  }

  return (
    <Card className="card-accent-primary">
      <CardBody>
        <Table responsive striped hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Most touched Programme</th>
              <th>Category</th>
              <th>Mode of Transport</th>
              <th>Likes</th>
              <th>Improvements</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            {data.map((feedback, i) => (
              <tr key={feedback._id}>
                <th> {i + 1} </th>
                <td> {feedback.message} </td>
                <td> {feedback.category} </td>
                <td> {feedback.transport} </td>
                <td> {feedback.likes} </td>
                <td> {feedback.improvements} </td>
                <td> {feedback.experience} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter>

        <Pagination>
          {pagination}
        </Pagination>
        <Button onClick={() => downloadList()} outline color="link">
          {" "}
          Download Complete List{" "}
        </Button>
      </CardFooter>
    </Card>
  )
};
