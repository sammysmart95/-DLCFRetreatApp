import React from "react";
import { Button } from "reactstrap";

export default ({ data, onSelect, selected }) => {
  return data.map(dat => (
    <div>
      <Button outline={!(dat.name === selected.name)} onClick={() => onSelect(dat)} color="primary"  >{dat.name}</Button>
    </div>
  ));
};
