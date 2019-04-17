import React from "react";
import { Card, CardBody, Table, CardFooter, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default ({ data, downloadList, dataLength, paginationChange, page }) => {
  let paginationCount = Math.round((dataLength / 25) + 0.5)
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
              <th>Full Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Denomination</th>
              <th>Category</th>
              <th>Institution/PPA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((participant, i) => (
              <tr key={participant._id}>
                <th> {i + 1} </th>
                <td> {participant.fullName} </td>
                <td> {participant.phoneNumber} </td>
                <td> {participant.status} </td>
                <td> {participant.denomination} </td>
                <td> {participant.category} </td>
                <td> {participant.institution} </td>
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
